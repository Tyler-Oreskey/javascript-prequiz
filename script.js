$(document).ready(function () {
    createTable(1, 10, "strip");
    createTable(20, 20, "main");

    // defaults
    $("#strip td:first").attr('class', 'selected');

    handleStripClickEvents();
    handleMainClickEvents();
});

function handleStripClickEvents() {
    $('#strip td').click(function() {
        $('#strip .selected').removeClass('selected');
        $(this).addClass('selected');
    });
}

function handleMainClickEvents() {
    $('#main td').click(function() {
        const row = $(this).closest('tr').index();
        const col = $(this).index();
        alert('Cell coordinates: Row ' + row + ', Column ' + col);
    });
}

function createTable(rows, cols, id)  {
    const table = document.getElementById(id);
    table.innerHTML = "";

    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("td");
            const cellId = `${i}-${j}`;
            cell.setAttribute("id", cellId);
            cell.textContent = cellId;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}