function drawTable(data, container) {
  const fields = data.fields;
  const rows = data.rows;

  // Build HTML for the table
  let html = '<table id="dt-table" class="display"><thead><tr>';
  fields.forEach(field => {
    html += `<th>${field.name}</th>`;
  });
  html += '</tr></thead><tbody>';

  rows.forEach(row => {
    html += '<tr>';
    row.forEach(cell => {
      html += `<td>${cell.formatted}</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody></table>';
  container.innerHTML = html;

  // Initialize DataTable
  $('#dt-table').DataTable({
    pageLength: 10
  });
}

looker.plugins.visualizations.add({
  create: function (element, config) {
    element.innerHTML = '<div id="datatable-container"></div>';
  },
  updateAsync: function (data, element, config, queryResponse, details, done) {
    const container = element.querySelector('#datatable-container');
    drawTable(data, container);
    done();
  }
});
