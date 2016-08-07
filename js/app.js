//google maps api: AIzaSyDeEhJNVidPVfBn1WRHALIczTr2fEQpytQ

var RiverMap = {

    riverLocations: [],

    getUsgsData: function() {

        var url = 'http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=ca&parameterCd=00060&siteType=ST&siteStatus=active&altMin=130';

        $.getJSON(url, function(data, status, xhr) {

            console.log(data.value.timeSeries);
            RiverMap.convertUsgsData(data.value.timeSeries);

        });

    },

    convertUsgsData: function(data) {
        //console.log(data);
        for (var i = 0; i < data.length; i++) {
            RiverMap.riverLocations.push({ lat: data[i].sourceInfo.geoLocation.geogLocation.latitude, lng: data[i].sourceInfo.geoLocation.geogLocation.longitude });
            RiverMap.addRiverTag(RiverMap.riverLocations[i].lat, RiverMap.riverLocations[i].lng);
        }

    }
}
var map;

RiverMap.gMapInit = function() {

    var mapOptions = {
        zoom: 5,
        center: {
            lat: 39.09024,
            lng: -92.712891
        }
    };

    map = new google.maps.Map(document.getElementById('map-area'), mapOptions);
};

/*Add Maker to maps*/
RiverMap.addRiverTag = function(lat, lng) {

    var latLng = new google.maps.LatLng(
        lat, lng);

    var marker = new google.maps.Marker({
        position: latLng,
        title: 'Hopefully this works'
    });

    marker.setMap(map);
};


$(function() {
    //google maps init
    RiverMap.getUsgsData();
    //addRiverTag(RiverMap.riverLocations[0].lat,RiverMap.riverLocations[0].lng);

});
