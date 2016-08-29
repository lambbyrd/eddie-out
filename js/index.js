/*Compiled Javascript/output to screen*/

var gCharts = require('./gcharts');
var usgs = require('./usgs');
var gMap = require('./gmaps');
var index = null;
$(function() {
	/*when x is clicked on lightbox it closes and clears data*/

    $('#close').on('click', function() {
        $('.chart').html("");
        $('.gauge').html("");
        $('.lightbox').removeClass('showLightbox');
        index = null;
    });

  
    var promise = usgs.getData();

    promise.done(function() {
        gCharts.init();

        for (var i = 0; i < usgs.filteredLocations.length; i++) {

            gMap.addRiverTag(usgs.filteredLocations[i].lat, usgs.filteredLocations[i].lng, usgs.filteredLocations[i].name, usgs.filteredLocations[i].flow);

        }

    });
});
