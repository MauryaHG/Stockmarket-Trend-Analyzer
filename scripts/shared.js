var requestURL = 'https://api.exchangerate.host/fluctuation?start_date=2020-01-01&end_date=2020-01-04&base=USD';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    var response = request.response;
    var tableRef = document.getElementById('currencyTable');
    console.log(response);
    console.log(response.rates);


  let listHTML = "";
  let start_date = '2020/01/01';
  let end_date='2020/01/04';

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
