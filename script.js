// set margin, width & height
var margin = {top: 100, right: 100, bottom: 100, left: 100},
    width = 1000 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

// select id
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// load data & set function 
d3.csv("promedios.csv", function(data) {

    // X axis
    var x = d3.scaleLinear()
        .domain([0, 3])
        .range([0, width]);
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        /*.selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");*/

    // Y axis
    var y = d3.scaleBand()
        .domain(data.map(function(d) { return d.Equipo; }))
        .range([0, height])
        .padding(.5);
        svg.append("g")
        .call(d3.axisLeft(y))

    // bars
    svg.selectAll("myRect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", x(0) )
        .attr("y", function(d) { return y(d.Equipo); })
        .attr("width", function(d) { return x(d.Prom); })
        .attr("height", y.bandwidth())
        .attr("fill", "gray20")

    // define tooltip
    var tooltip = d3.select("#my_dataviz")
        .append("div")
        .style("opacity", 0)
        .style("position", "absolute")
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid #ddd")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "15px")
        
    // apply tooltip to the bars
    svg.selectAll("myRect")
        .data(data)
        .enter()
        .selectAll("rect")
        .on("mouseover", function(d) {
            tooltip.transition()
            .duration(200)
            .style('opacity', 1)
            .text("T20: " + d.T20
            + " / T21: " + d.T21
            + " / Pts: " + d.Pts
            + " / PJ: " + d.PJ
            + " / Promedio: " + d.Prom 
            )
        })
        .on("mousemove", function(d) {
            tooltip.style('left', d3.event.pageX + 'px')
            .style('top', d3.event.pageY + 'px')
        })

        .on("mouseleave", function(d) {
            tooltip.style('opacity', 0)
        })
})

