
document.getElementById("getTable").onclick = function () { getTable() };


function getTable() {

    let start_date = document.getElementById('start').value;
    let end_date = document.getElementById('end').value;
    let listHTML = "";

    var requestURL = 'https://api.exchangerate.host/fluctuation?start_date=' + start_date + '&end_date=' + end_date + '&base=USD'
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {

        var response = request.response;
        var tableRef = document.getElementById('currencyTable');
        tableRef.innerHTML = listHTML;




        for (var prop in response.rates) {
            if (prop != 'USD') {
                currency = response.rates[prop]
                let currencyName = prop;
                let startRate = currency.start_rate;
                let endRate = currency.end_rate;
                let change = currency.change;
                if (change < 0) {
                    color = "red"
                } else {
                    color = "green"
                }
                let date = start_date + " to " + end_date;


                listHTML += "<tr> <td class=\"full-width mdl-data-table__cell--non-numeric\">" + currencyName + "</td>"
                    + "<td class=\"full-width mdl-data-table__cell\">" + startRate + "</td>"
                    + "<td class=\"full-width mdl-data-table__cell\">" + endRate + "</td>"
                    + "<td class=\"full-width mdl-data-table__cell\"><font color=" + color + ">" + change + "</font></td></tr>";
            };
        };
        tableRef.innerHTML += listHTML;

    }
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("table");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function sortNumTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;

    table = document.getElementById("table");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            var xContent = (isNaN(x.innerHTML))
                ? (x.innerHTML.toLowerCase() === '-')
                    ? 0 : x.innerHTML.toLowerCase()
                : parseFloat(x.innerHTML);
            var yContent = (isNaN(y.innerHTML))
                ? (y.innerHTML.toLowerCase() === '-')
                    ? 0 : y.innerHTML.toLowerCase()
                : parseFloat(y.innerHTML);
            if (dir == "asc") {
                if (xContent > yContent) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (xContent < yContent) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
