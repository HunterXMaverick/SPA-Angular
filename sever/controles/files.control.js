;
'use strict'

const fs = require('fs'),
    path = require('path')
const { exists } = require('../modelos/usuarioModel')

// subir archivo
let uploadFile = (req, res) => {
    let file = req.file.uploadFile
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

// ver archivo
let verFile = (req, res) => {
    let urlFile = req.params.urlFile,
        directorio = req.params.urlFile,
        pathFile = `./files/${directorio}/${urlFile}`
    fs.exists(pathFile, (exists) => {
        if (exists) {
            return res.status(200).sendFile(path.resolve(pathFile))
        } else {
            return res.status(400).send('no existe archivo')
        }
    })
}

// borrar archivo
let deleteFile = (req, res) => {
    let urlFile = req.params.urlFile,
        directorio = req.params.directorio,
        pathFile = `./files/${directorio}/${urlFile}`

    fs.unlink(pathFile, (exist) => {
        if (!exist) {
            return res.status(200).send(`Se borro la imagen ${pathFile}`)
        } else {
            return res.status(400).send('no existe archivos')
        }

    })
}

// actualizar archivo
let updateFile = (req,res) =>{
    let urlFile = erq.params.urlFile,
    directorio = rq.params.directorio,
    file = req.files.uploadFile
    console.log(file)

    pathFile = `./files/${directorio}/${urlFile}`
    console.log(pathFile)

    fs.exists(pathFile, (exists)=> {
        if(exists){
            if(file.originalFilename == '' || !originalFilename){
                fs.unlinkSync(file.path)
                return res.status(400).json({
                    transaccion: false,
                    data: null,
                    msg: 'archivo no existente'
                })
            } else {
                fs.unlink(pathFile, (deleted) => {
                    if(!deleted) {
                        let url = file.path
                        url = url.split('\\')
                        let urlFile = [url[url.length - 1]]
                        res.status(200).json({
                            transaccion: true,
                            data: `archivo modificado ${aurlFile}`,
                            msg: 'archivo modificado ok'
                        })
                    } else {
                        return res.status(400).send('algo esta mal')
                    }
                })
            }
        } else {
            fs.unlinkSync(file.path)
            res.status(400).send('no existe archivo')
        }
    })
}

module.exports = {
    uploadFile,
    verFile,
    deleteFile,
    updateFile
}