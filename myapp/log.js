const log4js = require('log4js');
const log = require("cf-nodejs-logging-support");
const express = require("express");
// log4js.configure({
//   appenders: { Info: { type: 'file', filename: 'Info.log' } },
//   categories: { default: { appenders: ['Info'], level: 'Info' } }
// });

const app = express();
//const logger = log4js.getLogger('Info');


app.use(log.logNetwork);

module.exports= {

    async  logInfo(mensagem){
        log.setLoggingLevel("info");
        let grava = await  log.info(mensagem);
    },

    async logWarn(mensagem){
        log.setLoggingLevel("warn");
        let grava = await log.warn(mensagem);
    },

    async  logError(mensagem){
        log.setLoggingLevel("error");
        let grava = await  log.error(mensagem);
    }

}