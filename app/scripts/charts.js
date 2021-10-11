var stockChart = 0

window.onload = function () {
  
    var select = document.getElementById("selectCurrency");
    const old_date = new Date();
    old_date.setFullYear(old_date.getFullYear()-1)
    const date_str = old_date.toISOString().substring(0, 10);
    var dps1 = [], dps2= [];

    stockChart = new CanvasJS.StockChart("chartContainer",{
        theme: "light2",
        animationEnabled: true,
        title:{
          text:"StockChart with Date-Time Axis"
        },
        subtitles: [{
          text: "Australian dollar"
        }],
        charts: [{
          axisX: {
            crosshair: {
              enabled: true,
              snapToDataPoint: true
            }
          },
          axisY: {
            prefix: "$"
          },
          data: [{
            type: "line",
            yValueFormatString: "$#,###.##",
            dataPoints : dps1
          }]
        }],
        navigator: {
          data: [{
            dataPoints: dps2
          }],
          slider: {
            minimum: old_date
          }
        }
      });

    $.getJSON('https://api.frankfurter.app/'+date_str+'..?from=USD', function(data) {
        var rates = data.rates
        
        display(data)
        for (var date in rates) {
            date_rate = rates[date]
            dps1.push({x: new Date(date), y: Number(date_rate.AUD)});
            dps2.push({x: new Date(date), y: Number(date_rate.AUD)});
        }
        stockChart.render();
	});

  function display(data) {
    console.log(select)
    const entries = Object.entries(data["rates"]);
    currencies = Object.keys(entries[0][1])
    for (var i = 0; i < currencies.length; i++) {
      var opt = currencies[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }
  }
}


