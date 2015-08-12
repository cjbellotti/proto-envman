function VerifTable(config) {

  var table = $('<div class="verif-table"/>');

  table.config = _.clone(config);

  var header = $('<div class="vt-header"/>');
  var body = $('<div class="vt-body"/>');
  var bodyContainer = $('<div class="vt-body-container"/>');
  body.append(bodyContainer);

  table.on('change', function (e) {
    console.log('Resize!!!');
  });

  for (var column in table.config.columns){

    var columnDiv = $('<div class="vt-column vt-column-h"/>');
    columnDiv.html (column);

    // Aplica estilos configurados a la columna
    if (table.config.columns[column].styles) {

      for (var style in table.config.columns[column].styles)
        columnDiv.css(style, table.config.columns[column].styles[style]);

    }

    header.append(columnDiv);

  }

  table.append(header);
  table.append(body);
  return table;
}
