import fs from "fs";
import Jimp from "jimp";
import path from 'path';

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file

const promisifyImageWrite = (photo : any, outpath: string) : Promise<string> => new Promise((resolve, reject) => {
    photo
    .resize(256, 256) // resize
    .quality(60) // set JPEG quality
    .greyscale() // set greyscale
    .write(__dirname + outpath, (err: Error) => {
      if (err) {
        reject(err);
      }
      resolve(outpath);
    });
})

export async function filterImageFromURL(inputURL: string): Promise<string> {
  try {
    const photo = await Jimp.read(inputURL);
    const outpath =
      "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
    const imagePath = await promisifyImageWrite(photo, outpath);
    return imagePath;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}