const chk = document.getElementById('chk');
var watchlistHTML = JSON.parse(sessionStorage.getItem("key"));
if (watchlistHTML == null){
	watchlistHTML = [];
}

chk.addEventListener('change', () => {
	document.body.classList.toggle('dark');
	theme = stockChart.get("theme")
	if (theme == "light2"){
		stockChart.set("theme", "dark2");
	} else{
		stockChart.set("theme", "light2");
	}
	stockChart.render();
});