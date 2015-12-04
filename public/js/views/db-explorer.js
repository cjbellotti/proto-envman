EnvMan.Views.DBExplorer = Backbone.View.extend({

	initialize : function () {

          var customFilter = function (element, headerTemplate, callbackFunction) {

            element.find('.dt-tab-body').hide();
            var rows = element.find('.dt-tab-row');

            async.eachSeries(rows, function (item, callback) {
              var row = $(item);

              var match = true;

              var fieldIndex = 0;
              async.eachSeries(_.keys(headerTemplate), function (field, next) {

                var inputCell = element.find('.dt-tab-input-' + fieldIndex);
                if (inputCell) {

                  if (match) {

                    var upCased = row.find('.dt-tab-cell-' + fieldIndex).html();
                    if (upCased) {
                      upCased = upCased.toString();
                      upCased = upCased.toUpperCase();
                      var filter = inputCell.val().toUpperCase();

                      match = (upCased.indexOf(filter) >= 0); 
                    }

                  }

                }
                fieldIndex++;
                next();

              }, function () {

                if (match)
                  row.show();
                else
                  row.hide();

              });


              callback();

            }, function () {

              element.find('.dt-tab-body').show();
              if (callbackFunction)
                callbackFunction();
            });

          };

		this.template = swig.compile(getTemplate('templates/db-explorer.html'));

                this.tablas = {};

                var config = {};
                config.headers = {};
                config.headers.Id = {
                  style : {
                    width : '6%'
                  },
                  dataField : 'ID'
                };
                config.headers.Pais = {
                  style : {
                    width : '5%'
                  },
                  dataField : 'PAIS'
                };
                config.headers.Nombre = {
                  style : {
                    width : '35%'
                  },
                  dataField : 'NOMBRE'
                };
                config.headers.Descripcion = {
                  style : {
                    width : '55%'
                  },
                  dataField : 'DESCRIPCION'
                };
                config.filterable = true;
		this.tablas.DVM_SISTEMA = MyTable(config);

                config = {};
                config.headers = {};
                config.headers.Id = {
                  style : {
                    width : '6%'
                  },
                  dataField : 'ID'
                };
                config.headers.Nombre = {
                  style : {
                    width : '35%'
                  },
                  dataField : 'NOMBRE'
                };
                config.headers.Descripcion = {
                  style : {
                    width : '60%'
                  },
                  dataField : 'DESCRIPCION'
                };
                config.filterable = true;
		this.tablas.DVM_ENTIDAD_CANONICA = MyTable(config);

                config.headers = {};
                config.headers.Id = {
                  style : {
                    width : '6%'
                  },
                  dataField : 'ID'
                };
                config.headers['Entidad Canonica'] = {
                  style : {
                    width : '40%'
                  },
                  dataField : 'ID_ENTIDAD_CANONICA'
                };
                config.headers.Descripcion = {
                  style : {
                    width : '30%'
                  },
                  dataField : 'DESCRIPCION'
                };
                config.headers['Valor Canonico'] = {
                  style : {
                    width : '25%'
                  },
                  dataField : 'VALOR_CANONICO'
                };
                config.processCell = function (field, content) {

                  var nombre = content;
                  if (field == "ID_ENTIDAD_CANONICA"){

                    //var entidad = window.collections.entidades.get(content);
                    var entidad = window.manageData.get('DVM_ENTIDAD_CANONICA', { ID : content });
                    if (entidad)
                      nombre = entidad.get('NOMBRE');
                    else
                      nombre = content;

                  } 

                  return nombre;

                };

                config.filterable = true;
		this.tablas.DVM_VALOR_CANONICO = MyTable(config);

                config = {};
                config.headers = {};
                config.headers.Id = {
                  style : {
                    width : '6%'
                  },
                  dataField : 'ID'
                };
                config.headers.Sistema = {
                  style : {
                    width : '15%'
                  },
                  dataField : 'ID_SISTEMA'
                };
                config.headers.Pais = {
                  style : {
                    width : '10%'
                  },
                  dataField : 'PAIS'
                };
                config.headers['Entidad Canonica'] = {
                  style : {
                    width : '30%'
                  },
                  dataField : 'ID_ENTIDAD_CANONICA'
                };
                config.headers['Valor Canonico'] = {
                  style : {
                    width : '15%',
                    'margin-left' : '10px'
                  },
                  dataField : 'ID_VALOR_CANONICO'
                };
                config.headers['Valor Sistema'] = {
                  style : {
                    width : '24%',
                    'margin-left' : '10px'
                  },
                  dataField : 'VALOR_SISTEMA'
                };
                config.processCell = function (field, content, rowData) {

                  var nombre = content;
                  if (field == "ID_ENTIDAD_CANONICA"){

                    if (parseInt(content)) {

                      //var entidad = window.collections.entidades.get(content);
                      var entidad = window.manageData.get('DVM_ENTIDAD_CANONICA', { ID : content });
                      if (entidad)
                        nombre = entidad.get('NOMBRE');
                      else
                        nombre = content;

                    }


                  } else if (field == "ID_SISTEMA") {

                    if (parseInt(content)) {

                      //var valorCanonico = window.collections.sistemas.get(content);
                      var valorCanonico = window.manageData.get('DVM_SISTEMA', { ID : content});
                      if (valorCanonico)
                        nombre = valorCanonico.get('NOMBRE');
                      else
                        nombre = content;

                    }

                  } else if (field == "PAIS") {

                    //var sistema = window.collections.sistemas.get(rowData.ID_SISTEMA);
                    var sistema = window.manageData.get('DVM_SISTEMA', { ID : rowData.ID_SISTEMA });
                    if (!sistema)
                      nombre = "Sin Pais";
                    else
                      nombre = sistema.get('PAIS');		

                  } else if (field == "ID_VALOR_CANONICO") {

                    if (parseInt(content)) {	

                      //var valorCanonico = window.collections.valoresCanonicos.get(content);
                      var valorCanonica = window.manageData.get('DVM_VALOR_CANONICO', { ID : content });
                      if (valorCanonico)
                        nombre = valorCanonico.get('VALOR_CANONICO');
                      else
                        nombre = content;

                    }

                  } 

                  if (!rowData[field])
                    rowData[field] = nombre;

                  return nombre;

                }

                config.filterable = true;
		this.tablas.DVM_VALOR_SISTEMA = MyTable(config);

                config.headers = {};
                config.headers['Category Id'] = {
                  style : {
                    width : '6%'
                  },
                  dataField : 'CATEGORYID'
                };
                config.headers['Category Name'] = {
                  style : {
                    width : '40%'
                  },
                  dataField : 'CATEGORYNAME'
                };
                config.headers['Canonical Category Code'] = {
                  style : {
                    width : '30%'
                  },
                  dataField : 'CANONICALCATEGORYCODE'
                };
                config.processCell = function (field, content) {

                  var nombre = content;
                  return nombre;

                };

                config.filterable = true;
		this.tablas.TBL_HOMOLOGATIONCATEGORIES = MyTable(config);

                config.headers = {};
                config.headers['Country Id'] = {
                  style : {
                    width : '6%' 
                  },
                  dataField : 'COUNTRYID'
                };
                config.headers['Canonical Code'] = {
                  style : {
                    width : '24%'
                  },
                  dataField : 'CANONICALCODE'
                };
                config.headers['Homologated Concept'] = {
                  style : {
                    width : '20%'
                  },
                  dataField : 'HOMOLOGATEDCONCEPT'
                };
                config.headers['Target System Code'] = {
                  style : {
                    width : '10%'
                  },
                  dataField : 'TARGETSYSTEMCODE'
                };
                config.headers['Category Id'] = {
                  style : {
                    width : '20%'
                  },
                  dataField : 'CATEGORYID'
                };
                config.headers['Homologated Code'] = {
                  style : {
                    width : '19%'
                  },
                  dataField : 'HOMOLOGATEDCODE'
                };
                config.processCell = function (field, content) {

                  var nombre = content;
                  return nombre;

                };

                config.filterable = true;
		this.tablas.TBL_HOMOLOGATIONDATA = MyTable(config);

                config.headers = {};
		    config.headers.Id = {
			style : {
			  width : '6%'
			},
			dataField : 'ID_MESSAGE'
		    };
		    config.headers.Texto = {
			style : {
			  width : '29%'
			},
			dataField : 'TEXT_MESSAGE'
		    };
		    config.headers.ISO2CODE = {
			style : {
			  width : '10%'
			},
			dataField : 'ISO2CODE'
		    };
                config.processCell = function (field, content) {

                  var nombre = content;
                  return nombre;

                };

                config.filterable = true;
		this.tablas.TBL_RESPONSE_MESSAGES_CATALOG = MyTable(config);

    config.headers = {};
    config.headers.Id = {
        style : {
          width : '6%'
        },
        dataField : 'ID'
    };
    config.headers.Country = {
        style : {
          width : '10%'
        },
        dataField : 'COUNTRY'
    };
    config.headers.Instance = {
        style : {
          width : '10%'
        },
        dataField : 'INSTANCE'
    };
    config.headers.Service = {
        style : {
          width : '10%'
        },
        dataField : 'SERVICE'
    };
    config.headers.Operation = {
        style : {
          width : '10%'
        },
        dataField : 'OPERATION'
    };
    config.headers.TTL = {
        style : {
          width : '5%'
        },
        dataField : 'TTL'
    };
    config.processCell = function (field, content) {

      var nombre = content;
      return nombre;

    };

    config.filterable = true;
		this.tablas.CACHE_CONFIGURATION = MyTable(config);

    config.headers = {};
    config.headers['Country ID'] = {
        style : {
          width : '6%'
        },
        dataField : 'COUNTRY_ID'
    };
    config.headers['System ID'] = {
        style : {
          width : '10%'
        },
        dataField : 'ID_SYSTEM'
    };
    config.headers['System URL'] = {
        style : {
          width : '10%'
        },
        dataField : 'URL_SYSTEM'
    };
    config.headers['User ID'] = {
        style : {
          width : '10%'
        },
        dataField : 'USER_ID'
    };
    config.headers['User Proof'] = {
        style : {
          width : '10%'
        },
        dataField : 'USER_PROOF'
    };
    config.headers['System DSN'] = {
        style : {
          width : '10%'
        },
        dataField : 'DSN_SYSTEM'
    };
    config.headers['ISO2CODE'] = {
        style : {
          width : '5%'
        },
        dataField : 'ISO2CODE'
    };
    config.headers['ISO3CODE'] = {
        style : {
          width : '5%'
        },
        dataField : 'ISO3CODE'
    };
    config.headers['System Version'] = {
        style : {
          width : '10%'
        },
        dataField : 'SYSTEM_VERSION'
    };
    config.processCell = function (field, content) {

      var nombre = content;
      return nombre;

    };

    config.filterable = true;
		this.tablas.TBL_CONNECTIONS = MyTable(config);
	},

        events : {
          "change #ambiente" : "cargarTabla",
          "change #tabla" : "cargarTabla"
        },

	render : function () {

		this.$el.html(this.template());
    window.generales.cargarComboTablas(this.$el.find('#tabla'));
    window.generales.cargarComboAmbientes(this.$el.find('#ambiente'));
    this.cargarTabla();

	},

        cargarTabla : function () {

            var self = this;
            var espera = new EnvMan.Views.Espera({

              onshow : function () {

                var ambiente = self.$el.find('#ambiente').val();
                var tabla = self.$el.find('#tabla').val();

                window.job.target = ambiente;
                //window.collections.sistemas.fetchData({ async : false });
                //window.collections.entidades.fetchData({ async : false });
                //window.collections.valoresCanonicos.fetchData({ async : false });

                window.manageData.fetch({

                  success : function () {

                    self.$el.find('.table-container').html('');
                    self.$el.find('.table-container').append(self.tablas[tabla]);
                    var data = window.manageData.colecciones[tabla].toJSON();
                    self.tablas[tabla].setArrayDataAsync(data, {}, function () {
                      espera.hide();
                    });

                  }

                });

                //$.get('/' + window.defTablas[tabla].alias + '/' + ambiente, function (data) {

                //  self.$el.find('.table-container').html('');
                //  self.$el.find('.table-container').append(self.tablas[tabla]);
                //  self.tablas[tabla].setArrayDataAsync(data, {}, function () {
                //    espera.hide();
                //  });

                // });

              }

            });

            espera.render();
            espera.show();

        }

});
