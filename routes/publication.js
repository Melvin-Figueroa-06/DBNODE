var express = require('express');
const publicacion = require('../models/publication');
const PUBLICACION = publicacion.model;
const PublicacionSchema = publicacion.Schema;
var valid = require("../utils/valid");
var router = express.Router();


router.post('/publicacion', async(req, res) => {
    var params = req.body;
    params["registerdate"] = new Date();
    //if (!valid.checkParams(PublicacionSchema, params)) {
      //res.status(300).json({
        //msn: "parametros incorrectos"
      //});
      //return;
  //  }
    var publicacion = new PUBLICACION(params);
    var result = await publicacion.save();
    res.status(200).json(result);
});

// muestra todos los datos insertados
router.get("/publicacion",(req, res) => {
  var skip = 0;
  var limit = 10;
  if (req.query.skip != null) {
    skip = req.query.skip;
  }

  if (req.query.limit != null) {
    limit = req.query.limit;
  }
  PUBLICACION.find({}).skip(skip).limit(limit).exec((err, docs) => {
    if (err) {
      res.status(500).json({
        "msn" : "Error en la db"
      });
      return;
    }
    res.json({
      result : docs
    });
  });
});

router.get(/publicacion\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  PUBLICACION.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(400).json({
      "respuesta":400,
      "msn" : "No existe el recurso seleccionado "
    });
  })
});

//borra los datos insertados
router.delete('/publicacion/:id', (req, res,) => {
  var idPublicacion = req.params.id;

  PUBLICACION.findByIdAndRemove(idPublicacion).exec()
      .then(() => {

      res.status(200).json({
        "resp": 200,
        "msn" :  "eliminado con exito"
      });
      }).catch(err => {
          res.status(500).json({
              error: err

            });

      });


});

//Actualizar solo x elementos

router.patch("/publicacion",(req, res) => {
  var params = req.body;
  var id = req.query.id;
  //database
  var keys = Object.keys(params);
  var updatekeys = ["nombre", "precio", "descripcion", "stock", "estado", "categoria","foto"];
  var newkeys = [];
  var values = [];


  //segurity
  for (var i  = 0; i < updatekeys.length; i++) {
    var index = keys.indexOf(updatekeys[i]);
    if (index != -1) {
        newkeys.push(keys[index]);
        values.push(params[keys[index]]);
    }
  }
  var objupdate = {}
  for (var i  = 0; i < newkeys.length; i++) {
      objupdate[newkeys[i]] = values[i];
  }
  console.log(objupdate);
  PUBLICACION.findOneAndUpdate({_id: id}, objupdate ,(err, docs) => {
    if (err) {
      res.status(500).json({
          msn: "Existe un error en la base de datos"
      });
      return;
    }
    res.status(200).json({
      "resp": 200,
      "dato": publicacion,
      "msn" :  "Publicacion editado con exito"
    });
    return;

  });
});

//BORRA CITAS INSERTADAS
router.delete("/user", async(req, res) => {
  if (req.query.id == null) {
    res.status(300).json({
      msn: "Error no existe id"
    });
    return;
  }
  var r = await USER.remove({_id: req.query.id});
  res.status(300).json(r);Usuario
});true


module.exports = router;
