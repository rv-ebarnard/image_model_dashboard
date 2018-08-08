//SET UP
var scatterPlotData = getFormattedScatterPlotData();
var ticks = findTicks(feature_categories);
var w = 500;
var h = 400;
var padding = 50;
var color = d3.scale.category20c();
var circleSizeR = 4;


//SCALE FUNCTIONS (maps value to a visual display)
var xScale = d3.scale.linear()
	.domain([0, feature_categories.length])
	.range([padding, w - padding * 2]);

var yScale = d3.scale.linear()
	.domain([0, d3.max(scatterPlotData, function (d) {
		return d[2];
	})])
	.range([h - padding, padding]);

//DEFINE X-AXIS
var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient("bottom")
	.tickValues(ticks)
	.tickFormat(function (d, i) {
		return feature_categories[i]
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

var svgEnter;
var points;
var count = 0;

//CREATES DOT POINTS, TOOLTIP, LINKS BTWN POINTS
svg.selectAll("circle")
		.data(scatterPlotData).enter()
		.append("circle")
		.attr("class", "dot")
		.attr("cx", function (d) {
			return xScale(d[1]);
		})
		.attr("cy", function (d) {
			return yScale(d[2]);
		})
		.attr("r", function (d) {
			return circleSizeR; //SIZE OF CIRCLE
		})
		.style("opacity", .9)
		//.style("fill", function(d){ return color(d[0]); }) //colors circles based on feature
		.style("fill", '#1fc98c')
		.on("mouseover", function (d) {
			// mouse over --> links to same image
			var node_matches = findMatches(d[3], d[0], scatterPlotData);
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
			
			//IMAGE CAPTION
            var img_txt = "<p>Features: " + d[0] + node_features + "<br/>Click Through Rate: " + d[2] + " <br/>Name: " + d[3] + "</p>";
			document.getElementById('plot_img_caption').innerHTML = img_txt;

			//TOOLTIP
			tooltip.transition().duration(200).style("opacity", .9);
			tooltip.html(img_txt)
				.style("left", (d3.event.pageX + 5) + "px")
				.style("top", (d3.event.pageY + 5) + "px");

			//DISPLAYS CORRESPONDING IMAGE
			document.getElementById('plot_image').src = "../static/images/" + d[3] + ".png";
		})
		.on("mouseout", function (d) {
			tooltip.transition()
				.duration(700)
				.style("opacity", 0);

			d3.selectAll("line")
				.transition()
				.duration(7).style("opacity", 0);
	});

//FINDS IMAGES W/MULTIPLE FEATURES
function findMatches(img_name, feature, nd) {
	var matches = [];
	for (i = 0; i < nd.length; i++) {
		if (img_name === nd[i][3] && feature !== nd[i][0]) {
			matches.push(nd[i]);
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

function updateScatterPlot(){
        //REMOVE OLD VALUES
        svg.selectAll("circle").data(scatterPlotData).remove();

        //GET NEW VALUES
        scatterPlotData = getFormattedScatterPlotData();

        //UPDATE YSCALE DOMAIN
        // yScale.domain([0, d3.max(scatterPlotData, function(d) { return d[2]; })]);
        
        //CREATES DOT POINTS, TOOLTIP, LINKS BTWN POINTS
        svg.selectAll("circle")
            .data(scatterPlotData)
            .attr("cx", function(d){
                return xScale(d[1]);
            })
            .attr("cy", function(d){
                return yScale(d[1]);
            });

        //ENTER
        svg.selectAll('circle')
            .data(scatterPlotData)
            .enter()
			.append("circle")
            .attr("class", "dot")
			.attr("cx", function (d) {
				return xScale(d[1]);
			})
			.attr("cy", function (d) {
				return yScale(d[2]);
			})
			.attr("r", function (d) {
				return circleSizeR; //SIZE OF CIRCLE
			})
			.style("opacity", .9)
			//.style("fill", function(d){ return color(d[0]); }) //colors circles based on feature
            .style("fill", '#1fc98c')
			.on("mouseover", function (d) {
				// mouse over --> links to same image
				var node_matches = findMatches(d[3], d[0], scatterPlotData);
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
				//IMG CAPTION
				var img_txt = "<p>Features: " + d[0] + node_features + "<br/>Click Through Rate: " + d[2] + " <br/>Name: " + d[3] + "</p>";
				document.getElementById('plot_img_caption').innerHTML = img_txt;
				//TOOLTIP
				tooltip.transition().duration(200).style("opacity", .9);
				tooltip.html(img_txt)
					.style("left", (d3.event.pageX + 5) + "px")
					.style("top", (d3.event.pageY + 5) + "px");

				//DISPLAYS CORRESPONDING IMAGE
				document.getElementById('plot_image').src = "../static/images/" + d[3] + ".png";
			})
			.on("mouseout", function (d) {
				tooltip.transition()
					.duration(700)
					.style("opacity", 0);

				d3.selectAll("line")
					.transition()
					.duration(7).style("opacity", 0);
            });
	}
