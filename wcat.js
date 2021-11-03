let fs = require('fs');
let inputArr = process.argv.slice(2);

let optionsArr = [];

let filesArr = [];

for(let i = 0;i < inputArr.length;i++){
    if(inputArr[i].startsWith('-')){
        optionsArr.push(inputArr[i]);
    }else{
        filesArr.push(inputArr[i]);
    }
}

if(optionsArr.includes('-s') && optionsArr.includes('-n')){
    console.log('-s and -n cannot be executed together');
    return;
}

if(filesArr.length == 0){
    console.log('Enter the file names to be executed');
    return;
}
//read files
let content = "";
for(let i = 0; i < filesArr.length; i++){
    let buffer = fs.readFileSync(filesArr[i]);
    content+= buffer + "\r\n";
}

// remove big spaces (-s)
let contentArr = content.split("\r\n");

if(optionsArr.includes('-s')){
    for(let i = 1; i < contentArr.length; i++){
        if(contentArr[i] == "" && contentArr[i - 1] == ""){
            contentArr[i] = null;
        }else if(contentArr[i] == "" && contentArr[i - 1] == null){
            contentArr[i] = null;
        }
    }

    let tempArr = [];
    for(let i = 0; i < contentArr.length; i++){
        if(contentArr[i] !== null){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr = tempArr;
}

if(optionsArr.includes('-n')){
    for(let i = 0; i < contentArr.length; i++){
        contentArr[i] = `${i + 1} ${contentArr[i]}`;
    }
}


if(optionsArr.includes('-b')){
    let counter = 1;
    for(let i = 0; i < contentArr.length; i++){
        if(contentArr[i].length > 0){
            contentArr[i] = `${counter++} ${contentArr[i]}`;
        }
    }
}
console.log(contentArr.join('\r\n'))
