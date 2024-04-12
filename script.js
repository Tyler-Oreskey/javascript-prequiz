const colors = ['black', 'red', 'blue', 'yellow', 'green', 'purple', 'orange', 'cyan', 'magenta', 'gray'];

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

function applyColorToSelectedElements(elements) {
    elements.forEach(element => {
        const className = $(element).attr('class');

        if (colors.includes(className)) {
            $(element).removeClass(className);
        }
        else {
            $(element).addClass('orange');
        }
    });
}

function handleMainClickEvents() {
    $('#main td').click(function() {
        const id = $(this).attr('id');
        const index = parseInt(id.substr(id.indexOf('-') + 1));
        const orthogonalIndices = getOrthogonalIndices(index);
        const elements = orthogonalIndices.map((index) => $(`#main-${index}`));
        elements.push($(this));
        applyColorToSelectedElements(elements);
    });
}

function createTable(rows, cols, id)  {
    const table = document.getElementById(id);
    let count = 0;
    table.innerHTML = "";

    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("td");
            const cellId = `${id}-${count++}`;
            cell.setAttribute("id", cellId);
            cell.textContent = cellId;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

function getOrthogonalIndices(index) {
    const row = Math.floor(index / 20);
    const col = index % 20;
    const orthogonalIndices = [];

    if (row > 0) {
        orthogonalIndices.push(index - 20);
    }

    if (row < 19) {
        orthogonalIndices.push(index + 20);
    }

    if (col > 0) {
        orthogonalIndices.push(index - 1);
    }

    if (col < 19) {
        orthogonalIndices.push(index + 1);
    }
    
    return orthogonalIndices;
}