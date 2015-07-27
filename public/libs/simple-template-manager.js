var templateCache = {};

function getTemplate(path) {

  if (!templateCache[path]) {
    $.ajax({
      url : path,
      async : false,
      success : function (data) {
        templateCache[path] = data;
      }
    });
  }

  return templateCache[path];
}
