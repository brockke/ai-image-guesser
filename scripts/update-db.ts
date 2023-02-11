// Because of the way the project is setup; refrences to 'server.mjs' have to be removed
// from db.ts when running this script because ts-node doesn't allow the type of module 
// that is imported there.
import { prisma } from "../src/server/db";
import S3Encode from "s3encode"
import fs from 'fs';

//This needs a folder with files in it
// const testFolder = 'scripts/midjourney/'
const testFolder = 'scripts/midjourney/'
const url = 'https://ai-image-guesser.s3.amazonaws.com/midjourney/'

const doBackfill = async () => {
  const formattedData = fs.readdirSync(testFolder, {withFileTypes: true})
  .filter(item => !item.isDirectory())
  .map(item => item.name)
  .filter(item => Array.from(item)[0] !== '.')
  .map(item => ({
    url: item,
    key: 'midjourney/' + item,
  }))
  .map(item => {
    item.url = S3Encode(item.url)
    item.url = item.url.replaceAll(' ', '+')
    item.url = url.concat(item.url)
    return item
  });

  for (const [i, row] of formattedData.entries()){
    const output = await prisma.image.update({
      where: {
        // id: (i + 1)
        id: (i + 558)
      },
      data: {
        key: row.key
      },
    })
    console.log(output)
  }

  console.log("Creation?", formattedData);
};

void doBackfill();
