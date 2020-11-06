var APIKey = "e37a51f6c8013e760d6b87749003ce3a";
var city;
var cities = [];


$(document).on("click",".list-group-item", function(){
	city = $(this).text();
	searchForecast(city);
});


$(".search-btn").on("click", function(){
	city = $(".city-input").val();	
	searchForecast(city);
});



function searchForecast(city="Monterrey"){

url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+APIKey;
fiveDaysUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+APIKey;

	$.ajax({
		url: url,
		method: "GET"
	}).then(function(res){
		
		var temperature = res.main.temp;
		var humidity = res.main.humidity
		var windSpeed = res.wind.speed;
		var iconcode = res.weather[0].icon;
		var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
		var date = new Date(res.dt*1000); // *1000 because of date takes milliseconds
	
		//format date to (DD/MM/YYYY)
		var formatted = `(${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()})`;
		//console.log(formatted);
		$(".city").text(res.name + " " +formatted);
		$('#wicon').attr('src', iconurl);
		//var uvIndex = res.
		$(".temperature").text(`Temperature: ${temperature}°F`);
		$(".humidity").text(`Humidity: ${humidity}%`);
		$(".wind-speed").text(`Wind Speed: ${windSpeed}MPH`);
		//$(".uv-index").text(`UV Index: ${}`)


		
			var cityItem = $("<li>");
			cityItem.attr("class","list-group-item");
			cityItem.text(res.name);
			
			

		if(!cities.includes(res.name)){
			$(".list-group-flush").append(cityItem);
			cities.push(cityItem.text());	
			localStorage.setItem("cities", JSON.stringify(cities));	
		}

		
			
			
	});

	
	$.ajax({
		url: fiveDaysUrl,
		method: "GET"
	}).then(function(res){
		

		$(".cards-element").remove();
		
		for(var i=7;i<39;i=i+7){

		var cardDiv = $("<div>");
		cardDiv.attr("class","col card text-white bg-primary mb-3 mr-4 cards-element");
		$(".forecast-cards").append(cardDiv);

		var cardBody = $("<div>");
		cardBody.attr("class","card-body");
		cardDiv.append(cardBody);

		var dateDiv = $("<p>");
		var date = new Date(res.list[i].dt*1000); // *1000 because of date takes milliseconds		
		var formatted = `(${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()})`;
		
		dateDiv.attr("class","card-text");
		dateDiv.text(formatted);
		cardBody.append(dateDiv);

		//<div id="icon"><img id="wicon" src="" alt="Weather icon"></div>

		var iconDiv = $("<div>");	
		var iconImg = $("<img/>");
		var iconcode = res.list[i].weather[0].icon;
		var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
		iconImg.attr('src', iconurl);
		cardBody.append(iconDiv);
		iconDiv.append(iconImg);

		var tempDiv = $("<p>");
		tempDiv.attr("class","card-text");
		var temperature = res.list[i].main.temp;
		tempDiv.text(`Temp:${temperature}°F`);
		cardBody.append(tempDiv);

		var humDiv = $("<p>");
		humDiv.attr("class","card-text");
		var humidity = res.list[i].main.humidity;
		humDiv.text(`Humidity:${humidity}%`);
		cardBody.append(humDiv);

		//console.log(`temp:${temperature}, hum:${humidity}, date:${formatted}`);

		}
	});

}

function readFromStorage(){
	var	citiesFromStorage = JSON.parse(localStorage.getItem("cities"));
	console.log(citiesFromStorage);
	if(citiesFromStorage!==null){
		cities = citiesFromStorage;
	}	
}


function renderCities(){
	if(cities!==null){
		for(var i=0;i<cities.length;i++){
			var cityItem = $("<li>");
			cityItem.attr("class","list-group-item");
			cityItem.text(cities[i]);
			$(".list-group-flush").append(cityItem);
		}
	}
}



searchForecast();
readFromStorage();
renderCities();