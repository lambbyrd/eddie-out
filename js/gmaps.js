/*Google Maps Javascript File*/
var GoogleMapsLoader = require('google-maps');
var gCharts = require('./gcharts');
var usgs = require('./usgs');

/*Google Maps Loader*/

GoogleMapsLoader.KEY = 'AIzaSyDeEhJNVidPVfBn1WRHALIczTr2fEQpytQ';
GoogleMapsLoader.load( google =>{
    
    gMap.init();

});

var index = null;
/*Google Maps*/
var gMap = {

    markers: [],

    map: null,

    mapArea: $('#map-area')[0],

    mapOptions: {
        zoom: 5,
        center: {
            lat: 39.09024,
            lng: -92.712891
        }
    },

    init: function() {

        this.map = new google.maps.Map(this.mapArea, this.mapOptions);
    },

    /*adds tags/markers to the map*/
    addRiverTag: function(lat, lng, name, flow) {
        var image = './img/raft-icon.png';

        var latLng = new google.maps.LatLng(lat, lng);

        var marker = new google.maps.Marker({
            position: latLng,
            title: name,
            icon: image
        });

        marker.setMap(this.map);
        gMap.markers.push(marker);

        /*
        Adds a listener to the markers and pops up information about the specific site
        Soon I will be removing this portion from this object.

        */
        marker.addListener('click', function() {
            var index = gMap.markers.indexOf(this);

            $('.lightbox').addClass('showLightbox');

            gCharts.doDrawAreaChart(usgs.filteredLocations[index]);
            gCharts.doDrawGauge(usgs.filteredLocations[index]);
            

        })
    },
}

module.exports = gMap;