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
            prefix: "PER USD->"
          },
          data: [{
            type: "line",
            yValueFormatString: "#,###.##",
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
        trend(dps1)
	});

  function trend(data) {
    console.log(data)
    start_rate = data[0]["y"]
    end_rate = data[data.length - 1]["y"]
    console.log(start_rate)
    console.log(end_rate)
    if (end_rate/start_rate < 0.99){
      console.log(document.getElementById("trend"))
      document.getElementById("trend").innerHTML = "As we can see, accoring to the chart, eventhough there has been constant increases and decreases for this currency, it is an overall downwards trend for the whole year."
      console.log("As we can see, accoring to the chart, eventhough there has been constant increases and decreases for this currency, it is an overall downwards trend for the whole year.")
    }if (end_rate/start_rate > 1.01){
      document.getElementById("trend").innerHTML = "Overall for this currency, according to the graph, it indicates that eventhough there has been some increases and decreases, overall it is an upwards trend for this currency this whole year."
      console.log("Overall for this currency, according to the graph, it indicates that eventhough there has been some increases and decreases, overall it is an upwards trend for this currency this whole year.")
    }else {
      document.getElementById("trend").innerHTML = "Overall for this currency, according to the graph, it indicates that eventhough there has been some increases and decreases, overall it is a constant trend for this currency this whole year."
      console.log("Overall for this currency, according to the graph, it indicates that eventhough there has been some increases and decreases, overall it is a constant trend for this currency this whole year.")
    }
  }


});