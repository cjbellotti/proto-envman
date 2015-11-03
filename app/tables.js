var Tipos = require('./tipos');

module.exports = {

  DVM_SISTEMA : {

    alias : "sistema",
    esquema : 'DTVLA',
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

    },
    orderBy : 'ID',
    claves : { 
      "ID" : Tipos.Numerico
    }     

  },

  DVM_ENTIDAD_CANONICA : {

    alias : "entidad-canonica", 
    esquema : 'DTVLA',
    campos : {
      NOMBRE : {
        tipo : Tipos.Clave
      },
      DESCRIPCION : {
        tipo : Tipos.Normal
      }
    },
    orderBy : 'ID',
    claves : { 
      "ID" : Tipos.Numerico
    }     

  },

  DVM_VALOR_CANONICO : {
  
    alias : "valor-canonico",
    esquema : 'DTVLA',
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
    },
    orderBy : 'ID',
    claves : { 
      "ID" : Tipos.Numerico
    }     

  },

  DVM_VALOR_SISTEMA : {

    alias : "valor-sistema",
    esquema : 'DTVLA',
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
    },
    orderBy : 'ID',
    claves : { 
      "ID" : Tipos.Numerico
    } 

  },

  TBL_HOMOLOGATIONCATEGORIES : {

    alias : 'TBL_HOMOLOGATIONCATEGORIES',
    esquema : 'DTVLA',
    campos : {

      CATEGORYID : {
        tipo : Tipos.Clave
      },
      CATEGORYNAME : {
        tipo : Tipos.Normal
      },
      CANONICALCATEGORYCODE : {
        tipo : Tipos.Normal
      }

    },
    orderBy : 'CATEGORYID',
    claves : { 
      "CATEGORYID" : Tipos.Numerico
    } 

  },

  TBL_HOMOLOGATIONDATA : {

    alias : 'TBL_HOMOLOGATIONDATA',
    esquema : 'DTVLA',
    campos : {

      COUNTRYID : {
        tipo : Tipos.Clave
      },
      CANONICALCODE : {
        tipo : Tipos.Clave
      },
      HOMOLOGATEDCONCEPT : {
        tipo : Tipos.Normal
      },
      TARGETSYSTEMCODE : {
        tipo : Tipos.Normal
      },
      CATEGORYID : {
        tipo : Tipos.Normal,
        ref : "TBL_HOMOLOGATIONCATEGORIES"
      },
      HOMOLOGATEDCODE : {
        tipo : Tipos.Normal
      }

    },
    orderBy : 'COUNTRYID, CANONICALCODE',
    claves : { 
      "COUNTRYID" : Tipos.Cadena,
      "CANONICALCODE" : Tipos.Cadena
    } 

  }

}
