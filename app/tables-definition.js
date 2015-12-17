var Tipos = require('./tipos');

module.exports = {

  DVM_SISTEMA : {

    alias : 'DVM_SISTEMA',
    esquema : 'DTVLA',
    campoInfo : 'NOMBRE', 
    campos : {
      ID : {
        tipo : Tipos.Numerico,
        comprobar : false
      },
      NOMBRE : {
        tipo : Tipos.Cadena,
        comprobar : true
      },
      DESCRIPCION : {
        tipo : Tipos.Cadena,
        comprobar : false
      },
      PAIS : {
        tipo : Tipos.Cadena,
        comprobar : true
      }
    },
    claves : {
      'ID' : {}
    }
  },

  DVM_ENTIDAD_CANONICA : {
    
    alias : 'DVM_ENTIDAD_CANONICA',
    esquema : 'DTVLA',
    campoInfo : 'NOMBRE',
    campos : {

      ID : {
        tipo : Tipos.Numerico,
        comprobar : false
      },
      NOMBRE : {
        tipo : Tipos.Cadena,
        comprobar : true
      },
      DESCRIPCION : {
        tipo : Tipos.Cadena,
        comprobar : false
      }
    },
    claves : {
      'ID' : {}
    }
  },

  DVM_VALOR_CANONICO : {

    alias : 'DVM_VALOR_CANONICO',
    esquema : 'DTVLA',
    campoInfo : 'VALOR_CANONICO',
    campos : {

      ID : {
        tipo : Tipos.Numerico,
        comprobar : false,
        clave : true
      },
      ID_ENTIDAD_CANONICA : {
        tipo : Tipos.Numerico,
        comprobar : true,
        ref : 'DVM_ENTIDAD_CANONICA',
        camposRef : [
          'ID'
        ]
      },
      VALOR_CANONICO : {
        tipo : Tipos.Cadena,
        comprobar : true,
      },
      DESCRIPCION : {
        tipo : Tipos.Cadena,
        comprobar : false
      }
    },
    claves : {
      'ID' : {}
    }
  },

  DVM_VALOR_SISTEMA : {

    alias : 'DVM_VALOR_SISTEMA',
    esquema : 'DTVLA',
    campoInfo : 'VALOR_SISTEMA',
    campos : {
      ID : {
        tipo : Tipos.Numerico,
        comprobar : false,
        clave : true
      },
      ID_SISTEMA : {
        tipo : Tipos.Numerico,
        comprobar : true,
        ref : 'DVM_SISTEMA',
        camposRef : [
          'ID'
        ]
      },
      ID_ENTIDAD_CANONICA : {
        tipo : Tipos.Numerico,
        comprobar : true,
        ref : 'DVM_ENTIDAD_CANONICA',
        camposRef : [
          'ID'
        ]
      },
      ID_VALOR_CANONICO : {
        tipo : Tipos.Numerico,
        comprobar : true,
        ref : 'DVM_VALOR_CANONICO',
        camposRef : [
          'ID'
        ]
      },
      VALOR_SISTEMA : {
        tipo : Tipos.Cadena,
        comprobar : false
      }
    },
    claves : {
      'ID' : {}
    }
  }

};
