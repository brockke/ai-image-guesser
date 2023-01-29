// Because of the way the project is setup; refrences to 'server.mjs' have to be removed
// from db.ts when running this script because ts-node doesn't allow the type of module 
// that is imported there.
import { prisma } from "../src/server/db";
import S3Encode from "s3encode"
import fs from 'fs';

//This needs a folder with files in it
const testFolder = 'scripts/midjourney/'
// const testFolder = 'scripts/illustration/'
const url = 'https://ai-image-guesser.s3.amazonaws.com/midjourney/'

const doBackfill = async () => {
  const formattedData = fs.readdirSync(testFolder, {withFileTypes: true})
  .filter(item => !item.isDirectory())
  .map(item => item.name)
  .filter(item => Array.from(item)[0] !== '.')
  .map(item => {
    item = S3Encode(item)
    item = item.replaceAll(' ', '+')
    item = url.concat(item)
    return item
  })
  .map(item => ({
    url: item,
  }));

  const creation = await prisma.image.createMany({
    data: formattedData,
  });

  console.log("Creation?", creation);
};

void doBackfill();
