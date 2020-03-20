# conversor-xls-csv

 Aplicativo para converter arquivos **XLS** e **XLSX** de um **sftp Dowload** e transferir a um **sftp Upload** em **CSV**


### Módulos usados 

[https://www.npmjs.com/package/ssh2-sftp-client](https://www.npmjs.com/package/ssh2-sftp-client)
[https://www.npmjs.com/package/node-xlsx](https://www.npmjs.com/package/node-xlsx)



## Diagrama de funcionamento

```mermaid
graph LR
A[Conexão SFTP Download]  -->|Baixar arquivos| B(Ler arquivos na pasta econverter)

B --> C[Enviar para SFTP Upload ]
