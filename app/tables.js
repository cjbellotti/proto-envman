var Tipos = require('./tipos');

module.exports = {

  DVM_SISTEMA : {

    alias : "sistema", 
    campos : {
      NOMBRE : {
        tipo : Tipos.Clave 
      },
      DESCRIPCION : {
        tipo : Tipos.Normal 
      },
      PAIS : {
        tipo : Tipos.Clave
      }

    }

  },

  DVM_ENTIDAD_CANONICA : {

    alias : "entidad-canonica", 
    campos : {
      NOMBRE : {
        tipo : Tipos.Clave
      },
      DESCRIPCION : {
        tipo : Tipos.Normal
      }
    }

  },

  DVM_VALOR_CANONICO : {
  
    alias : "valor-canonico",
    campos : {
      ID_ENTIDAD_CANONICA : {
        tipo : Tipos.Clave,
        ref : "DVM_ENTIDAD_CANONICA"
      },
      VALOR_CANONICO : {
        tipo : Tipos.Clave
      },
      DESCRIPCION : {
        tipo : Tipos.Normal
      }
    }

  },

  DVM_VALOR_SISTEMA : {

    alias : "valor-sistema",
    campos : {
      ID_SISTEMA : {
        tipo : Tipos.Clave,
        ref : "DVM_SISTEMA"
      },
      ID_ENTIDAD_CANONICA : {
        tipo : Tipos.Clave,
        ref : "DVM_ENTIDAD_CANONICA"
      },
      ID_VALOR_CANONICO : {
        tipo : Tipos.Clave,
        ref : "DVM_VALOR_CANONICO"
      },
      VALOR_SISTEMA : {
        tipo : Tipos.Normal
      }
    }

  }

}
