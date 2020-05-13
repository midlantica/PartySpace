// Create the script tag, set the appropriate attributes
var script = document.createElement('script')

script.src =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyDpDwtBuouZJKeks6eZ_okqFUfxK0QyNkI&callback=initMap'
script.defer = true
script.async = true

var map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 36.174465, lng: -86.76796 },
    zoom: 8,
  })
}

// Attach your callback function to the `window` object
window.initMap = function () {
  // JS API is loaded and available
}

// Append the 'script' element to 'head'
document.head.appendChild(script)
