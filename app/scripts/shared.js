const chk = document.getElementById('chk');
var watchlistHTML = JSON.parse(sessionStorage.getItem("key"));
if (watchlistHTML == null){
	watchlistHTML = [];
}

chk.addEventListener('change', () => {
	document.body.classList.toggle('dark');
	theme = stockChartone.get("theme")
	if (theme == "light2"){
		stockChartone.set("theme", "dark2");
	} else{
		stockChartone.set("theme", "light2");
	}
	stockChartone.render();
	
	theme = stockCharttwo.get("theme")
	if (theme == "light2"){
		stockCharttwo.set("theme", "dark2");
	} else{
		stockCharttwo.set("theme", "light2");
	}
	stockCharttwo.render();
});