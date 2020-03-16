const upload = require("./upload");
var xlsx = require('node-xlsx');
var fs = require('fs');
const Logger = require('./log')

module.exports = {

            convert(caminho , nome){
              //  console.log(`Convert File ${caminho}`);
                
                var obj = xlsx.parse( "./arquivos/converter/" + caminho ); // parses a file
                var rows = [];
                var writeStr = "";
                var sheet = 0;
            
                
                //looping through all sheets
                for(var i = 0; i < obj.length; i++)
                {
                     sheet = obj[i];
                    //loop through all rows in the sheet
                    for(var j = 0; j < sheet['data'].length; j++)
                    {
                            //add the row to the rows array
                            rows.push(sheet['data'][j]);
                    }
                  
                }    
            
                Logger.logInfo(sheet['data'].length+" lines processed in the input file " + caminho);   
                //creates the csv string to write it to a file
                for(var i = 0; i < rows.length; i++)
                {
                    writeStr += rows[i].join(",") + "\n";
                } 
                Logger.logInfo(rows.length + " lines processed in the output file " +  nome+ ".csv");
                //console.log(rows.length);
                //writes to a file, but you will presumably send the csv as a      
                //response instead
                fs.writeFile("./arquivos/convertidos/" + nome+ ".csv" , writeStr, function(err) {
                    if(err) {
                        
                        Logger.logError(err);
                        return err;
                        
                    }
                    Logger.logInfo(`Complete Convert File ${caminho}`);
                });

                if(sheet['data'].length != 0){
                    upload.uploadArquivos("./arquivos/convertidos/" + nome+ ".csv", nome+ ".csv" );
                   
                } else {
                    Logger.logWarn(" The " + caminho + " file has no data");
                }
            
       
            }
}


  
  
