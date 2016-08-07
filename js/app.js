// google maps api: AIzaSyDeEhJNVidPVfBn1WRHALIczTr2fEQpytQ
// gMap contains the google maps related functions
// It is a global variable, but needs to be since gMap.init is callback for the google maps api 
var gMap = {
    map: null, 
    mapElement: $('#map-area')[0],
    mapOptions: {
        zoom: 5,
        center: {
            lat: 39.09024,
            lng: -112.712891
        }
    },
    init: function () {
        //initialize map
        gMap.map = new google.maps.Map(this.mapElement, this.mapOptions);
    },
    /*Add Maker to maps*/
    //put addTag here since it is more map related than data related
    addTag: function (lat, lng, name) {
        var latLng = new google.maps.LatLng(lat, lng);
        var marker = new google.maps.Marker({
            position: latLng,
            title: name
        });
        marker.setMap(this.map);
    }
};

var usgs = {
    url: 'http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=ca&parameterCd=00060&siteType=ST&siteStatus=active&altMin=130',
    riverLocations: [],
    getData: function () {
        var that = this;
        return $.getJSON(this.url, function (data, status, xhr) {
            that.convertData(data.value.timeSeries);
        });
    },
    convertData: function (data) {
        for (var i = 0; i < data.length; i++) {
            usgs.riverLocations.push({
                name: data[i].sourceInfo.siteName,
                lat: data[i].sourceInfo.geoLocation.geogLocation.latitude,
                lng: data[i].sourceInfo.geoLocation.geogLocation.longitude,
                flow: data[i].values[0].value[0].value
            });
        }
    }
};

// document.ready should run only after google maps loads and runs the init
$(function () {
    // on document.ready we call usgs.getDataajax call
    // when it returns, then update the map with the data
    var promise = usgs.getData();
    promise.done(function () {
        usgs.riverLocations.forEach(function (obj) {
            gMap.addTag(obj.lat, obj.lng, obj.name);
        });
    });
});
