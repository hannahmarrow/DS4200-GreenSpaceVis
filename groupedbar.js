var barwidth = 50;
var barOffset = 5;

//Generate SVG
var width = 1100,
  height = 400;
var margin = {
  top: 40,
  bottom: 30,
  left: 100,
  right: 30
};

  var svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', '#ebebeb');


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
    .attr("transform", `translate(0,${height-margin.bottom})`)
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
    .attr("class",'pedbar')
    .attr("x", function(d) {
      return xScale(d.Things_Added_to_the_Park);
    })
    .attr("y", function(d) {
      return yScale(d.in_person_pedestrian);
    })
    .attr("width", xScale.bandwidth()/4)
    .attr('fill', '#81A4CD')
    .attr("height", function(d) {
      return height - margin.bottom - yScale(d.in_person_pedestrian);
    })
    var bar2 = svg.selectAll('.orbar')
      .data(data)
      .enter()
      .append('rect')
      .attr("class",'orbar')
      .attr("x", function(d) {
        return xScale(d.Things_Added_to_the_Park)+xScale.bandwidth()/4;
      })
      .attr("y", function(d) {
        return yScale(d.online_resident);
      })
      .attr("width", xScale.bandwidth()/4)
      .attr('fill', '#ba1313')
      .attr("height", function(d) {
        return height - margin.bottom - yScale(d.online_resident);
      })
      var bar3 = svg.selectAll('.iprbar')
        .data(data)
        .enter()
        .append('rect')
        .attr("class",'iprbar')
        .attr("x", function(d) {
          return xScale(d.Things_Added_to_the_Park)+ 2* (xScale.bandwidth()/4);
        })
        .attr("y", function(d) {
          return yScale(d.in_person_resident);
        })
        .attr("width", xScale.bandwidth()/4)
        .attr('fill', '#054A91')
        .attr("height", function(d) {
          return height - margin.bottom - yScale(d.in_person_resident);
        })

    // //Interaction for later
    // .on("mouseover", function(d) {
    //   d3.select(this)
    //     .transition()
    //     .delay(200)
    //     .duration(1000)
    //     .style("fill", "pink")
    // })

    // .on("mouseout", function(d) {
    //   d3.select(this)
    //     .transition()
    //     .style("fill", "green")
    // })

      // Handmade legend
      svg.append("rect").attr("x",800).attr("y",60).attr("width", 15).attr("height", 15).style("fill", "#81A4CD")
      svg.append("rect").attr("x",800).attr("y",90).attr("width", 15).attr("height", 15).style("fill", "#ba1313")
      svg.append("rect").attr("x",800).attr("y",120).attr("width", 15).attr("height", 15).style("fill", "#054A91")
      svg.append("text").attr("x", 820).attr("y", 70).text("In-Person Pedestrian").style("font-size", "15px").attr("alignment-baseline","middle")
      svg.append("text").attr("x", 820).attr("y", 100).text("Online Resident").style("font-size", "15px").attr("alignment-baseline","middle")
      svg.append("text").attr("x", 820).attr("y", 130).text("In-Person Resident").style("font-size", "15px").attr("alignment-baseline","middle")

  ;


var svg2 = d3.select('#svg');


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
var yAxis = svg2.append('g')
 .attr("transform", `translate(${margin.left},0)`)
 .call(d3.axisLeft().scale(yScale))
 //Add label
 .append("text")
 .attr("y", 30)
 .attr("x", 20)
 .style("stroke", 'black')
 .text("Number of Responses");

var xAxis = svg2.append('g')
 .attr("transform", `translate(0,${height-margin.bottom})`)
 .call(d3.axisBottom().scale(xScale))
 //Add label
 .append("text")
 .attr("x", width - 70)
 .attr("y", +20)
 .style("stroke", 'black')
 .text("Things Added\nto Park");

//Draw bars
var bar = svg2.selectAll('.pedbar')
 .data(data)
 .enter()
 .append('rect')
 .attr("class",'pedbar')
 .attr("x", function(d) {
   return xScale(d.Things_Added_to_the_Park);
 })
 .attr("y", function(d) {
   return yScale(d.total_responses);
 })
 .attr("width", xScale.bandwidth()/4)
 .attr('fill', '#81A4CD')
 .attr("height", function(d) {
   return height - margin.bottom - yScale(d.total_responses);
 })
<<<<<<< HEAD
=======
 var bar2 = svg2.selectAll('.orbar')
   .data(data)
   .enter()
   .append('rect')
   .attr("class",'orbar')
   .attr("x", function(d) {
     return xScale(d.Things_Added_to_the_Park)+xScale.bandwidth()/4;
   })
   .attr("y", function(d) {
     return yScale(d.online_resident);
   })
   .attr("width", xScale.bandwidth()/4)
   .attr('fill', '#ba1313')
   .attr("height", function(d) {
     return height - margin.bottom - yScale(d.online_resident);
   })
   var bar3 = svg2.selectAll('.iprbar')
     .data(data)
     .enter()
     .append('rect')
     .attr("class",'iprbar')
     .attr("x", function(d) {
       return xScale(d.Things_Added_to_the_Park)+ 2* (xScale.bandwidth()/4);
     })
     .attr("y", function(d) {
       return yScale(d.total_responses);
     })
     .attr("width", xScale.bandwidth()/4)
     .attr('fill', '#054A91')
     .attr("height", function(d) {
       return height - margin.bottom - yScale(d.total_responses);
     })

>>>>>>> d9eedfbfdfd196de1d50648c5bc8cfe2deb3c131
 // //Interaction for later
 // .on("mouseover", function(d) {
 //   d3.select(this)
 //     .transition()
 //     .delay(200)
 //     .duration(1000)
 //     .style("fill", "pink")
 // })

 // .on("mouseout", function(d) {
 //   d3.select(this)
 //     .transition()
 //     .style("fill", "green")
 // })

   // Handmade legend
   svg2.append("rect").attr("x",800).attr("y",60).attr("width", 15).attr("height", 15).style("fill", "#81A4CD")
   svg2.append("text").attr("x", 820).attr("y", 70).text("Total Responses").style("font-size", "15px").attr("alignment-baseline","middle")

;





});
