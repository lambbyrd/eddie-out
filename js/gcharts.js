/*Google Charts Javascript*/

var gCharts = {

    init: function() {
        //console.log('gcharts is firing');
        google.charts.load('current', { 'packages': ['corechart', 'gauge'] });

    },

    /*Draws the area chart*/

    doDrawAreaChart: function(site) {
        console.log(site);
        google.charts.setOnLoadCallback(drawAreaChart(site));

        function drawAreaChart(site) {

            var data = google.visualization.arrayToDataTable([
                ['Date', 'Flow'],
                [site.flow[0][0], site.flow[0][1]],
                [site.flow[1][0], site.flow[1][1]],
                [site.flow[2][0], site.flow[2][1]]
            ]);

            var options = {
                title: site.name,
                backgroundColor: '#EAEAEA',
                hAxis: { title: 'Date', titleTextStyle: { color: '#333' } },
                vAxis: { minValue: 0 }
            };

            var chart = new google.visualization.AreaChart($('.chart')[0]);
            chart.draw(data, options);
        }
    },

    /*Draws the Gauge*/

    doDrawGauge: function(site) {
        google.charts.setOnLoadCallback(drawGauge(site));

        function drawGauge(site) {

            var data = google.visualization.arrayToDataTable([
                ['Label', 'Value'],
                ['River CFS', site.flow[0][1]]
            ]);

            var options = {
                width: '100%',
                height: '100%',
                redFrom: 900,
                redTo: 1000,
                yellowFrom: 700,
                yellowTo: 900,
                minorTicks: 10
            };

            var chart = new google.visualization.Gauge($('.gauge')[0]);

            chart.draw(data, options);

        }
    }
}

module.exports = gCharts;
