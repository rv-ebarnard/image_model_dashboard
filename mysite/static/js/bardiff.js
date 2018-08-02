var diff_avg = [
    ['black_x', 0.0024923482736657846],
    ['text', -0.003037776292830454],
    ['girl', -0.0014542822449961842],
    ['headwear', 0.0016415493361958185],
    ['poster', -0.0018577469758141642],
    ['fun', 0.0017108306020637235]
];

var margin = {
        top: 20,
        right: 30,
        bottom: 40,
        left: 30
    },
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.ordinal()
    .rangeRoundBands([0, height], 0.5);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(0)
    .tickPadding(6);

var svg2 = d3.select("#bar_diff").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(d3.extent(diff_avg, function(d) {
    return d[1];
}));
y.domain(diff_avg.map(function(d) {
    return d[0];
}));

svg2.selectAll(".bar")
    .data(diff_avg)
    .enter().append("rect")
    .attr("class", function(d) {
        return "bar bar--" + (d[1] < 0 ? "negative" : "positive");
    })
    .attr("x", function(d) {
        return x(Math.min(0, d[1]));
    })
    .attr("y", function(d) {
        return y(d[0]);
    })
    .attr("width", function(d) {
        return Math.abs(x(d[1]) - x(0));
    })
    .attr("height", y.rangeBand());

svg2.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg2.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + x(0) + ",0)")
    .call(yAxis);