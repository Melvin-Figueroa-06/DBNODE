const mongoose = require("../database/connect");
var USERSCHEMA = {
  name        : {type:String,required: [true, 'Introduzca su nombre']},
  email       : {type: String,required: "El correo es obilgatorio"},
  password    : {type: String, minlength:[8, "El password es muy corto"]},
  registerdate: {type: Date, defautl: Date.now()},
  age         : Number,
  sex         : String,
  roles       : Array
}
const USER = mongoose.model("user", USERSCHEMA);
module.exports = {model: USER, schema: USERSCHEMA};
