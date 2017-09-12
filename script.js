
$(document).ready(function() {
  
  getCity();
  
});


function getCity() {
	
  var city = "";
  
  $.ajax({
    url: "http://ip-api.com/json",
    dataType: "json",
    success: function(response) {
      city = response.city.toString();
	  
	  getWeather(city);
    }
  }); 

};

function getWeather(cityIn) {
  
  var source ="http://api.openweathermap.org/data/2.5/weather?";
  var city = cityIn;
  var units = "units=metric";
  var apiKey = "appid=f53fa3879c1516bb66c318b85f4c883b";
  var url = source + "q=" +  city + "&" + units + "&" + apiKey;
  
  var keyword = "";
  
 $.ajax({

    url: url,
    dataType: "json",
    success: function(response) {
    
      var $wea = $("#weather");
      var keyword = response.weather[0].main.toString(); 
	  
      $("#location").append(response.name + ", " + response.sys.country);
      $("#temperature").append(Math.round(response.main.temp) + " <span id='system'>°C</span>");
      $("#description").append(response.weather[0].main);

		getImage(keyword)
	  }
  });
 };

function getImage(keyword) {

	$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
        {
            tags: keyword,
            tagmode: "any",
            format: "json"
        },
        function(data) {
            var rnd = Math.floor(Math.random() * data.items.length);

            var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");

            $('body').css('background-image', "url('" + image_src + "')" );

        });
		
		/*
		var url = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
		
		
		$.ajax({
			
			url: url,
			//dataType: "json",
			tags: keyword, 
			tagmode: "any", 
			success: function(response) {
				
			var rnd = Math.floor(Math.random() * response.items.length);

            var image_src = response.items[rnd]['media']['m'].replace("_m", "_b");

            $('body').css('background-image', "url('" + image_src + "')" );
			}
			
			
		});*/
};

function celsiusToFahrenheit() {
		
		
	var tempr = $("#temperature").text();
	var temp = tempr.slice(0,3);
	var newTemp = 0;
	
	if (tempr.includes("C"))
	{
		newTemp = Math.round(temp * 1.8 + 32);
	}
	else
	{
		newTemp = Math.round((temp - 32) / 1.8);
	}
	
	
	$("#temperature").text(function(){return newTemp;});
	
	if (tempr.includes("C"))
	{
		$("#temperature").append("<span id='system'> °F</span>");
	}
	else
	{
		$("#temperature").append("<span id='system'> °C</span>");
	}
	
	
	//$("#temperature").append("<span id='system'> °F</span>");
	
};