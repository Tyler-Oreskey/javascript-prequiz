const colors = ['black', 'red', 'blue', 'yellow', 'green', 'purple', 'orange', 'cyan', 'magenta', 'gray'];

$(document).ready(function () {
    createTable(1, colors.length, "strip");
    createTable(20, 20, "main");

    // ind color to table cell
    $('[id^="strip-"]').each(function(index) {
        $(this).addClass(colors[index]);
    });

    // defaults
    $("#strip td:first").addClass('selected');

    handleStripClickEvents();
    handleMainClickEvents();
});

function handleStripClickEvents() {
    $('#strip td').click(function() {
        const selectedColor = $('#strip .selected');
        selectedColor.removeClass('selected');
        $(this).addClass('selected');
        const color = $('#strip .selected').attr('class').split(' ')[0];

        const tds = $('#main td').filter(function() {
            const className = $($(this)).attr('class');
            return className ? true : false;
        });

        $(tds).each(function () {
            const className = $($(this)).attr('class');
    
            if (colors.includes(className)) {
                $(this).removeClass(className);
            }
            $(this).addClass(color);
        });
    });
}

function applyColorToSelectedElements(elements) {
    const selectedColor = $('#strip .selected').attr('class').split(' ')[0];

    elements.forEach(element => {
        const className = $(element).attr('class');

        if (colors.includes(className)) {
            $(element).removeClass(className);
        }
        else {
            $(element).addClass(selectedColor);
        }
    });
}

function handleMainClickEvents() {
    $('#main td').click(function() {
        const id = $(this).attr('id');
        const index = parseInt(id.substr(id.indexOf('-') + 1));
        const orthogonalIndices = getOrthogonalIndices(index).map((index) => $(`#main-${index}`));
        orthogonalIndices.push($(this));
        applyColorToSelectedElements(orthogonalIndices);
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