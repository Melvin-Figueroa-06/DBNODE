const mongoose = require('mongoose');
mongoose.connect("mongodb://172.22.0.2:27017/paises");
module.exports = mongoose;
