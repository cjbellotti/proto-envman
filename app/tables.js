var Tipos = require('./tipos');

module.exports = {

  DVM_SISTEMA : {

    alias : "DVM_SISTEMA",
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

    alias : "DVM_ENTIDAD_CANONICA", 
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
  
    alias : "DVM_VALOR_CANONICO",
    esquema : 'DTVLA',
    campos : {
      ID_ENTIDAD_CANONICA : {
        tipo : Tipos.Clave,
        ref : "DVM_ENTIDAD_CANONICA",
        camposRef : [ 
          "ID"
        ] 
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

    alias : "DVM_VALOR_SISTEMA",
    esquema : 'DTVLA',
    campos : {
      ID_SISTEMA : {
        tipo : Tipos.Clave,
        ref : "DVM_SISTEMA",
        camposRef : [
          "ID"    
        ]
      },
      ID_ENTIDAD_CANONICA : {
        tipo : Tipos.Clave,
        ref : "DVM_ENTIDAD_CANONICA",
        camposRef : [
          "ID"
        ]
      },
      ID_VALOR_CANONICO : {
        tipo : Tipos.Clave,
        ref : "DVM_VALOR_CANONICO",
        camposRef : [
          "ID"
        ]
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
        ref : "TBL_HOMOLOGATIONCATEGORIES",
        camposRef : [
          "CATEGORYID"
        ]
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

  },

  TBL_RESPONSE_MESSAGES_CATALOG : {

    alias : "TBL_RESPONSE_MESSAGES_CATALOG", 
    esquema : 'SMSCHANNEL',
    campos : {
      TEXT_MESSAGE : {
        tipo : Tipos.Clave
      },
      ISO2CODE : {
        tipo : Tipos.Clave
      }
    },
    orderBy : 'ID_MESSAGE',
    claves : { 
      "ID_MESSAGE" : Tipos.Numerico
    }     

  }

}
