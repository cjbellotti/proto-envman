var Tipos = require('./tipos');

module.exports = {

  DVM_SISTEMA : {

    alias : 'DVM_SISTEMA',
    esquema : 'DTVLA',
    campoInfo : 'NOMBRE', 
    campos : {
      ID : {
        tipo : Tipos.Numerico,
        comprobar : false,
        saltear : true
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
        comprobar : false,
        saltear : true
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
        saltear : true
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
        saltear : true
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
  },

  TBL_HOMOLOGATIONCATEGORIES : {

    alias : 'TBL_HOMOLOGATIONCATEGORIES',
    esquema : 'DTVLA',
    campoInfo : 'CATEGORYNAME',
    campos : {

      CATEGORYID : {
        tipo : Tipos.Numerico,
        comprobar : true
      },
      CATEGORYNAME : {
        tipo : Tipos.Cadena,
        comprobar : true
      },
      CANONICALCATEGORYCODE : {
        tipo : Tipos.Cadena,
        comprobar : false 
      }
    },
    claves : {
      CATEGORYID : {}
    }
  },

  TBL_HOMOLOGATIONDATA : {

    alias : 'TBL_HOMOLOGATIONDATA',
    esquema : 'DTVLA',
    campoInfo : 'HOMOLOGATEDCONCEPT',
    campos : {

      COUNTRYID : {
        tipo : Tipos.Candea,
        comprobar : true
      },
      CANONICALCODE : {
        tipo : Tipos.Cadena,
        comprobar : true
      },
      HOMOLOGATEDCONCEPT : {
        tipo : Tipos.Cadena,
        comprobar : false
      },
      TARGETSYSTEMCODE : {
        tipo : Tipos.Cadena,
        comprobar : false
      },
      CATEGORYID : {
        tipo : Tipos.Numerico,
        comprobar : false,
        ref : 'TBL_HOMOLOGATIONCATEGORIES',
        camposRef : [ 
          'CATEGORYID'
        ] 
      },
      HOMOLOGATEDCODE : {
        tipo : Tipos.Cadena,
        comprobar : false
      }
    },
    claves : {
      COUNTRYID : {},
      CANONICALCODE : {}
    }
  },

  TBL_RESPONSE_MESSAGES_CATALOG : {

    alias : 'TBL_RESPONSE_MESSAGES_CATALOG',
    esquema : 'SMSCHANNEL',
    campoInfo : 'TEXT_MESSAGE',
    campos : {

      ID_MESSAGE : {
        tipo : Tipos.Numerico,
        comprobar : true
      },
      TEXT_MESSAGE : {
        tipo : Tipos.Cadena,
        comprobar : false
      },
      ISO2CODE : {
        tipo : Tipos.Cadena,
        comprobar : true
      }
    },
    claves : {
      ID_MESSAGE : {},
      ISO2CODE : {}
    }
  },

  CACHE_CONFIGURATION : {

    alias : 'CACHE_CONFIGURATION',
    esquema : 'DTVLA',
    campos : {

      ID : {
        tipo : Tipos.Numerico,
        comprobar : false,
        saltear : true
      },
      COUNTRY : {
        tipo : Tipos.Cadena,
        comprobar : true
      },
      INSTANCE : {
        tipo : Tipos.Cadena,
        comprobar : true
      },
      SERVICE : {
        tipo : Tipos.Cadena,
        comprobar : true
      },
      OPERATION : {
        tipo : Tipos.Cadena,
        comprobar : true
      },
      TTL : {
        tipo : Tipos.Numerico,
        comprobar : false 
      }
    },
    claves : {
      ID : {}
    }
  },

  TBL_CONNECTIONS : {

    alias : 'TBL_CONNECTIONS',
    esquema : 'DTVLA',
    campos : {

      COUNTRY_ID : {
        tipo : Tipos.Cadena,
        comprobar : true
      },
      ID_SYSTEM : {
        tipo : Tipos.Cadena,
        comprobar : true
      },
      URL_SYSTEM : {
        tipo : Tipos.Cadena,
        comprobar : false
      },
      USER_ID : {
        tipo : Tipos.Cadena,
        comprobar : false
      },
      USER_PROOF : {
        tipo : Tipos.Cadena,
        comprobar : false
      },
      DSN_SYSTEM : {
        tipo : Tipos.Cadena,
        comprobar : false
      },
      ISO2CODE : {
        tipo : Tipos.Cadena,
        comprobar : true
      },
      ISO3CODE : {
        tipo : Tipos.Cadena,
        comprobar : true
      },
      SYSTEM_VERSION : {
        tipo : Tipos.Cadena,
        comprobar : false
      }
    },
    claves : {
      COUNTRY_ID : {},
      ID_SYSTEM : {},
      ISO2CODE : {},
      ISO3CODE : {}
    }
  }
};
