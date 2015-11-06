EnvMan.Models.GenericModel = Backbone.Model.extend({
  
  initialize : function (url, idAttribute) {

    this.baseURL = url;
    this.idAttribute = idAttribute;

    this.url = function () {

      var id = this.get(this.idAttribute) || '';
      return this.baseURL + '/' + window.job.target + '/' + id

    }

  }

});
