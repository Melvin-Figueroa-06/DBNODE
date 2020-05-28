const mongoose = require("../database/connect");

var PublicacionSchema ={
    nombre        :String,
    precio        :{type: Number, required: 'Debe tener un precio'},
    descripcion   :String,
    stock         :{type: Number, default:1},
    estado        :{type:String,  enum:['disponible', 'Agotado']},
    categoria     :{type:String, enum:['Aperitivos', 'Ensaladas', 'Postres', 'servicios']},
    fechaRegistro :{type: Date, default: Date.now()},
    foto          : String
};

const PUBLICACION = mongoose.model("publicacion", PublicacionSchema);
module.exports = {model: PUBLICACION, Schema: PublicacionSchema};
