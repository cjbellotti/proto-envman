EnvMan.Views.Landing = Backbone.View.extend({
	
		initialize: function (data){
										
			this.template= swig.compile(getTemplate('templates/landing-envman.html'));
			this.data= data;
			
		},
		
			
		render: function(){
			this.$el.html(this.template(this.data));
		}
		
		
	
	
})
