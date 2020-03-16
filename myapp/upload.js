const Logger = require('./log.js')
const excluir = require('./excluir.js')
var SftpUpload = require("ssh2-sftp-client");


const config = {
    host: 'host',
    port: 22,
    username: 'user',
    password: 'pass'
  };

module.exports = {
    uploadArquivos(data, nomeRemoto){
  
        let client = new SftpUpload();
        client.connect(config)
        .then(() => {
            Logger.logInfo(" Connection to the upload server established ");
            
            Logger.logInfo("Upload to " + data);
            return  client.put(data,"./CSV/"+ nomeRemoto);
        })
        .then(() => {

          return client.end();
        })
        .catch(err => {
          if(strErro.match(/EADDRNOTAVAIL/)){
            Logger.logError("The informed host is not available");
          } else {
            Logger.logError(err.message);
          } 
        });
    
}
}