window.onload = function () { getTableOne(), getTableTwo(), getTableWatchlist() };

function sortDataByPercentageChange(data) {
    let sortedData;
    sortedData = data.sort(function (a, b) {
        return b.percentageChange - a.percentageChange;
    })
    return sortedData;
}



function getTableOne() {


    let date = new Date();
    date.setDate(date.getDate() - 1);
    let start_date_string = date.toISOString().split('T')[0];
    let end_date_string = new Date().toISOString().split('T')[0];
    let listHTML = "";

    var requestURL = 'https://api.exchangerate.host/fluctuation?start_date=' + start_date_string + '&end_date=' + end_date_string + '&base=USD'
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {

        var response = request.response;
        var tableRef = document.getElementById('currencyTableOne');
        tableRef.innerHTML = listHTML;


        let list = []

        for (var prop in response.rates) {
            if (prop != 'USD') {
                currency = response.rates[prop]
                let currencyName = prop;
                let change = currency.change;
                if (change < 0) {
                    color = "red"
                } else {
                    color = "green"
                }
                list.push({ currency: currencyName, percentageChange: change, changeColor: color })
            };
        };

        sortDataByPercentageChange(list);


        j = 0;
        while (j < 5) {
            change = list[j].percentageChange;
            if (change < 1000) {
                currency = list[j].currency;
                color = list[j].changeColor;
                let date = start_date_string + " to " + end_date_string;
                listHTML += "<tr> <td class=\"full-width mdl-data-table__cell--non-numeric\">" + currency + "</td>"
                    + "<td class=\"full-width mdl-data-table__cell\"><font color=" + color + ">" + change + "</font></td>"
                    + "<td class=\"full-width mdl-data-table__cell--non-numeric\">" + date + "</td> </tr>";
                j++;
            }
        }

        tableRef.innerHTML += listHTML;
    }
}

function getTableTwo() {


    let date = new Date();
    date.setDate(date.getDate() - 1);
    let start_date_string = date.toISOString().split('T')[0];
    let end_date_string = new Date().toISOString().split('T')[0];
    let listHTML = "";

    var requestURL = 'https://api.exchangerate.host/fluctuation?start_date=' + start_date_string + '&end_date=' + end_date_string + '&base=USD'
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {

        var response = request.response;
        var tableRef = document.getElementById('currencyTableTwo');
        tableRef.innerHTML = listHTML;


        let list = []

        for (var prop in response.rates) {
            if (prop != 'USD') {
                currency = response.rates[prop]
                let currencyName = prop;
                let change = currency.change;
                if (change < 0) {
                    color = "red"
                } else {
                    color = "green"
                }
                list.push({ currency: currencyName, percentageChange: change, changeColor: color })
            };
        };

        sortDataByPercentageChange(list);


        list = list.reverse()
        i = 0;
        while (i < 5) {
            change = list[i].percentageChange;
            if (change < 1000) {
                currency = list[i].currency;
                color = list[i].changeColor;
                let date = start_date_string + " to " + end_date_string;
                listHTML += "<tr> <td class=\"full-width mdl-data-table__cell--non-numeric\">" + currency + "</td>"
                    + "<td class=\"full-width mdl-data-table__cell\"><font color=" + color + ">" + change + "</font></td>"
                    + "<td class=\"full-width mdl-data-table__cell--non-numeric\">" + date + "</td> </tr>";
                i++;
            }
        }

        tableRef.innerHTML += listHTML;
    }
}

function getTableWatchlist() {

    var tableRef = document.getElementById('watchlist');
    var curr = JSON.parse(sessionStorage.getItem("key"));

    let date = new Date();
    date.setDate(date.getDate() - 1);
    let start_date_string = date.toISOString().split('T')[0];
    let end_date_string = new Date().toISOString().split('T')[0];
    let listHTML = "";
    var curr_set = curr.join(',')
    var requestURL = 'https://api.exchangerate.host/fluctuation?start_date=' + start_date_string + '&end_date=' + end_date_string + '&base=USD&symbols='+ curr_set;
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        
        var response = request.response;
        for (var prop in response.rates) {
            if (prop != 'USD') {
                currency = response.rates[prop]
                if (prop != 'BTC') {
                    let currencyName = prop;
                    let startRate = currency.start_rate;
                    let endRate = currency.end_rate;
                    let change = currency.change;
                    if (change < 0) {
                        color = "red"
                    } else {
                        color = "green"
                    }

                    let date = start_date_string + " to " + end_date_string;
                    listHTML += "<tr> <td class=\"full-width mdl-data-table__cell--non-numeric\">" + currencyName + "</td>"
                        + "<td class=\"full-width mdl-data-table__cell\"><font color=" + color + ">" + change + "</font></td>"
                        + "<td class=\"full-width mdl-data-table__cell--non-numeric\">" + date + "</td> </tr>";
                }

            };
        };
        tableRef.innerHTML += listHTML;
    }
}