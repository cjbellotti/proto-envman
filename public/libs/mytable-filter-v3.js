function MyTable(config) {

  var tableConfig = _.clone(config);

  var styles = {};

  var processCell = config.processCell || function (field, data) { return data; };
  var loadLimit = config.loadLimit || 30;
  var loadFrom = 0;

  var tableData = [];

  var myTableDiv = $('<div class="dt-table"/>');

  myTableDiv.filter = config.filter || function (element, headerTemplate, callbackFunction) {

    element.find('.dt-tab-body-container').html('');

    loadFrom = 0;
    this.arrayDataView = [];
    
    for (var index = 0; index < this.arrayData.length; index++) {

      var row = this.arrayData[index];

      var match = true;

      var fieldIndex = 0;
      for (var field in headerTemplate) {

        var inputCell = element.find('.dt-tab-input-' + fieldIndex);
        if (inputCell) {
         
          if (match) {

            var upCased = processCell(field, row[field], row, this);
            if (upCased) {
              upCased = upCased.toString();
              upCased = upCased.toUpperCase();
              var filter = inputCell.val().toUpperCase();

              match = (upCased.indexOf(filter) >= 0); 
            }

          }

        }
        fieldIndex++;

      }

      if (match)
        this.arrayDataView.push(row);

    }

    myTableDiv.loadTable(function () {
      if(callbackFunction)
        callbackFunction();
    });

  };

  var headerDiv = $('<div class="dt-tab-header"/>');
  myTableDiv.append(headerDiv);
  var bodyDiv = $('<div class="dt-tab-body"/>');

  var bodyContainerDiv = $('<div class="dt-tab-body-container"/>');
  bodyDiv.append(bodyContainerDiv);

  bodyDiv.scroll(function (e) {
    var el = $(e.target);

    if (el.scrollTop() + el.height() > bodyContainerDiv.height())
      myTableDiv.loadTable();

  });

  myTableDiv.append(bodyDiv);

  if (config.filterable) {

    var cellIndex = 0;
    var rowFilterDiv = $('<div class="dt-tab-row-filter"/>');

    for (var header in config.headers) {

      var divCell = $('<div class="dt-tab-cell dt-tab-cell-' + cellIndex + '"/>');

      var input = $('<input type="text" class="dt-tab-input-' + cellIndex + '"/>');
      input.css('width', '100%');

      input.on('keyup', function (e) {
        myTableDiv.filter(myTableDiv, headerTemplate, function () {
          $('.dt-tab-row:visible:odd').not('.dt-tab-diff').not('.dt-tab-new').css('background', 'white');
          $('.dt-tab-row:visible:even').not('.dt-tab-diff').not('.dt-tab-new').css('background', '#D1E0E0');
        });
      });

      divCell.append(input);

      if (config.headers[header].style)
        for (var tag in config.headers[header].style)
          divCell.css(tag, config.headers[header].style[tag]);

      rowFilterDiv.append(divCell);

      cellIndex++;
    }
    headerDiv.append(rowFilterDiv);

  }

  var rowHeaderDiv = $('<div class="dt-tab-row-header"/>');
  headerDiv.append(rowHeaderDiv);

  var cellIndex = 0;

  if (config.selectable) {

    var checkbox = $('<input type="checkbox" class="myTable-checkbox"></input>');

    checkbox.on('click', function () {

      var value = checkbox.prop('checked');

      for (var index in tableData) {

        tableData[index].find('input').prop('checked', value);
        if (value) {
          tableData[index].css('font-weight', 'bold');
        } else {
          tableData[index].css('font-weight', 'normal');
        }

      }

    });

    var divCheckbox = $('<div class="dt-tab-cell dt-tab-cell-' + cellIndex + '"/>');
    cellIndex++;
    divCheckbox.append(checkbox);

    rowHeaderDiv.append(divCheckbox);

  }

  var headerTemplate = {};

  for (var header in config.headers) {

    var divCell = $('<div class="dt-tab-cell dt-tab-cell-' + cellIndex + '"/>');
    cellIndex++;

    if (config.headers[header].style)
      for (var tag in config.headers[header].style)
        divCell.css(tag, config.headers[header].style[tag]);

    divCell.html(config.headers[header].title || header);
    rowHeaderDiv.append(divCell);

    headerTemplate[config.headers[header].dataField || header] = "";
    styles[config.headers[header].dataField || header] = config.headers[header].style;

  }

  myTableDiv.addRow = function (data) {

    var rowDiv = $('<div class="dt-tab-row"/>');

    var cellIndex = 0;
    if (tableConfig.processRow)
      tableConfig.processRow(rowDiv, data);

    if (config.selectable) {

      var cellDiv = $('<div class="dt-tab-cell dt-tab-cell-' + cellIndex + '"/>');
      cellIndex++;
      var checkbox = $('<input type="checkbox"></input>');
      checkbox.on('change', function () {

        var value = checkbox.prop('checked');
        if (value) {
          rowDiv.find('div').css('font-weight', 'bold');
        } else {
          rowDiv.find('div').css('font-weight', 'normal');
        }

      });
      cellDiv.append(checkbox);
      rowDiv.append(cellDiv);

    }

    for (var field in headerTemplate)
      headerTemplate[field] = null;

    for (var field in headerTemplate) {
        headerTemplate[field] = data[field];
    }

    for (var field in headerTemplate) {

      var cellDiv = $('<div class="dt-tab-cell dt-tab-cell-' + cellIndex + '"/>');
      cellIndex++;
      var content = processCell(field, headerTemplate[field], data, this);
      cellDiv.html(content);

      cellDiv.attr('data-toggle', 'tooltip');
      cellDiv.attr('data-placement', 'bottom');
      cellDiv.attr('title', content);

        for (var tag in styles[field])
          cellDiv.css(tag, styles[field][tag]);

      rowDiv.append(cellDiv);

    }

    //bodyDiv.append(rowDiv);
    bodyContainerDiv.append(rowDiv);
    tableData.push(rowDiv);

  }

  myTableDiv.getRow = function (index) {

    return tableData[index];

  }

  myTableDiv.removeRow = function (index) {

    tableData[index].remove();
    tableData = _.without(tableData, tableData[index]);

  }

  myTableDiv.removeRows = function (rows) {

    var rowsElements = [];

    for (var index in rows) {

      rowsElements.push(tableData[rows[index]]);

    }

    for (var index in rowsElements) {

      tableData = _.without(tableData, rowsElements[index]);
      rowsElements[index].remove();

    }

  }

  myTableDiv.removeSelectedRows = function () {
    var rows = myTableDiv.getSelectedRows();
    if (rows.length > 0)
      myTableDiv.removeRows(rows);
  }

  myTableDiv.getSelectedRows = function () {

    var selecteds = [];

    for (var index in tableData) {
      if(tableData[index].find('input').prop('checked'))
        selecteds.push(parseInt(index));
    }

    return selecteds;

  }

  myTableDiv.reset = function () {
    for (var index in tableData) {
      tableData[index].remove();
    }
    tableData = [];
  }

  myTableDiv.setArrayDataAsync = function (array, options, callback) {

    var self = this;

    options = options || {};

    this.arrayData = array;
    this.arrayDataView = [];
    loadFrom = 0;

    console.log ('Inicio setArrayData %s...', Date());
    myTableDiv.reset();

    for (var index in this.arrayData) {

      self.arrayDataView.push(this.arrayData[index]);

    }

    console.log ('Fin setArrayData %s...', Date());
    myTableDiv.loadTable();

    Object.observe(self.arrayData, function (changes) {

        myTableDiv.filter(myTableDiv, headerTemplate, function () {
          myTableDiv.loadTable();
        });

    });

    callback();

  }

  myTableDiv.loadTable = function (callback) {

    var self = this;
    var data = {};
    var limite = loadFrom + loadLimit;

    for (;(loadFrom < self.arrayDataView.length) && (loadFrom < limite); loadFrom++) {

      if (loadFrom < self.arrayDataView.length) {
        data = self.arrayDataView[loadFrom];
        self.addRow(data);
      }

    }

    if (callback)
      callback();

    /*async.eachSeries(Array(loadLimit), function (item, next){

      if (loadFrom < self.arrayDataView.length) {
        data = self.arrayDataView[loadFrom];
        self.addRow(data);
        loadFrom++;
      }

      next();

    }, function () {

      if (callback)
        callback();

    });*/

  }

  myTableDiv.setArrayData = function (array, options) {

    options = options || {};

    this.arrayData = array;
    myTableDiv.reset();
    for (var index in this.arrayData) {

      var data = {};
      var item = this.arrayData[index];
      if (item.cid)
        item = item.toJSON();
      if (options.fields) {

        for (var field in item) {

          var index = _.indexOf(options.fields, field);
          if (index >= 0) {

            if (options.fields[field].alias)
              field = options.fields[field].alias; 
            data[field] = item[field];

          }

        }

      } else {

        data = item;

      }

      myTableDiv.addRow(data);

    }

    var self = this;
    Object.observe(this.arrayData, function (changes) {

      myTableDiv.setArrayData(self.arrayData, options);

    });

  }

  myTableDiv.getArrayData = function() {

    return this.arrayData;

  }

  myTableDiv.reloadArrayData = function() {


  }

  myTableDiv.getRowArrayData = function (index) {

    var ret = null;

    if (this.arrayData) {

      if (index < this.arrayData.length) {
        ret = this.arrayData[index];
      }

    }

    return ret;
  }

  return myTableDiv;
}
