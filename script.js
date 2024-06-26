$(document).ready(function() {
  // Fiktive CO²-Emissionsdaten
  const emissionsData = [
    { land: 'Germany', unternehmen: 'Company A', emissionen: 100 },
    { land: 'USA', unternehmen: 'Company B', emissionen: 200 },
    { land: 'France', unternehmen: 'Company C', emissionen: 150 },
    { land: 'China', unternehmen: 'Company D', emissionen: 300 },
    { land: 'Japan', unternehmen: 'Company E', emissionen: 250 },
    { land: 'India', unternehmen: 'Company F', emissionen: 180 },
    { land: 'China', unternehmen: 'Company G', emissionen: 220 },
    { land: 'Australia', unternehmen: 'Company H', emissionen: 190 },
    { land: 'Canada', unternehmen: 'Company I', emissionen: 270 },
    { land: 'Russia', unternehmen: 'Company J', emissionen: 240 },
    { land: 'South Africa', unternehmen: 'Company K', emissionen: 210 },
    { land: 'USA', unternehmen: 'Company L', emissionen: 230 },
    { land: 'Germany', unternehmen: 'Company M', emissionen: 280 },
    { land: 'USA', unternehmen: 'Company N', emissionen: 320 },
    { land: 'France', unternehmen: 'Company O', emissionen: 270 },
    { land: 'China', unternehmen: 'Company P', emissionen: 350 },
    { land: 'Japan', unternehmen: 'Company Q', emissionen: 310 },
    { land: 'India', unternehmen: 'Company R', emissionen: 240 },
    { land: 'India', unternehmen: 'Company S', emissionen: 290 },
    { land: 'Germany', unternehmen: 'Company T', emissionen: 260 },
    { land: 'USA', unternehmen: 'Company U', emissionen: 330 },
    { land: 'Russia', unternehmen: 'Company V', emissionen: 300 },
    { land: 'Russia', unternehmen: 'Company W', emissionen: 270 },
    { land: 'Germany', unternehmen: 'Company X', emissionen: 290 },
    { land: 'South Africa', unternehmen: 'Company Y', emissionen: 170 },
    { land: 'South Africa', unternehmen: 'Company Z', emissionen: 220 }
  ];

   const tableBody = document.querySelector('#emissionsTable tbody');

   // Schleife um Tabellenzeilen zu generieren und befüllen
   emissionsData.forEach((data) => {
    const row = document.createElement('tr');

    const cellLand = document.createElement('td');
    cellLand.textContent = data.land;
    row.appendChild(cellLand);

    const cellUnternehmen = document.createElement('td');
    cellUnternehmen.textContent = data.unternehmen;
    row.appendChild(cellUnternehmen);

    const cellEmissionen = document.createElement('td');
    cellEmissionen.textContent = data.emissionen;
    row.appendChild(cellEmissionen);

    tableBody.appendChild(row);
});

  const dataTable = $('#emissionsTable').DataTable({
    data: emissionsData,
    render: DataTable.render.text(),
    columns: [
      { data: 'land' },
      { data: 'unternehmen' },
      { data: 'emissionen' }
    ],
    "order": [[0, "asc"]],
    "searching": true,
    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Alle"]],
    "language": {
      "lengthMenu": "Einträge pro Seite: _MENU_",
      "zeroRecords": "Keine passenden Einträge gefunden",
      "info": "_START_ - _END_ von _TOTAL_",
      "infoEmpty": "Keine Einträge verfügbar",
      "infoFiltered": "(gefiltert von _MAX_ Einträgen insgesamt)",
      "search": "Suchen:",
      "paginate": {
        "first": "Erste",
        "last": "Letzte",
        "next": "Nächste",
        "previous": "Vorherige"
      }
    }
  });

  // Dropdown Filter
  $('#emissionsTable').DataTable().columns([0, 1]).every(function () {
    const column = this;
    const select = $('<select><option value=""></option></select>')
      .appendTo($(column.header()))
      .on('change', function () {
        const val = $.fn.dataTable.util.escapeRegex($(this).val());

        column
          .search(val ? '^' + val + '$' : '', true, false)
          .draw();
      });

    column.data().unique().sort().each(function (d, j) {
      select.append('<option value="' + d + '">' + d + '</option>')
    });
  });
});

//Menü mit lokalen Links toggle
$('#sideMenuToggle').click(function(){
  $('#sideMenu').collapse('toggle');
});

//Schließen bei klick außerhalb
$(document).on('click', function (e) {
  if (!$(e.target).closest('#sideMenu').length && !$(e.target).closest('#sideMenuToggle').length) {
    $('#sideMenu').collapse('hide');
  }
});
