//PangSzee's - Geolocation

var lat, lon;
var apikey ='5e799cbc4834793851ed4eb3fbe95228';
var options = {
    enableHighAccuracy:true,
    timeout: 5000,
    maximumAge:0
};

navigator.geolocation.getCurrentPosition(success,error,options);

  
function success(pos){
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
    console.log("Latitude = " + lat + " " + "Longitude = " + lon);
    $('#lat').text(lat);
    $('#lon').text(lon);
    info(lat,lon);

  }
  
function error(error){
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.")
        break;
    }
  }


function info(lat, lon){

    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units=metric&appid='+apikey;
    $.ajax({
          url: queryURL,
          method: "GET",
          success: function(response){
            var result = response;
            $('#temp').text(result.main.temp)
            $('#wspd').text(result.wind.speed)
            $('#forcast').text(result.weather[0].main)   
          },
          error: function(){
            var msg = "City Not found";
            console.log(msg);
          }

})
}


//Matt's - Map marking

console.log("test");

var lat = -34.962764;

var log = 138.526134;

// function initMap() {
//     var Latlog = new google.maps.LatLng(lat, log);
//     var map = new google.maps.Map(
//         document.getElementById('map'), {zoom: 30, center: Latlog, mapTypeId: 'satellite'});
//     var marker = new google.maps.Marker({position: Latlog, map: map});
// }


function initMap() {
    var Latlog = new google.maps.LatLng(lat, log);
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 30, center: Latlog,
      mapTypeId: 'satellite'
    });


    map.addListener('click', function(e) {
        console.log("click");
        placeMarkerAndPanTo(e.latLng, map);
    });


    function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    }
};



//Andy's - Compass

var displaycompass = function(){
  
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (iOS === true){

    var createButton = document.createElement("BUTTON");  
    createButton.innerHTML = "Press here for compass";    
    createButton.setAttribute("class","bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full")   
    createButton.setAttribute("id","but")
    createButton.setAttribute("type","button")       
    document.getElementsByClassName("compassdisplay")[0].appendChild(createButton); 

    /* https://stackoverflow.com/questions/16048514/can-i-use-javascript-to-get-the-compass-heading-for-ios-and-android
stackoverflow was used to find the ollowing code to gain access to movement and orientation on ios devices*/
    var button = document.getElementById("but");
    button.addEventListener("click", function () {
    DeviceMotionEvent.requestPermission().then(response => {
      if (response == 'granted') {
        var rmbut = document.getElementById('but')
          rmbut.parentNode.removeChild(button)
         window.addEventListener('devicemotion', (e) => {
          
        })
     }
    }).catch(console.error)
    });
  }


          

          var rmtext = document.getElementById('pleasenote')
          rmtext.innerHTML="";
          


  
     if (window.DeviceOrientationEvent) {
     window.addEventListener('deviceorientation', function(eventData) {
      if(event.webkitCompassHeading) {
        compassdir = event.webkitCompassHeading;  
      }
      else compassdir = event.alpha;

      var update = document.getElementById("degree")
  update.innerHTML = '';
  var direc = 360 - compassdir 
  var arrowimg = document.getElementById('arrow');
  arrowimg.setAttribute('style','transform:rotate('+ direc +'deg)');
 

  
  
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units=metric&appid='+apikey;
    $.ajax({
          url: queryURL,
          method: "GET",
          success: function(response){
            var result = response;
            
            var windspeed = (result.wind.speed)
            var windDirection = (result.wind.deg)

            var rmtext = document.getElementById('windavailable')
          rmtext.innerHTML= windspeed+"m/s";
               var directionarrow = document.getElementById("windarrow");
  
              var winddegrees = windDirection-compassdir-90;
  directionarrow.setAttribute('style','transform:rotate('+ winddegrees +'deg)');

          },
          

})

 


    });
    

    
  }




}
displaycompass()



