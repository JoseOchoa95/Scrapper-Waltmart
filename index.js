const { downloadImagesSequentially } = require('./downloader');
const { poolDB } = require('./db');

(async () => {

    let imageUrls = [];
    let nombresUrls = [];

    try{

        const pool = await poolDB.connect()
        
        /*
        Consultamos a la db, este select nos traerá los códigos de barras de todos los
        artículos.
        */

        const result = await pool.request().query('SELECT cve_lar, art FROM inviar');
    
        console.log("Conexión establecida");

        for(let i = 0; i < result.recordsets[0].length; i++){

            /*
            A los códigos de barras hay que darles formato, el código formateado
            debe tener una longitud de 15, teniendo que agregar '0' al inicio del
            string, así como una 'L' al final, de modo que si el código de barras
            de un producto es '7501055900800', debe quedar '00750105590080L'.
            */

            nombresUrls.push(result.recordsets[0][i].art.trim() + '.webp');

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
        await downloadImagesSequentially(imageUrls, nombresUrls, 'C:/tmp');
    } catch (error) {
        console.error('Error en la aplicación:', error);
    }

})();