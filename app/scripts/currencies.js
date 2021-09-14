
    document.getElementById("getTable").onclick = function() {getTable()};


function getTable(){

    let start_date = document.getElementById('start').value;
    let end_date = document.getElementById('end').value;
    let listHTML = "";

    var requestURL = 'https://api.exchangerate.host/fluctuation?start_date='+start_date+'&end_date='+end_date+'&base=USD'
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {

    var response = request.response;
    var tableRef = document.getElementById('currencyTable');
    tableRef.innerHTML = listHTML;




   for (var prop in response.rates)	{
	    if (prop != 'USD') {
            currency = response.rates[prop]
            let currencyName = prop;
            let startRate = currency.start_rate;
            let endRate = currency.end_rate;
            let change = currency.change;
            if (change < 0){
                color = "red"
            } else {
                color = "green"
            }
            let date = start_date +" to " + end_date;


	listHTML += "<tr> <td class=\"full-width mdl-data-table__cell--non-numeric\">" + currencyName + "</td>"
			 + 	"<td class=\"full-width mdl-data-table__cell\">" + startRate + "</td>"
			 + 	"<td class=\"full-width mdl-data-table__cell\">" + endRate + "</td>"
			 + 	"<td class=\"full-width mdl-data-table__cell\"><font color="+ color +">" + change + "</font></td>"
			 + 	"<td class=\"full-width mdl-data-table__cell--non-numeric\">" + date + "</td></tr>";
	};
	};
	tableRef.innerHTML += listHTML;

}
}