const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { check, validationResult, body } = require('express-validator');
const adminMiddleware = require('../​middlewares​/adminMiddleware');

//Extensiones permitidas para archivos de imagenes
const extensionesImagen = [".JPG",".jpg",".JPEG",".jpeg",".png",".PNG",".gif",".GIF"]

// Para la carga de archivos con multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/img_products')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
var upload = multer({ storage: storage });

// CONTROLADORES
const productController = require('../controllers/productController')

// Listado de productos
router.get('/', productController.root);  //DB CRUD OK

router.get('/category/:category', productController.category);

router.get('/search', productController.search);

// Formulario de creación de productos y acción de creación
router.get('/create/', adminMiddleware, productController.create);

router.post('/create/', adminMiddleware, upload.any(),[
  check('name').isLength({min: 5}).withMessage('Debe ingresar al menos 5 caracteres'),
  check('description').isLength({min: 20}).withMessage('Debe ingresar al menos 20 caracteres'),
  check('imgProduct').custom((value,{req})=> {
    for(extension of extensionesImagen){
      if(path.extname(req.files[0].filename) == extension){
        return true;
      }
    }
  }).withMessage('La extension de la imagen debe ser jpg, jpeg, png o gif')], productController.store);  //DB CRUD OK

// Detalle del producto en particular
router.get('/:id', productController.detail); //DB CRUD OK

// Formulario de edición de productos y acción de edición
router.get('/:id/edit', adminMiddleware, productController.edit); //DB CRUD OK
router.put('/:id', adminMiddleware,[
  check('name').isLength({min: 5}).withMessage('Debe ingresar al menos 5 caracteres'),
  check('description').isLength({min: 20}).withMessage('Debe ingresar al menos 20 caracteres'),
], productController.update);  //DB CRUD OK

// Eliminar producto
router.delete('/:id', adminMiddleware, productController.destroy);



module.exports = router;