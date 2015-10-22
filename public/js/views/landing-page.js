EnvMan.Views.LandingPage = Backbone.View.extend({

		initialize : function () {
	
			this.template = swig.compile( $('#landing-page-template').html() );

		},

		render : function () {

				var data = {};
				data.aplicaciones = [];
				data.aplicaciones.push({
					icono : "glyphicon-cog",
					nombre : "Environment Manager",
					descripcion : "Aplicacion para administrar tablas de configuracion de ambiente",
					ruta_manual : "manual.docx",
					habilitado : true,
          url : '#envman'
				});
				data.aplicaciones.push({
					icono : "glyphicon-sort",
					nombre : "Comparador de Bases",
					descripcion : "Herramienta para obtener las diferencias entre bases",
					ruta_manual : "manual.docx",
					habilitado : false,
                                        url : '#dbcomparer'
				});
				data.aplicaciones.push({
					icono : "glyphicon-eye-open",
					nombre : "DB Explorer",
					descripcion : "Permite explorar las tablas de configuracion de las bases.",
					ruta_manual : "manual.docx",
					habilitado : true,
                                        url : '#dbexplorer'
				});
				data.aplicaciones.push({
					icono : "glyphicon-random",
					nombre : "Environment Explorer",
					descripcion : "Genera un reporte con las diferencias y faltantes de componentes entre ambientes.",
					ruta_manual : "manual.docx",
					habilitado : true,
                                        url : '#envcomparer'
				});
				data.noticias = [];
				data.noticias.push({
						fecha : "16/07/2015 14:00",
						texto : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in nulla consectetur, pellentesque justo quis, luctus massa. Cras tempor, dui nec porttitor interdum, erat justo maximus purus, et maximus felis lacus ac neque. Vestibulum pharetra ipsum elit, ut rutrum ante elementum nec. Nulla molestie, orci sed viverra tincidunt, nunc velit vestibulum urna, eu convallis elit eros et ex. Fusce vitae aliquam quam, sed dignissim neque. Etiam dictum efficitur dolor sit amet euismod. Nullam ullamcorper nisl quam, a convallis purus ornare nec. Etiam ac augue vitae massa interdum placerat non a ante. Quisque elementum lectus in malesuada suscipit. Donec eu accumsan turpis. Sed at ullamcorper augue. Nullam et enim in leo malesuada pretium."
				});
				data.noticias.push({
						fecha : "16/07/2015 14:00",
						texto : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in nulla consectetur, pellentesque justo quis, luctus massa. Cras tempor, dui nec porttitor interdum, erat justo maximus purus, et maximus felis lacus ac neque. Vestibulum pharetra ipsum elit, ut rutrum ante elementum nec. Nulla molestie, orci sed viverra tincidunt, nunc velit vestibulum urna, eu convallis elit eros et ex. Fusce vitae aliquam quam, sed dignissim neque. Etiam dictum efficitur dolor sit amet euismod. Nullam ullamcorper nisl quam, a convallis purus ornare nec. Etiam ac augue vitae massa interdum placerat non a ante. Quisque elementum lectus in malesuada suscipit. Donec eu accumsan turpis. Sed at ullamcorper augue. Nullam et enim in leo malesuada pretium."
				});
				data.noticias.push({
						fecha : "16/07/2015 14:00",
						texto : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in nulla consectetur, pellentesque justo quis, luctus massa. Cras tempor, dui nec porttitor interdum, erat justo maximus purus, et maximus felis lacus ac neque. Vestibulum pharetra ipsum elit, ut rutrum ante elementum nec. Nulla molestie, orci sed viverra tincidunt, nunc velit vestibulum urna, eu convallis elit eros et ex. Fusce vitae aliquam quam, sed dignissim neque. Etiam dictum efficitur dolor sit amet euismod. Nullam ullamcorper nisl quam, a convallis purus ornare nec. Etiam ac augue vitae massa interdum placerat non a ante. Quisque elementum lectus in malesuada suscipit. Donec eu accumsan turpis. Sed at ullamcorper augue. Nullam et enim in leo malesuada pretium."
				});
				data.noticias.push({
						fecha : "16/07/2015 14:00",
						texto : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in nulla consectetur, pellentesque justo quis, luctus massa. Cras tempor, dui nec porttitor interdum, erat justo maximus purus, et maximus felis lacus ac neque. Vestibulum pharetra ipsum elit, ut rutrum ante elementum nec. Nulla molestie, orci sed viverra tincidunt, nunc velit vestibulum urna, eu convallis elit eros et ex. Fusce vitae aliquam quam, sed dignissim neque. Etiam dictum efficitur dolor sit amet euismod. Nullam ullamcorper nisl quam, a convallis purus ornare nec. Etiam ac augue vitae massa interdum placerat non a ante. Quisque elementum lectus in malesuada suscipit. Donec eu accumsan turpis. Sed at ullamcorper augue. Nullam et enim in leo malesuada pretium."
				});
				this.$el.html(this.template(data));

		}
});
