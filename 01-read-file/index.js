import { ReadStream } from "fs";
import path from "path";
let readStream = new ReadStream('./01-read-file/text.txt', {encoding: 'utf-8'})

readStream.on('readable', ()=>{
  let data = readStream.read()
  if(data != null)
  console.log(data)
})

