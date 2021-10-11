var stockChart = 0
const old_date = new Date();
old_date.setFullYear(old_date.getFullYear()-1)
const date_str = old_date.toISOString().substring(0, 10);

window.onload = function () {
  
    var select = document.getElementById("selectCurrency");
    

    fetch("https://api.frankfurter.app/currencies")
    .then((data) => data.json())
    .then((data) => {
      display(data);
    });
  
  function display(data) {
    const entries = Object.entries(data);
    for (var i = 0; i < entries.length; i++) {
      var opt = entries[i];
      var el = document.createElement("option");
      el.textContent = opt[1] +" (" + opt[0]  +")";
      el.value = opt[0];
      select.appendChild(el);
    }
    console.log(select)
  }
  
}

document.getElementById('selectCurrency').addEventListener('change', function() {
  console.log('You selected: ', this.value);
  curr_val = this.value
  var dps1 = [], dps2= [];
    stockChart = new CanvasJS.StockChart("chartContainer",{
        theme: "light2",
        animationEnabled: true,
        title:{
          text:"StockChart with Date-Time Axis"
        },
        subtitles: [{
          text: curr_val
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
        
        for (var date in rates) {
            date_rate = rates[date]
            dps1.push({x: new Date(date), y: Number(date_rate[curr_val])});
            dps2.push({x: new Date(date), y: Number(date_rate[curr_val])});
        }
        stockChart.render();
	});
});