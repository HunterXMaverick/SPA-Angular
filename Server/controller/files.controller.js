;
'use strict'
fs = require('fs'),
    path = require('path')

let uploadFile = (req, res) => {
    let file = req.files.uploadFile
    if (file.originalFilename == '' || !file.originalFilename) {
        fs.unlinkSync(file.path)
        return res.status(400).json({
            transaccion: false,
            data: null,
            msg: 'no existe el archivo'
        })
    } else {
        let url = file.path
        url = url.split('\\')
        let urlFile = [url[url.length - 1]]
        console.log(urlFile)
        return res.status(200).json({
            transaccion: true,
            data: urlFile,
            msg: urlFile.length
        })
    }

}

let verFile = (req, res) => {
    let urlFile = req.params.urlFile,
        directorio = req.params.directorio,
        pathfile = `./files/${directorio}/${urlFile}`
    fs.exists(pathfile, (exist) => {
        if (exist) {
            return res.status(200).sendFile(path.resolve(pathfile))
        } else {
            return res.status(400).send('no existe el archivos')
        }
    })
}

let deletFile = (req, res) => {
    let urlFile = req.params.urlFile,
        directorio = req.params.directorio,
        pathfile = `./files/${directorio}/${urlFile}`
    fs.unlink(pathfile, (exist) => {
        if (!exist) {
            return res.status(200).send(`Se borro la imagen ${pathfile}`)
        } else {
            return res.status(400).send('no existe el archivos')
        }

    })
}

let updateFile = (req, res) => {
    let urlFile = req.params.urlFile,
        directorio = req.params.directorio,
        file = req.files.uploadFile
    console.log(file)

    pathfile = `./files/${directorio}/${urlFile}`;
    console.log(pathfile)
    fs.exists(pathfile, (exist) => {
        if (exist) {
            if (file.originalFilename == "" || !file.originalFilename) {
                fs.unlinkSync(file.path);
                return res.status(400).json({
                    transaccion: false,
                    data: null,
                    msg: 'no existe el archivo ;('
                });
            } else {
                fs.unlink(pathfile, (deleted) => {
                    if (!deleted) {
                        let url = file.path;
                        url = url.split('\\');
                        let urlFile = [url[url.length - 1]];
                        res.status(200).json({
                            transaccion: true,
                            data: `Archivo modificado: ${urlFile}`,
                            msg: 'Modificado Corectamente :)'
                        });
                    } else {
                        res.status(400).send('Algo salio mal');
                    }
                });
            }
        } else {
            fs.unlinkSync(file.path);
            res.status(400).send('el archivo no existe. Revise su ruta')
        }
    });
}

module.exports = {
    uploadFile,
    verFile,
    deletFile,
    updateFile
}