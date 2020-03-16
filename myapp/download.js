const readdir = require("./lerDiretorio");
const path = require('path');
let Client = require('ssh2-sftp-client');
const Logger = require('./log');
const excluir = require('./excluir');
const fs = require('fs');

let sftpIn = new Client();
let configIn = {
    host: 'host',
    port: '22',
    username: 'user',
    password: 'pass'
};

module.exports = {
  async  downloadArquivos() {
        let remotePath = './sftpuser/XLS';
        let localPath = "./arquivos/converter";

     await   excluir.excluirConvertidos("./arquivos/convertidos/");
     
     await   excluir.excluirConverter("./arquivos/converter/");
     

        async function downloadAll(remotePath, localPath, fileType) {
            //console.log(`Downloading files from ${remotePath} from ${configIn.host}`);
            let message = `Downloading files from ${remotePath} from ${configIn.host}`
            
           
            let listings = await sftpIn.list(remotePath, fileType);
            Logger.logInfo(message);
            if(listings.length != 0) {

                for (let item of listings) {    
                    if (item.type === '-') {
                        let remoteFile = remotePath + "/" + item.name;
                        let localFile = path.join(localPath, item.name);
    
                        //console.log(`Downloading File${remoteFile}`);
                        Logger.logInfo("Baixando arquivo "+remoteFile+" para " + localFile);
                        let dst = fs.createWriteStream(localFile);
                        let res = await sftpIn.get(remoteFile, localFile);
                    }
                }
                await sftpIn.end();
                readdir.pegarArquivos();
            
            }else {
                Logger.logWarn("Empty directory");
                console.log("Rotina Finalizada");
            }

        }

        sftpIn.connect(configIn).then(() => {
            Logger.logInfo(" Connection to the download server established ");
            return downloadAll(remotePath, localPath, "*.xls");
          }).catch(err => {
           
            Logger.logError(err.message);
            let strErro = err.message;
            if(strErro.match(/EADDRNOTAVAIL/)){
                Logger.logError("The informed host is not available");
              } else {
                Logger.logError(err.message);
              }
          });

        
    }
}