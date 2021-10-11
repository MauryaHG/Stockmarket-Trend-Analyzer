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
    if (budget >= 50 && budget <= 10000) {
        let date = new Date();
        date.setDate(date.getDate() - 365);
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
                    if (change < 0) {
                        color = "red"
                    } else {
                        color = "green"
                    }
                    list.push({ currency: currencyName, percentageChange: change, changeColor: color })
                };
            };

            sortDataByPercentageChange(list);

            let budgetPercentages = [30, 18, 10, 9, 8, 7, 6, 5, 4, 3];
            
            i = 0;
            j = 0;
            total = 0;
            totalOneMonth = 0;
            totalTwoMonth = 0;
            totalThreeMonth = 0;
            while (j < 10) {
                change = list[i].percentageChange;
                if (change < 1000){
                    currency = list[i].currency;
                    color = list[i].changeColor;
                    let date = start_date_string + " to " + end_date_string;
                    budgetAllocated = (budget * budgetPercentages[j] / 100).toFixed(2);
                    multiplier = 1 + (0.05 * change)/100;
                    budgetOneMonth = (budgetAllocated * multiplier).toFixed(2);
                    budgetTwoMonth = (budgetOneMonth * multiplier).toFixed(2);
                    budgetThreeMonth = (budgetTwoMonth * multiplier).toFixed(2);
                    total += parseFloat(budgetAllocated);
                    totalOneMonth += parseFloat(budgetOneMonth);
                    totalTwoMonth += parseFloat(budgetTwoMonth);
                    totalThreeMonth += parseFloat(budgetThreeMonth);
                    listHTML += "<tr> <td class=\"full-width mdl-data-table__cell--non-numeric\">" + currency + "</td>"
                    + "<td class=\"full-width mdl-data-table__cell\"><font color=" + color + ">" + change + "</font></td>"
                    /*+ "<td class=\"full-width mdl-data-table__cell--non-numeric\">" + date + "</td>"*/
                    + "<td class=\"full-width mdl-data-table__cell\">" + "$" + budgetAllocated + "</td>"
                    + "<td class=\"full-width mdl-data-table__cell\">" + "$" + budgetOneMonth + "</td>"
                    + "<td class=\"full-width mdl-data-table__cell\">" + "$" + budgetTwoMonth + "</td>"
                    + "<td class=\"full-width mdl-data-table__cell\">" + "$" + budgetThreeMonth + "</td></tr>";
                    j++;
                } 
                i++;
            }
            listHTML += "<tr> <td class=\"full-width mdl-data-table__cell\">" + "Total" + "</td>"
            + "<td class=\"full-width mdl-data-table__cell\">" + "" + "</td>"
            + "<td class=\"full-width mdl-data-table__cell\">" + "$" + total.toFixed(2) + "</td>"
            + "<td class=\"full-width mdl-data-table__cell\">" + "$" + totalOneMonth.toFixed(2) + "</td>"
            + "<td class=\"full-width mdl-data-table__cell\">" + "$" + totalTwoMonth.toFixed(2) + "</td>"
            + "<td class=\"full-width mdl-data-table__cell\">" + "$" + totalThreeMonth.toFixed(2) + "</td></tr>";

            listHTML += "<tr> <td class=\"full-width mdl-data-table__cell\">" + "Net Profit" + "</td>"
            + "<td class=\"full-width mdl-data-table__cell\">" + "" + "</td>"
            + "<td class=\"full-width mdl-data-table__cell\">" + "$" + (total - budget).toFixed(2) + "</td>"
            + "<td class=\"full-width mdl-data-table__cell\">" + "$" + (totalOneMonth - budget).toFixed(2) + "</td>"
            + "<td class=\"full-width mdl-data-table__cell\">" + "$" + (totalTwoMonth - budget).toFixed(2) + "</td>"
            + "<td class=\"full-width mdl-data-table__cell\">" + "$" + (totalThreeMonth - budget).toFixed(2) + "</td></tr>";
            
            tableRef.innerHTML += listHTML;
        }
    }
}