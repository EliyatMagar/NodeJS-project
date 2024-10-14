//WRITE FILE

// const fs=require('fs');

// fs.writeFile('firstFile.txt','Hello this is a new file',(err)=>{
//     if(err)
//         throw err;

//     console.log('file created / overwritten succesfully');
// })

//READ FILE 

// const fs=require('fs');
// fs.readFile('firstFile.txt','utf8',(err,data)=>{
//     if(err)
//         throw err;
//     console.log('file content:',data);
// });

//UPDATE file
// const fs=require('fs');

// fs.appendFile('firstFile.txt',"\nthis is new append file" ,(err)=>{
//     if(err) throw err;
//     console.log("File updated with new file");
// });


//DELETE FILE 


const fs=require('fs');
fs.unlink('firstFile.txt',(err)=>{
    if(err) throw err;
    console.log('File deleted successfully')
});
