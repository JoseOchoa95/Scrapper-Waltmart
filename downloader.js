const fs = require('fs');
const path = require('path');
const axios = require('axios');

/**
 * La función realiza la consulta imagen por imagen y en caso de
 * obtenerse una respuesta 200, la imagen es almacenada, de lo
 * contrario, se ignora, se escribe la consola de error en un
 * archivo 'errores_descarga.log' y continua con la siguiente
 * ruta.
 * 
 * @param {*} urls Array de strings que contiene las urls de las imagenes a descargar.
 * @param {*} fileNames Array de strings que contiene el nombre + extensión de la imagen a guardar.
 * @param {*} outputDir Directorio donde se almacenarán las imágenes y el log de errores.
 */
async function downloadImagesSequentially(urls, fileNames, outputDir) {
  if (!Array.isArray(urls) || !Array.isArray(fileNames) || urls.length !== fileNames.length) {
    throw new Error('Los parámetros urls y fileNames deben ser arrays de la misma longitud');
  }

  // Ruta del archivo de log
  const logPath = path.join(outputDir, 'errores_descarga.log');
  let logContent = `=== LOG DE ERRORES - ${new Date().toISOString()} ===\n\n`;

  try {

    // Crear directorio si no existe
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Inicializar archivo de log
    fs.writeFileSync(logPath, logContent);

    for (let i = 0; i < urls.length; i++) {
      try {
        const url = urls[i];
        const fileName = fileNames[i];
        const outputPath = path.join(outputDir, fileName);
        
        console.log(`[${i+1}/${urls.length}] Intentando: ${fileName}`);

        //Genera la solicitud
        const response = await axios({
          method: 'GET',
          url: url,
          responseType: 'stream',
          validateStatus: status => status === 200
        });

        const writer = fs.createWriteStream(outputPath);
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });

        console.log(`✓ [${i+1}/${urls.length}] Descargado: ${fileName}`);

      } catch (error) {
        const errorMessage = error.response 
          ? `Error ${error.response.status}: ${urls[i]}`
          : `Error: ${error.message}`;
        
        // Añadir al log
        logContent += `[${new Date().toISOString()}] ${errorMessage}\n`;
        fs.appendFileSync(logPath, `[${i+1}/${urls.length}] ${errorMessage}\n`);
        
        console.log(`✗ [${i+1}/${urls.length}] ${errorMessage}`);
      }
    }

    // Resumen final en el log
    const summary = `\n=== RESUMEN ===\nIntentadas: ${urls.length}\nErrores: ${logContent.split('\n').length - 3}\n`;
    fs.appendFileSync(logPath, summary);

    console.log(`✅ Proceso completado. Errores registrados en: ${logPath}`);

  } catch (error) {
    fs.appendFileSync(logPath, `ERROR CRÍTICO: ${error.message}\n`);
    console.error('❌ Error crítico:', error.message);
  }
}

module.exports = {
  downloadImagesSequentially
};