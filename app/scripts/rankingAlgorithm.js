document.getElementById("getTable").onclick = function () { getTable() };

function sortDataByPercentageChange(data) {
    let sortedData;
    sortedData = data.sort(function (a, b) {
        return b.percentageChange - a.percentageChange;
    })
    return sortedData;
}



function getTable() {

    let budget = document.getElementById("budget").value;
    let date = new Date();
    date.setDate(date.getDate() - 30);
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
        var tableRef = document.getElementById('currencyTable');
        tableRef.innerHTML = listHTML;


        let list = []

        for (var prop in response.rates) {
            if (prop != 'USD') {
                currency = response.rates[prop]
                let currencyName = prop;
                let change = currency.change;
                if (change < 0){
                    color = "red"
                } else {
                    color = "green"
                }
                list.push({ currency: currencyName, percentageChange: change , changeColor : color})
            };
        };

        sortDataByPercentageChange(list);

        let budgetPercentages = [30, 18, 10, 9, 8, 7, 6, 5, 4, 3];

        for (let i = 0; i < 10; i++) {
            currency = list[i].currency;
            change = list[i].percentageChange;
            color = list[i].changeColor
            let date = start_date_string +" to " + end_date_string;
            budgetAllocated = budget * budgetPercentages[i] / 100;
            listHTML += "<tr> <td class=\"full-width mdl-data-table__cell--non-numeric\">" + currency + "</td>"
                + "<td class=\"full-width mdl-data-table__cell\"><font color=" + color + ">" + change + "</font></td>"
                + 	"<td class=\"full-width mdl-data-table__cell--non-numeric\">" + date + "</td>"
                + "<td class=\"full-width mdl-data-table__cell\">" + "$" +budgetAllocated + "</td></tr>";
        }
        tableRef.innerHTML += listHTML;
    }
}