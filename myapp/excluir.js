const fs = require('fs');

module.exports = {


    async excluirConverter(directory){

            fs.readdir(directory, (err, files) => {
              if (err) throw err;

              for (const file of files) {
                fs.unlink(directory+file , err => {
                  if (err) throw err;
                });
              }
            });
            
    },

   async  excluirConvertidos(directory){

            fs.readdir(directory, (err, files) => {
              if (err) throw err;

              for (const file of files) {
                fs.unlink(directory+file , err => {
                  if (err) throw err;
                });
              }
            });
            
    }
}