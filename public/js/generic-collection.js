EnvMan.Collections.GenericCollection = Backbone.Collection.extend({

  initialize : function (url) {

    this.baseURL = url;
    this.url = function () {
      return this.baseURL + '/' + window.job.target
    }

  }

});
