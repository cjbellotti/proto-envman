function VerifTable(config) {

  var table = $('<div class="verif-table"/>');

  table.config = _.clone(config);

  table.applyStyles = function (column, element) {

    // Aplica estilos configurados a la columna
    if (table.config.columns[column].styles) {

      for (var style in table.config.columns[column].styles)
        element.css(style, table.config.columns[column].styles[style]);

    }

  }

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
    
    table.applyStyles(column, columnDiv);

    header.append(columnDiv);

  }


  table.append(header);
  table.append(body);

  table.add = function (data) {

    var row = $('<div class="vt-row"/>');
    for (var column in table.config.columns) {

      var columnDiv = $('<div class="vt-column"/>');
      table.applyStyles(column, columnDiv); 
      if (data[table.config.columns[column].dataField])
        columnDiv.html(data[table.config.columns[column].dataField]);
      row.append(columnDiv);

    }

    bodyContainer.append(row);

  }

  return table;
}
