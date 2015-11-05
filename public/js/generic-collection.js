EnvMan.Collections.GenericCollection = Backbone.Collection.extend({

  initialize : function (url, model) {

    this.baseURL = url;
    this.url = function () {
      return this.baseURL + '/' + window.job.target
    }

    this.model = model || this.model;

  }

});
