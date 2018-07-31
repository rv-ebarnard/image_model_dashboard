//Set up
var feature_category = ["Black X", "Text", "Girl", "Head Wear", "Poster", "Fun"];
var ticks = [1,2,3,4,5,6];
var w = 600;
var h = 400;
var padding = 50;
var color = d3.scale.category20c();
var circleSizeR = 4;

//Scale functions (maps value to a visual display)
var xScale = d3.scale.linear()
                    .domain([0, d3.max(plot_data, function(d) { return d[1]; })])
                    //.domain([0, 7])
                     .range([padding, w - padding * 2]);

var yScale = d3.scale.linear()
                     .domain([0, d3.max(plot_data, function(d) { return d[2]; })])
                     .range([h - padding, padding]);

//Define X axis
var xAxis = d3.svg.axis()
              .scale(xScale)
              .orient("bottom")
              .tickValues(ticks)
              .tickFormat( function(d,i) {return feature_category[i] });

//Define Y axis
var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .ticks(10);

//Set up tooltip
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// //Set up show_image
// var img_svg = d3.select("#show_image").append("svg").append("g");


//Create SVG element
var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

//Create circles and point hovering
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
           return circleSizeR;//size of circle radius
   })
   .style("opacity", .8)
   .style("fill", function(d){ return color(d[0]); }) //colors circles based on feature
   .on("mouseover", function(d){
        // mouse over --> links to same image
        var node_matches = findMatches(d[3], d[0]);
        var node_features = '';
        if(node_matches.length != 0){
            for(i = 0; i < node_matches.length; i++){
                svg.append('line').attr({
                    x1: xScale(d[1]),
                    y1: yScale(d[2]),
                    x2: xScale(node_matches[i][1]),
                    y2: yScale(node_matches[i][2])
                }).attr("class", "line");
                if( node_features == 0) node_features += ', ';
                node_features += node_matches[i][0];
                if(i != node_matches.length-1 ) node_features += ', ';
            }
        }
        //tooltip
        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html( "Features: " + d[0] + node_features +
                     "<br/>Click Through Rate: " + d[2] + 
                     " <br/>Name: <a href='{% url 'viz:images' d[3] %}'>" + d[3] + "</a>")
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");

        //display image
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


function findMatches(img_name, feature){
    var matches = [];
    for(i = 0; i < plot_data.length; i++){
        if(img_name == plot_data[i][3] && feature != plot_data[i][0]){
            matches.push(plot_data[i]);
        }
    }
    return matches;
}   

//Legend
var legend = svg.selectAll(".legend").data(color.domain())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i){ return "translate(-95," + i * 13 + ")"; });

legend.append("rect")
      .attr("x", w - 12)
      .attr("width", 12)
      .attr("height", 12)
      .style("fill", color);

legend.append("text")
      .attr("x", w - 18)
      .attr("y", 9)
      .attr("dy", ".20em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });


//Create labels
// svg.selectAll("text")
//    .data(dataset)
//    .enter()
//    .append("text")
//    .text(function(d) {
//            return d[0] + "," + d[1];
//    })
//    .attr("x", function(d) {
//            return xScale(d[0]);
//    })
//    .attr("y", function(d) {
//            return yScale(d[1]);
//    })
//    .attr("font-family", "sans-serif")
//    .attr("font-size", "11px")
//    .attr("fill", "red");


//Create X axis
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

//Create Y axis
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

//Axis Labels
svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+ (padding/2) +","+(h/2)+")rotate(-90)")
    .attr("dy", "4em")
    .text("(Click Through Rate)");

svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "translate("+ (w/2) +","+(h-(padding/3))+")")
    .text("(Image Features)");

//add lines

