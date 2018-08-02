//SET UP
var feature_category = ["Black X", "Text", "Girl", "Head Wear", "Poster", "Fun"];
var ticks = [1, 2, 3, 4, 5, 6];
var w = 500;
var h = 400;
var padding = 50;
var color = d3.scale.category20c();
var circleSizeR = 4;

//SCALE FUNCTIONS (maps value to a visual display)
var xScale = d3.scale.linear()
    .domain([0, d3.max(plot_data, function(d) {
        return d[1];
    })])
    //.domain([0, 7])
    .range([padding, w - padding * 2]);

var yScale = d3.scale.linear()
    .domain([0, d3.max(plot_data, function(d) {
        return d[2];
    })])
    .range([h - padding, padding]);

//DEFINE X-AXIS
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .tickValues(ticks)
    .tickFormat(function(d, i) {
        return feature_category[i]
    });

//DEFINE Y-AXIS
var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(10);

//SET UP TOOLTOP
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


//CREATE SVG ELEMENT
var svg = d3.select("#chart")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

//CREATES DOT POINTS, TOOLTIP, LINKS BTWN POINTS
svg.selectAll("circle")
    .data(plot_data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", function(d) {
        return xScale(d[1]);
    })
    .attr("cy", function(d) {
        return yScale(d[2]);
    })
    .attr("r", function(d) {
        return circleSizeR; //SIZE OF CIRCLE
    })
    .style("opacity", .9)
    //.style("fill", function(d){ return color(d[0]); }) //colors circles based on feature
    .style("fill", '#1fc98c')
    .on("mouseover", function(d) {
        // mouse over --> links to same image
        var node_matches = findMatches(d[3], d[0]);
        var node_features = '';
        if (node_matches.length != 0) {
            for (i = 0; i < node_matches.length; i++) {
                svg.append('line').attr({
                    x1: xScale(d[1]),
                    y1: yScale(d[2]),
                    x2: xScale(node_matches[i][1]),
                    y2: yScale(node_matches[i][2])
                }).attr("class", "line");
                if (node_features == 0) node_features += ', ';
                node_features += node_matches[i][0];
                if (i != node_matches.length - 1) node_features += ', ';
            }
        }
        //TOOLTIP
        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html("<p>Features: " + d[0] + node_features +
                "<br/>Click Through Rate: " + d[2] +
                " <br/>Name: " + d[3] + "</p>")
            .style("left", (d3.event.pageX + 5) + "px")
            .style("top", (d3.event.pageY + 5) + "px");

        //DISPLAYS CORRESPONDING IMAGE
        document.getElementById('plot_image').src = "../static/images/" + d[3] + ".png";
    })
    .on("mouseout", function(d) {
        tooltip.transition()
            .duration(700)
            .style("opacity", 0);

        d3.selectAll("line")
            .transition()
            .duration(7).style("opacity", 0);
    });

//FINDS IMAGES W/MULTIPLE FEATURES
function findMatches(img_name, feature) {
    var matches = [];
    for (i = 0; i < plot_data.length; i++) {
        if (img_name == plot_data[i][3] && feature != plot_data[i][0]) {
            matches.push(plot_data[i]);
        }
    }
    return matches;
}

//CREATE X-AXIS
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

//CREATE Y-AXIS
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

//AXIS LABELS
svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + (padding / 2) + "," + (h / 2) + ")rotate(-90)")
    .attr("dy", "4em")
    .text("(Click Through Rate)");

svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "translate(" + (w / 2) + "," + (h - (padding / 3)) + ")")
    .text("(Image Features)");