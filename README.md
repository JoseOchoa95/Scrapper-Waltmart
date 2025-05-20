# 📥 Scrapper de Imagenes Waltmart

Herramienta de descarga de imágenes con registro de errores, diseñada para Node.js 22.15.1+

[![Node.js Version](https://img.shields.io/badge/Node.js-22.15.1-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 🚀 Características

- Descarga imágenes una por una (modo secuencial)
- Registra errores en archivo `errores_descarga.log`
- Soporte para nombres personalizados de archivos
- Conexión a bases de datos MSSQL (opcional)
- Validación de códigos de estado HTTP
- Progreso detallado en consola

## 📦 Prerrequisitos

- Node.js 22.15.1 o superior
- npm 10.5.0+
- Conexión a Internet
- (Opcional) SQL Server si usas la función de DB

## 🛠 Instalación

```bash
git clone https://github.com/tu-usuario/Scrapper-Waltmart.git
cd Scrapper-Waltmart
npm install
```

## ⚙️ Configuracion

Crea un archivo .env en la raíz del proyecto:

```bash
DB_HOST=tu_servidor_sql
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_DATABASE=tu_base_de_datos
```

## 🖥️ Uso Básico

Para que el programa funcione, seguir los siguientes pasos:

1. Los códigos de barra de los artículos deben estar completos.
2. Correcta conexión a la DB.
3. Correguir el query de la linea 18 en index.js para que obtenga los códigos de barra de los artículos.
4. Iniciar index.js

```bash
node index.js
```

En caso de que no se requiera conexión a la db, iniciar el archivo downloader.js agregando el código de abajo

```bash
// Ejemplo manual
const urls = [
  'https://ejemplo.com/imagen1.jpg',
  'https://ejemplo.com/imagen2.png'
];

const nombres = [
  'foto1.jpg',
  'foto2.png'
];

downloadImagesSequentially(urls, nombres, './descargas');
```
