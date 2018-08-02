Highcharts.chart('spider-container', {

    chart: {
        polar: true,
        type: 'line'
    },

    title: {
        text: 'Images with More than One Feature',
        x: -80
    },

    pane: {
        size: '80%'
    },

    xAxis: {
        categories: ["Black X", "Text", "Girl", "Head Wear", "Poster", "Fun"],
        tickmarkPlacement: 'on',
        lineWidth: 0
    },

    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
    },

    tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
    },

    legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 70,
        layout: 'vertical'
    },

    series: [{
        name: 'x',
        data: [43000, 19000, 60000, 35000, 17000, 10000],
        pointPlacement: 'on'
    }, {
        name: 'x',
        data: [50000, 39000, 42000, 31000, 26000, 14000],
        pointPlacement: 'on'
    }]

});

//create an average of CTR for every combination pair
// Highcharts.setOptions(Highcharts.theme);