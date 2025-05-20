const { downloadImagesSequentially } = require('./downloader');
const { poolOfc } = require('./db');

// Ejemplo de uso
(async () => {

    let imageUrls = [];
    let nombresUrls = [];

    try{

        const pool = await poolOfc.connect()
        // Consulta a la base de datos
        const result = await pool.request().query('SELECT cve_lar FROM inviar');
    
        console.log("Conexión establecida");

        for(let i = 0; i < result.recordsets[0].length; i++){
        //for(let i = 0; i < result.recordsets[0].length; i++){

            nombresUrls.push(result.recordsets[0][i].cve_lar.trim() + '.webp');

            let cve = result.recordsets[0][i].cve_lar.trim().slice(0, -1) + 'L';
            while(cve.length < 15){
                cve = '0' + cve;
            }

            imageUrls.push('https://i5-mx.walmartimages.com/gr/images/product-images/img_large/' + cve + '.jpg');
        }

    }catch(error){
        console.log(error)
    }
    
    try {
        await downloadImagesSequentially(imageUrls, nombresUrls, 'C:/var');
    } catch (error) {
        console.error('Error en la aplicación:', error);
    }

})();