const fs=require('fs');

module.exports=function converttojson(jsonData){
    try {
    fs.writeFileSync('output.json', JSON.stringify(jsonData, null, 2));
    console.log('Data saved to output.json');  
    }
    catch(error){
        console.log(error);
    }
}

