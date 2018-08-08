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
var xScale = d3.scale.ordinal()
            .domain(feature_categories)
            .rangeRoundBands([0, width], .5);

var yScale = d3.scale.linear()
            .range([height, 0]);

var canvas = d3.select("#bar_chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .tickFormat(function(d, i) {
        return feature_categories[i]
    });

canvas.append('g')
    .attr('class', 'x axis')
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

// canvas.append("g")
//     .attr("class", "x axis")
//     .attr("transform", "translate(0," + height + ")")
//     .call(xAxis)
//     .selectAll("text")
//     .style("text-anchor", "middle")
//     .attr("dx", "0em")
//     .attr("dy", ".6em");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var yAxisHandleForUpdate = canvas.append('g')
    .attr('class', 'y axis')
    .call(yAxis);

yAxisHandleForUpdate.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('(Click Through Rate)');


// canvas.append("g")
//     .attr("class", "y axis")
//     .call(yAxis)
//     .append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 6)
//     .attr("dy", ".71em")
//     .style("text-anchor", "end")
//     .text("(Avg. Click Through Rates)");

// canvas.selectAll("bar")
//     .data(avg_ctr_1)
//     .enter().append("rect")
//     .style("fill", function(d) {
//         return color(d[0]);
//     })
//     .attr("x", function(d) {
//         return x(d[0]);
//     })
//     .attr("width", x.rangeBand())
//     .attr("y", function(d) {
//         return y(d[1]);
//     })
//     .attr("height", function(d) {
//         return height - y(d[1]);
//     });

function updateBars() {
    // x.domain(avg_ctr_1.map(function(d) {
    //     return d[0];
    // }));
    // y.domain([0, d3.max(avg_ctr_1, function(d) {
    //     return d[1];
    // })]);
    data = getAvgCTRData();

    yScale.domain(d3.extent(data));
    yAxisHandleForUpdate.call(yAxis);

    var bars = canvas.selectAll('.bar').data(data);

    bars.enter()
        .append('rect')
        .attr('class', 'bar')
        .attr("x", function(d) {
            return xScale(d[0]);
        })
        .attr('width', xScale.rangeBand())
        .attr("y", function(d) {
            return yScale(d[1]);
        }).attr("height", function(d) {
            return height - y(d[1]);
        });
    
     // Update old ones, already have x / width from before
     bars
     .transition().duration(250)
     .attr("y", function(d) { return yScale(d[1]); })
     .attr("height", function(d) { return height - yScale(d[1]); });

    // Remove old ones
    bars.exit().remove();
       
};

updateBars();

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