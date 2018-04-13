var	headingWatchID = null;
var accelerationWatchID = null;
var boardCanvas = null;
var canvasWidth = 200;
var canvasHeight = 200;

function ellipse(context, cx, cy, rx, ry){
	context.save(); // save state
	context.beginPath();

	context.translate(cx-rx, cy-ry);
	context.scale(rx, ry);
	context.arc(1, 1, 1, 0, 2 * Math.PI, false);

	context.restore(); // restore to original state
	context.stroke();
}

var app = {
	// Called when device is ready
    onDeviceReady: function() {
        console.log('Initializing');
        
		app.initialize();
    },

    initialize: function() {

		var motionBoard = $('#motionBoard');
		
		boardCanvas = document.createElement("canvas");
		boardCanvas.id = "board";
		boardCanvas.width = canvasWidth; 
		boardCanvas.height = canvasHeight;	
		motionBoard.append(boardCanvas);
		
		// Kutsu välja kõigi sensorite järgnemine
		this.startHeadingWatch();
		this.startAccelerationWatch();
		this.getLocation();
		
    },

	
	startHeadingWatch: function() {
        console.log('Alustame suuna jälgimist');
        
		// Värskendame kompassi näidikut iga 0.5 sekundi järel
        var options = { frequency: 500 };

        try {
            headingWatchID = navigator.compass.watchHeading(this.onCompassSuccess, this.onCompassError, options);
		} catch (e) {
			console.log("Viga suuna jälgimisega : " + e);
            $('#compass-error').html("Error: " + e);
        }
	},
		
	onCompassSuccess: function(heading) {
		var magneticHeading = heading.magneticHeading;
		
		var html = '<p><span class="caption-header">Suund:</span> ' + magneticHeading + '</p>';
		
		$('#compass-heading').html(html);
		
		var rotation = 360 - Math.round(magneticHeading);
        var rotateDeg = 'translateX(-100px) rotate(' + rotation + 'deg)';

		$('#compass-needle').css('-webkit-transform', rotateDeg);
	},
	
	onCompassError: function(compassError) {
		console.log("Suuna jälgimise viga: " + compassError.code);
	},
	
	stopHeadingWatch: function() {
        console.log('Seiskame suuna jälgimise');
        
		if (headingWatchID) {
			navigator.compass.clearWatch(headingWatchID);
			headingWatchID = null;
		}
	},
	

    
    
	startAccelerationWatch: function() {
        console.log('Alustame kiirenduse jälgimist');
        
		var options = { frequency: 100 };
		
        try {
            accelerationWatchID = navigator.accelerometer.watchAcceleration(this.onAccelerometerSuccess, this.onAccelerometerError, options);
		} catch (e) {
			console.log("Viga kiirenduse jälgimisel: " + e);
            $('#accelerator-error').html("Error: " + e);
        }
	},
	
	onAccelerometerSuccess: function(acceleration) {
	
		var html = '<p><span class="caption-header">X kiirendus:</span> ' + acceleration.x + '<br>' + 
			'<span class="caption-header">Y kiirendus:</span> ' + acceleration.y + '<br>' + 
			'<span class="caption-header">Z kiirendus:</span> ' + acceleration.z + '<br>' + 
			//'<span class="caption-header">Ajatempel:</span> ' + acceleration.timestamp + 
			'</p>';
		
		$('#motion-info').html(html);
		
		if (boardCanvas) {
			var ctx = boardCanvas.getContext("2d");
			ctx.fillStyle = "#ff55ff";

			ctx.clearRect(0, 0, canvasWidth, canvasHeight); 

			ctx.strokeStyle="#0000FF";
			
			// Joonistame kesmise ringi, mis on alati keset ala
			ellipse(ctx, (canvasWidth / 2), (canvasHeight / 2), 25, 25);
			ctx.beginPath();
			ctx.moveTo((canvasWidth / 2),(canvasHeight / 2) - 15);
			ctx.lineTo((canvasWidth / 2),(canvasHeight / 2) + 15);
			ctx.moveTo((canvasWidth / 2) - 15,(canvasHeight / 2));
			ctx.lineTo((canvasWidth / 2) + 15,(canvasHeight / 2));
			ctx.stroke();
			
			// Normaliseerime tulemused, mis tüüpiliselt on -10..10 vahemikus, uude -(canvasWidth/2)..(canvasWidth/2)
			var xpos = (canvasWidth / 2) - (acceleration.x * ((canvasWidth / 2) / 10)); 
			var ypos = (canvasHeight / 2) + (acceleration.y * ((canvasHeight / 2) / 10)); 

			ctx.strokeStyle="#FF0000";
			ellipse(ctx, xpos, ypos, 10, 10);			
		}
	},
	
	onAccelerometerError: function(accelerometerError) {
		console.log("Kiirendusmõõdiku viga: " + accelerometerError.code);		
	},
	
    stopAccelerationWatch: function() {
        console.log('Lõpeta kiirenduse jälgimine');

        if (accelerationWatchID) {
			navigator.accelerometer.clearWatch(accelerationWatchID);
			accelerationWatchID = null;
		}		
	},
	

    
    
    	
	getLocation: function() {
		if ("geolocation" in navigator) {
			console.log("Püüame kasutaja asukoha teada saada");
			var that = this;
			
			try {
				navigator.geolocation.getCurrentPosition(function(position) {
					var lat = position.coords.latitude;
					var lon = position.coords.longitude;			

					console.log(position.coords);

					// Kuvame Laius- ja pikkuskraadid
					var html = '<p><span class="caption-header">Latitude:</span> ' + lat + 
							' <br><span class="caption-header">Longitude:</span> ' + lon + '</p>';

					$('#location').html(html);
	/*
					// Kasutame tagurpidi geo-lokatsiooni tegeliku aadressi saamiseks
					$.ajax({
						url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon,
						datatype: 'jsonp',
						success: function(response) {
							var html = '<p><span class="caption-header">Aadress:</span> ' + response.results[0].formatted_address + '</p>';

							$('#address').html(html);					
						}
					});
	*/
				});
			}
			catch (e) {
				console.log("Viga asukoha tuvastamisel " + e);
				$('#map-error').html("Viga asukoha tuvastamisel: " + e);
			}		
		} else {
			console.log("Geolokatsioon pole toetatud");
		}
	}
};
 
$(document).ready(function() {
    document.addEventListener('deviceready', app.onDeviceReady, false);
});
