//Average CTR for images that have this feature
var avg_ctr_1 = [
    ['black_x', 0.012007244421217112],
    ['text', 0.007705460407745379],
    ['girl', 0.008570897677661093],
    ['headwear', 0.011164466679783318],
    ['poster', 0.00824952538958081],
    ['fun', 0.011106801560462906]
];

//Average CTR for images that don't have this feature
var avg_ctr_0 = [
    ['black_x', 0.009514896147551327],
    ['text', 0.010743236700575833],
    ['girl', 0.010025179922657277],
    ['headwear', 0.0095229173435875],
    ['poster', 0.010107272365394973],
    ['fun', 0.009395970958399183]
];

//Impact of not having feature
var diff_avg = [
    ['black_x', 0.0024923482736657846],
    ['text', -0.003037776292830454],
    ['girl', -0.0014542822449961842],
    ['headwear', 0.0016415493361958185],
    ['poster', -0.0018577469758141642],
    ['fun', 0.0017108306020637235]
];

var feature_category = ["Black X", "Text", "Girl", "Head Wear", "Poster", "Fun"];

var color = d3.scale.category20c();

var margin = {
        top: 20,
        right: 20,
        bottom: 70,
        left: 40
    },
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

//SET X AND Y SCALE
var x = d3.scale.ordinal().rangeRoundBands([0, width], .5);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(function(d, i) {
        return feature_category[i]
    });

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svg1 = d3.select("#bar_chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


x.domain(avg_ctr_1.map(function(d) {
    return d[0];
}));
y.domain([0, d3.max(avg_ctr_1, function(d) {
    return d[1];
})]);

svg1.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "middle")
    .attr("dx", "0em")
    .attr("dy", ".6em");

svg1.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("(Avg. Click Through Rates)");

svg1.selectAll("bar")
    .data(avg_ctr_1)
    .enter().append("rect")
    .style("fill", function(d) {
        return color(d[0]);
    })
    .attr("x", function(d) {
        return x(d[0]);
    })
    .attr("width", x.rangeBand())
    .attr("y", function(d) {
        return y(d[1]);
    })
    .attr("height", function(d) {
        return height - y(d[1]);
    });

//LEGEND
var legend = svg1.selectAll(".legend").data(color.domain())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) {
        return "translate(-95," + i * 13 + ")";
    });

legend.append("rect")
    .attr("x", w + 142)
    .attr("width", 10)
    .attr("height", 10)
    .style("fill", color);

legend.append("text")
    .attr("x", w + 138)
    .attr("y", 9)
    .attr("dy", ".20em")
    .style("text-anchor", "end")
    .text(function(d) {
        return d;
    });


// d3.select("#data1")
// 	.on("click", function (d, i) {
// 		bars(avg_ctr_1);
// 	});
// d3.select("#data2")
// 	.on("click", function (d, i) {
// 		bars(avg_ctr_0);
// 	});

// function bars(data){
//     // svg.selectAll("rect").remove();

//     svg1.selectAll("bar")
// 		.data(data)
// 		.enter().append("rect")
// 		.style("fill", function (d) {
// 			return color(d[0]);
// 		})
// 		.attr("x", function (d) {
// 			return x(d[0]);
// 		})
// 		.attr("width", x.rangeBand())
// 		.attr("y", function (d) {
// 			return y(d[1]);
// 		})
// 		.attr("height", function (d) {
// 			return height - y(d[1]);
// 		});

// }