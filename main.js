#!/usr/bin/env node
let inputarray=process.argv.slice(2);
let command=inputarray[0];
let fs=require("fs");
let path=require("path");
let types={
    media:["mp3","mkv","mk4"],
    archives:["zip","rar"],
    document:["png","txt"],
    app:['exe']
}
switch(command){
    case"tree":
    treefn(inputarray[1]);
    break
    case"organise":
    organisefn(inputarray[1]);
    break;
    case "help":
        helpfn();
        break;
        default:
            console.log("pls use right command😒");
            break;
}
function treefn(dirpath)
{
    let destpath;
    if(dirpath==undefined)
    {
     
      treehelper( process.cwd(),"")
        return
    }
    else{
        let doesexist=fs.existsSync(dirpath);
        if(doesexist)
        {
      treehelper(dirpath,"");}

}
}

function organisefn(dirpath)
{
    let destpath;
    if(dirpath==undefined)
    {
        destpath=process.cwd()

        return
    }
    else{
      let doesexist=  fs.existsSync(dirpath)
      if(doesexist)
      {

       destpath=  path.join(dirpath,"organized_files");
      if(fs.existsSync(destpath)==false)
      {
      fs.mkdirSync(destpath);}
      }
      else{
        console.log("kindly enter the  correctpath");
        return;
      }
organisehelper(dirpath,destpath);
    }
}
function organisehelper(src,dest)
{
let childnames=fs.readdirSync(src);
for(let i=0;i<childnames.length;i++)
{
    let childaddress=path.join(src,childnames[i]);
    if(fs.lstatSync(childaddress).isFile())
    {

     let category=   getcategory(childnames[i]);
     console.log(childnames[i]+"belongs to this cateogory <<", category);
     sendfiles(childaddress,dest,category);
    }
}
}
function helpfn()

{
    console.log("List of all command:organise path ,tree ,help");                   
     

}
function getcategory(names)
{
    let ext=path.extname(names);
    ext=ext.slice(1);
    for(let type in types)
    {
        let ctypearray=types[type];
        for(let i=0;i<ctypearray.length;i++)
        {
            if(ext==ctypearray[i])
            {
                return type;
            }
        }

    }
    return "others";

}
function sendfiles(srcfilepath,dest,category)
{
    let cateogorypath=path.join(dest,category);
    if(fs.existsSync(cateogorypath)==false)
    {
        fs.mkdirSync(cateogorypath);

    }
    let fileName=path.basename(srcfilepath)
    console.log(fileName);
    let destfilepath=path.join(cateogorypath,fileName);
    console.log(srcfilepath+"");
    console.log(destfilepath);
    fs.copyFileSync(srcfilepath,destfilepath);
    

}
function treehelper(dirpath,indent)
{
    // is file or folder
    let isfile=fs.lstatSync(dirpath).isFile();
    if(isfile==true)
    {
      let filename=  path.basename(dirpath)
      console.log(indent+"|||||||"+filename);

        
    }
    else{

        let dirname=path.basename(dirpath);
        console.log(indent+"|||"+dirname);
        let childrens=fs.readdirSync(dirpath);
        for(let i=0;i<childrens.length;i++)
        {
          let childrenpath=  path.join(dirpath,childrens[i]);
            treehelper(childrenpath,indent+"\t");
        }
    }
}