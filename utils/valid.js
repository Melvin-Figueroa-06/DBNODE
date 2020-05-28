var USER = require('../models/user');

var valid = {
  checkParams: function(refobj, evalueobj){
    if (Object.keys(refobj).sort().toString() == Object.keys(evalueobj).sort().toString()) {
      return true;
    }
    return false;
  },

  checkName: function(name){
        var exp = /^\s{0,}[A-ZÑña-z\s]{2,30}\s{0,}$/g
        if (name.match(exp) == null) {
            return false;
        }
        return true;
    },

  //Para verificar una contraseña
  checkPassword: function (password) {
      var exp = /^\s{0,}(?=.*[a-zA-Z])(?=.*\d)\S{6,}\s{0,}$/g;
      if (password.match(exp) == null) {
          return false;
      }
      return true;
  },

  checkEmail: function(email) {
    var exp = /^\w{1,}@\w{1,}[.]\w{2,3}$/g;
    if(email.match(exp) == null){
      return false;
    }
    return true;
  }
};
module.exports = valid;
