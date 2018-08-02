Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Avg. CTR of Images with and without Feature'
    },
    xAxis: {
        categories: ["Images Feature Present", "Images Feature Absent", "Difference between Image Presence and Absence"]
    },
    yAxis: {
        title: {
            text: 'Avg. Click Through Rate'
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Black X',
        data: [0.012007244421217112, 0.009514896147551327, 0.0024923482736657846]
    }, {
        name: 'Text',
        data: [0.007705460407745379, 0.010743236700575833, -0.003037776292830454]
    }, {
        name: 'Girl',
        data: [0.008570897677661093, 0.010025179922657277, -0.0014542822449961842]
    },{
        name: 'Head Wear',
        data: [0.011164466679783318, 0.0095229173435875, 0.0016415493361958185]
    },{
        name: 'Poster',
        data: [0.00824952538958081, 0.010107272365394973, -0.0018577469758141642]
    },{
        name: 'Fun',
        data: [0.011106801560462906, 0.009395970958399183, 0.0017108306020637235]
    }]
});