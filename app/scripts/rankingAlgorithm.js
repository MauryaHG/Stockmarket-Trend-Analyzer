document.getElementById("getTable").onclick = function () { getTable() };

function sortData(data) {
    let sortedData;
    sortedData = data.sort(function (a, b) {
        return a.percentageChange - b.percentageChange;
    })
    return sortedData;
}


function getTable() {

    let start_date = new Date();
    start_date.setDate(date.getDate() - 30);
    start_date_string = start_date.toISOString().split('T')[0];
    let end_date = new Date();
    end_date_string = end_date.getDate();
    end_date_string = end_date_string.toISOString().split('T')[0];
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


        let list = []

        for (var prop in response.rates) {
            if (prop != 'USD') {
                currency = response.rates[prop]
                let currencyName = prop;
                let change = currency.change;
                list.push({ currency: currencyName, percentageChange: change })
            };
        };

        sortData(list);

        for (let i = 0; i < list.length; i++) {
            currency = list[i].currency;
            change = list[i].percentageChange;
            listHTML += "<tr> <td class=\"full-width mdl-data-table__cell--non-numeric\">" + currencyName + "</td>"
                + "<td class=\"full-width mdl-data-table__cell\"><font color=" + color + ">" + change + "</font></td>";
        }
        tableRef.innerHTML += listHTML;
    }
}