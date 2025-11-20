import fs from 'fs'
const stream = fs.createReadStream("data.txt", { encoding: "utf-8", highWaterMark: 30 });

stream.on("data", (chunk) => {
  console.log("Chunk received:", chunk);
});

stream.on("end", () => {
  console.log("Finished reading");
});

// fs.createReadStream("data.txt", "utf8")
//   .pipe(fs.createWriteStream("output.txt", { encoding: "utf-8", highWaterMark: 16 }))
//   .on("finish", () => console.log("File has been copied successfully!"));