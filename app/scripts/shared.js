const chk = document.getElementById('chk');

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