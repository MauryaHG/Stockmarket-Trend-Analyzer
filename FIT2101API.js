// set endpoint and your access key
endpoint = 'latest'
access_key = '3531bf16f3f05e22e1c8c5c584163dfd';

// get the most recent exchange rates via the "latest" endpoint:
$.ajax({
    url: 'https://api.exchangeratesapi.io/v1/' + endpoint + '?access_key=' + access_key,
    dataType: 'jsonp',
    success: function(json) {

        // exchange rata data is stored in json.rates
        alert(json.rates.USD);

        // base currency is stored in json.base
        alert(json.base);

        // timestamp can be accessed in json.timestamp
        alert(json.timestamp);

    }
});