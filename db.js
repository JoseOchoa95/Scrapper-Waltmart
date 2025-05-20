const sql = require('mssql')
const dotenv = require('dotenv')

dotenv.config({path: './.env'})

//! DATOS DE CONFIGURACIÓN
//DATOS DE CONEXIÓN
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    port: 14301,
    database: process.env.DB_DATABASE,
    requestTimeout: 60000,
    options: {
        encrypt: false
    }
}

//! CREACIÓN DE CONEXIONES
const pool = new sql.ConnectionPool(config)
pool.connect()
.then(() => {
})
.catch((err) => {
    console.error('No conectado a la base de datos: ' + err)
})

//! EXPORTA LAS CONEXIONES
module.exports = {
    pool
}