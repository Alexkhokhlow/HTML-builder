import * as fs from 'fs'
import {ReadStream} from 'fs'
import path from 'path'


fs.mkdir('./06-build-page/project-dist',()=>{})

fs.open('./06-build-page/project-dist/index.html', 'w',()=>{})
fs.open('./06-build-page/project-dist/style.css', 'w', ()=>{})

fs.mkdir('./06-build-page/project-dist/assets',()=>{
    fs.readdir('./06-build-page/assets',(err, files)=>{
      files.forEach( file => {
        fs.mkdir(`./06-build-page/project-dist/assets/${file}`, ()=>{
          fs.readdir(`./06-build-page/assets/${file}`,(err, files)=>{
            files.forEach( filese =>{
              fs.open(`./06-build-page/project-dist/assets/${file}/${filese}`, 'w',()=>{})
              fs.copyFile(`./06-build-page/assets/${file}/${filese}`,`./06-build-page/project-dist/assets/${file}/${filese}`,()=>{})
            })
        })
      }) 
    })
  })
})

fs.copyFile('./06-build-page/template.html', `./06-build-page/project-dist/index.html`, ()=>{})


let index
let readStream = new ReadStream(`./06-build-page/project-dist/index.html`, {encoding: 'utf-8'})

readStream.on('readable', ()=>{
  let data = readStream.read()
  if(data != null){
    index = data
  }
})

fs.readdir('./06-build-page/components', {withFileTypes: true}, function(err, files){
  files.forEach( file => {
    let readStream = new ReadStream(`./06-build-page/components/${file.name}`, {encoding: 'utf-8'} )
    readStream.on('readable', ()=>{
      let data = readStream.read()
      if(data != null)
       index = index.replace(`{{${path.parse(file.name).name}}}`, data)
       if( `${path.parse(file.name).name}` === 'header'){
        fs.writeFile(`./06-build-page/project-dist/index.html`, index, ()=>{})
       }
    })
  })
})

fs.readdir('./06-build-page/styles', {withFileTypes: true}, function(err, files){
  files.forEach( file => {
    if(file.isFile() && path.extname(file.name) === '.css'){
      let readStream = new ReadStream(`./06-build-page/styles/${file.name}`, {encoding: 'utf-8'})
      readStream.on('readable', (err)=>{
      let a = readStream.read()
          if( a !== null)
          fs.appendFile(`./06-build-page/project-dist/style.css`, a, (err)=>{
          })
      })
    }
  }) 
})



