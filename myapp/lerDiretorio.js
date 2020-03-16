var fs = require('fs');
const converter = require("./converter");
var domain = require('domain').create();

module.exports = {
   
         pegarArquivos(){
            fs.readdir('./arquivos/converter',function(error,files){
               // percorre todos os elementos (arquivos) e passa como parametro para a função converter
               files.forEach(element => { 
                  let nome = element.replace ("." , "-");
                  converter.convert(element,nome); 
                  });
               
               console.log("Rotina Finalizada");   
            });

            domain.on("error",function(erros){
               console.log(erros);
            });
         }

}