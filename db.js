const sql = require('mssql')
const dotenv = require('dotenv')

dotenv.config({path: './.env'})

//! DATOS DE CONFIGURACIÓN
//DATOS DE CONEXIÓN A OFICINA CENTRAL
const configOfc = {
    user: process.env.OFC_USER,
    password: process.env.OFC_PASS,
    server: process.env.OFC_HOST,
    port: 14301,
    database: process.env.OFC_DATABASE,
    requestTimeout: 60000,
    options: {
        encrypt: false
    }
}

//! CREACIÓN DE CONEXIONES
//TODO: CONEXIÓN A OFICINA CENTRAL
const poolOfc = new sql.ConnectionPool(configOfc)
poolOfc.connect()
.then(() => {
})
.catch((err) => {
    console.error('No conectado a Oficina Central: ' + err)
})

//! EXPORTA LAS CONEXIONES
module.exports = {
    poolOfc
}