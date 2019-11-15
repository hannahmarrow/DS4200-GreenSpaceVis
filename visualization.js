var barwidth = 50;
var barOffset = 5;

//Generate SVG
var width = 1100,
  height = 1000;
var margin = {
  top: 40,
  bottom: 30,
  left: 100,
  right: 30
};
//
// var svg2 = d3.select('#svg')
//   .attr('width', width + 200)
//   .attr('height', height);
//
var svg = d3.select('body')
  .append('svg')
  .attr('width', width + 200)
  .attr('height', height)
  .style('background', 'white');
// Define the div for the tooltip
var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

//Define data
d3.csv("/data/Q1/clean_greenspace.csv").then(function(data) {
  //console.log(data)

  // Define Scales
  var yScale = d3.scaleLinear()
    .domain([0, 10])
    .range([height - margin.bottom, margin.top])

  var xScale = d3.scaleBand()
    .domain(data.map(function(d) {
      return d.Things_Added_to_the_Park;
    }))
    .range([margin.left, width - margin.right])
    .padding(0.5);

  //Draw Axes
  var yAxis = svg.append('g')
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft().scale(yScale))
    //Add label
    .append("text")
    .attr("y", 30)
    .attr("x", 20)
    .style("stroke", 'black')
    .text("Number of Responses");

  var xAxis = svg.append('g')
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom().scale(xScale))
    //Add label
    .append("text")
    .attr("x", width - 70)
    .attr("y", +20)
    .style("stroke", 'black')
    .text("Things Added\nto Park");

  //Draw bars
  var bar = svg.selectAll('.pedbar')
    .data(data)
    .enter()
    .append('rect')
    .attr("class", 'pedbar')
    .attr("x", function(d) {
      return xScale(d.Things_Added_to_the_Park);
    })
    .attr("y", function(d) {
      return yScale(d.in_person_pedestrian);
    })
    .attr("width", xScale.bandwidth() / 4)
    .attr('fill', '#81A4CD')
    .attr("height", function(d) {
      return height - margin.bottom - yScale(d.in_person_pedestrian);
    })
    .on("mouseover", function(d) {
      div.transition()
        .duration(200)
        .style("opacity", .9);
      div.html("In-Person Pedestrian:" + "<br/>" + d.in_person_pedestrian)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      // change color to pink when mouse over
      d3.select(this)
        .transition()
        .delay(100)
        .duration(100)
        .style("stroke", "yellow")
        .style("stroke-width", "5");

    })
    .on("mouseout", function(d) {
      div.transition()
        .duration(500)
        .style("opacity", 0);
      // on mouseout - change color back to original
      d3.select(this)
        .transition()
        .style("stroke", "#81A4CD")
        .style("stroke-width", "0");
    })
  var bar2 = svg.selectAll('.orbar')
    .data(data)
    .enter()
    .append('rect')
    .attr("class", 'orbar')
    .attr("x", function(d) {
      return xScale(d.Things_Added_to_the_Park) + xScale.bandwidth() / 4;
    })
    .attr("y", function(d) {
      return yScale(d.online_resident);
    })
    .attr("width", xScale.bandwidth() / 4)
    .attr('fill', '#804ba3')
    .attr("height", function(d) {
      return height - margin.bottom - yScale(d.online_resident);
    })
    .on("mouseover", function(d) {
      div.transition()
        .duration(200)
        .style("opacity", .9);
      div.html("Online Resident:" + "<br/>" + d.online_resident)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      // change color to pink when mouse over
      d3.select(this)
        .transition()
        .delay(100)
        .duration(100)
        .style("stroke", "yellow")
        .style("stroke-width", "5");
    })
    .on("mouseout", function(d) {
      div.transition()
        .duration(500)
        .style("opacity", 0);
      // on mouseout - change color back to original
      d3.select(this)
        .transition()
        .style("stroke", "#804ba3")
        .style("stroke-width", "0");
    })
  var bar3 = svg.selectAll('.iprbar')
    .data(data)
    .enter()
    .append('rect')
    .attr("class", 'iprbar')
    .attr("x", function(d) {
      return xScale(d.Things_Added_to_the_Park) + 2 * (xScale.bandwidth() / 4);
    })
    .attr("y", function(d) {
      return yScale(d.in_person_resident);
    })
    .attr("width", xScale.bandwidth() / 4)
    .attr('fill', '#054A91')
    .attr("height", function(d) {
      return height - margin.bottom - yScale(d.in_person_resident);
    })
    .on("mouseover", function(d) {
      div.transition()
        .duration(200)
        .style("opacity", .9);
      div.html("In-Person Resident:" + "<br/>" + d.in_person_resident)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      // change color to pink when mouse over
      d3.select(this)
        .transition()
        .delay(100)
        .duration(100)
        .style("stroke", "yellow")
        .style("stroke-width", "5");
    })
    .on("mouseout", function(d) {
      div.transition()
        .duration(500)
        .style("opacity", 0);
      // on mouseout - change color back to original
      d3.select(this)
        .transition()
        .style("stroke", "#054A91")
        .style("stroke-width", "0");
    })


  var rectX = 1000;
  var rectTextX = 1030;
  var rectY = 60;
  var rectTextY = 70;
  // Handmade legend
  svg.append("text").attr("x", rectTextX).attr("y", rectTextY - 30).text("Legend: ").style("font-size", "15px").attr("alignment-baseline", "middle")
  //in person square
  svg.append("rect").attr("x", rectX).attr("y", rectY).attr("width", 15).attr("height", 15).style("fill", "#81A4CD")
  // online resident square
  svg.append("rect").attr("x", rectX).attr("y", rectY + 30).attr("width", 15).attr("height", 15).style("fill", "#804ba3")
  // in person pedestrian square
  svg.append("rect").attr("x", rectX).attr("y", rectY + 60).attr("width", 15).attr("height", 15).style("fill", "#054A91")
  // in person pedestrian text
  svg.append("text").attr("x", rectTextX).attr("y", rectTextY).text("In-Person Pedestrian").style("font-size", "15px").attr("alignment-baseline", "middle")
  // online resident text
  svg.append("text").attr("x", rectTextX).attr("y", rectTextY + 30).text("Online Resident").style("font-size", "15px").attr("alignment-baseline", "middle")
  // in person resident text
  svg.append("text").attr("x", rectTextX).attr("y", rectTextY + 60).text("In-Person Resident").style("font-size", "15px").attr("alignment-baseline", "middle");


    var svg2 = d3.select('#svg')
      .attr('width', width + 200)
      .attr('height', height);

    // Define Scales
    var yScale2 = d3.scaleLinear()
      .domain([0, 20])
      .range([height - margin.bottom, margin.top])

    var xScale = d3.scaleBand()
      .domain(data.map(function(d) {
        return d.Things_Added_to_the_Park;
      }))
      .range([margin.left, width - margin.right])
      .padding(0.5);

    //Draw Axes
    var yAxis = svg2.append('g')
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft().scale(yScale2))
      //Add label
      .append("text")
      .attr("y", 30)
      .attr("x", 20)
      .style("stroke", 'black')
      .text("Number of Responses");

    var xAxis = svg2.append('g')
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom().scale(xScale))
      //Add label
      .append("text")
      .attr("x", width - 70)
      .attr("y", +20)
      .style("stroke", 'black')
      .text("Things Added to Park");

    //Draw isotypes
    var isotypes = svg2.selectAll('.total')
      .data(data)
      .enter()
    // Handmade legends
    var imageY = 30;
    var startingTextY = 40;
    var imageX = 1000;
    var textX = 1030;
    svg2.append("text").attr("x", textX).attr("y", startingTextY - 30).text("Legend: ").style("font-size", "15px").attr("alignment-baseline", "middle")
    svg2.append("image").attr("href", "/images/bench.png").attr("width", 20).attr("height", 20).attr("x", imageX).attr("y", imageY)
    svg2.append("text").attr("x", textX).attr("y", startingTextY).text("Rest Areas (benches, etc.) (1 response)").style("font-size", "15px").attr("alignment-baseline", "middle")
    svg2.append("image").attr("href", "/images/tree.png").attr("width", 20).attr("height", 20).attr("x", imageX).attr("y", imageY + 30)
    svg2.append("text").attr("x", textX).attr("y", startingTextY + 30).text("Trees/Plants (1 response)").style("font-size", "15px").attr("alignment-baseline", "middle")
    svg2.append("image").attr("href", "/images/art.png").attr("width", 20).attr("height", 20).attr("x", imageX).attr("y", imageY + 60)
    svg2.append("text").attr("x", textX).attr("y", startingTextY + 60).text("Art Installations (1 response)").style("font-size", "15px").attr("alignment-baseline", "middle")
    svg2.append("image").attr("href", "/images/play.png").attr("width", 20).attr("height", 20).attr("x", imageX).attr("y", imageY + 90)
    svg2.append("text").attr("x", textX).attr("y", startingTextY + 90).text("Play Area for Kids (1 response)").style("font-size", "15px").attr("alignment-baseline", "middle")
    svg2.append("image").attr("href", "/images/fountain.png").attr("width", 20).attr("height", 20).attr("x", imageX).attr("y", imageY + 120)
    svg2.append("text").attr("x", textX).attr("y", startingTextY + 120).text("Fountains (1 response)").style("font-size", "15px").attr("alignment-baseline", "middle")
    svg2.append("image").attr("href", "/images/other.png").attr("width", 20).attr("height", 20).attr("x", imageX).attr("y", imageY + 150)
    svg2.append("text").attr("x", textX).attr("y", startingTextY + 150).text("Other (1 response)").style("font-size", "15px").attr("alignment-baseline", "middle")

    ;


    var groups = svg2.selectAll("foo")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", (data, i) => "translate(" + (190 + i * 150) + "," + yScale2(19) + ")")
      .on("mouseover", function(data) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html("Total:" + "<br/>" + data.total_responses)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(data) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });

    var images = groups.selectAll("bar")
      .data(data => d3.range(parseInt(data.total_responses, 10)))
      .enter()
      .append("svg:image")
      .attr("width", 45)
      .attr("height", yScale2(19) / 2)
      .attr("y", function(data, i) {
        return height - (i * 48) - margin.bottom * 5.5;
      })
      .attr("xlink:href", function(data) {
        return d3.select(this.parentNode).datum().images
      })
});
