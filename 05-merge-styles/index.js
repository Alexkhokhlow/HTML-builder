import * as fs from 'fs'
import path from 'path'
import { ReadStream } from 'fs'

const result = []
fs.open(`./05-merge-styles/project-dist/bundle.css`,'w', ()=>{})

fs.readdir('./05-merge-styles/styles', {withFileTypes: true}, function(err, files){
    files.forEach( file => {
      if(file.isFile() && path.extname(file.name) === '.css'){
        let readStream = new ReadStream(path.resolve(`./05-merge-styles/styles/${file.name}`), {encoding: 'utf-8'})
        readStream.on('readable', (err)=>{
        let a = readStream.read()
            if( a !== null)
            fs.appendFile(`./05-merge-styles/project-dist/bundle.css`, a, (err)=>{
            })
        })
      }
    })

  
})