EnvMan.Views.Script = Backbone.View.extend({

		initialize : function (data) {

				this.data = data;
				this.template = swig.compile(getTemplate('templates/script.html'));
		},

		events : {

				"click .nav li" : "tabScript"
		},

		tabScript : function (e) {

				this.verScript($(e.currentTarget));

		},

		verScript : function (el) {

				this.$el.find('.nav li').removeClass('active');
				el.addClass('active');
				var dc = el.find('a').html();
				this.$el.find('.script-ta').html(this.data[dc].script);

		},

		render : function () {

				this.$el.html(this.template());
        this.$el.css('width', '100%');
        this.$el.css('height', '100%');

				for (var dc in this.data) {

						this.$el.find('.nav').append('<li><a>' + dc + '</a></li>');

				}

				this.verScript(this.$el.find('.nav li').first());

		}

});
