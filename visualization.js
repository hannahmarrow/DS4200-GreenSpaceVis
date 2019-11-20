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

//Color Variables
// coral
var in_person_pedestrian_color = "#FC8D62";
// green
var in_person_resident_color =  '#66C2A5';
//light blue
var online_resident_color  = "#8DA0CB" ;
// dark blue
var highlight_color = "#154B4F";

// set SVG variable with height, width, bg color
var svg = d3.select('#group')
  .append('svg')
  .attr('width', width + 200)
  .attr('height', height + 200)
  .style('background', 'white');

// Define the div for the tooltip
var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

//Define data
d3.csv("data/Q1/clean_greenspace.csv").then(function(data) {

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
    .attr("x", 50)
    .style("fill", 'black')
    .style("font-size", "15px")
    .text("Number of Responses");

  var xAxis = svg.append('g')
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom().scale(xScale))
    .style('font-size', "15px")
    //Add label
    .append("text")
    .attr("x", width - 70)
    .attr("y", 40)
    .style("fill", 'black')
    .style("font-size", "15px")
    .text("Things Added\nto Park");

  //Draw bars for the grouped bar chart
  //in person pedestrian bar (aka pedbar)
  var bar = svg.selectAll('.pedbar')
    .data(data)
    .enter()
    //add a rectangle as the bar
    .append('rect')
    //set a class for this bar for linking purposes
    .attr("class", (data, i) => "category" + i)
    //x is the category
    .attr("x", function(d) {
      return xScale(d.Things_Added_to_the_Park);
    })
    //y is the response type
    .attr("y", function(d) {
      return yScale(d.in_person_pedestrian);
    })
    .attr("width", xScale.bandwidth() / 4)
    //set the color of the bar
    .attr('fill', in_person_pedestrian_color)
    .attr("height", function(d) {
      return height - margin.bottom - yScale(d.in_person_pedestrian);
    })
    //hovering functions
    .on("mouseover", function(d) {
      //tooltip informtation
      div.transition()
        .duration(200)
        .style("opacity", .9);
      //response type info and count of responses
      div.html("In-Person Pedestrian:" + "<br/>" + d.in_person_pedestrian)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      d3.select(this)
      //change color of outline of in person pedestrian bar to highlight when mouse over
        .transition()
        .delay(100)
        .duration(100)
        .style("stroke", highlight_color)
        .style("stroke-width", "5");
      d3.selectAll(".individual_image"+i)
        .append('rect')
        .attr('class', 'image-border')
        .attr('width', 100)
        .attr('height', 100);
        //TODO also highlight the amount of pictures on the corresponding isobar

    })
    //when the cursor stops hovering, set back to normal
    .on("mouseout", function(d) {
      div.transition()
        .duration(500)
        .style("opacity", 0);
      // on mouseout - change color back to original
      d3.select(this)
        .transition()
        .style("stroke", in_person_pedestrian_color)
        .style("stroke-width", "0");
      // TODO on mouseout - stop highlighting the pictures
    })
  //Online Resident bar
  var bar2 = svg.selectAll('.orbar')
    .data(data)
    .enter()
    //add a rectangle for this bar
    .append('rect')
    //set the class for this bar for linking purposes
    .attr("class", (data, i) => "category" + i)
    //x is the category
    .attr("x", function(d) {
      return xScale(d.Things_Added_to_the_Park) + 2 *  xScale.bandwidth() / 4;
    })
    //y is the response type
    .attr("y", function(d) {
      return yScale(d.online_resident);
    })
    .attr("width", xScale.bandwidth() / 4)
    //set the color of this bar
    .attr('fill', online_resident_color)
    .attr("height", function(d) {
      return height - margin.bottom - yScale(d.online_resident);
    })
    //hover actions
    .on("mouseover", function(d) {
      div.transition()
        .duration(200)
        .style("opacity", .9);
        //tooltip - say the response type and the count
      div.html("Online Resident:" + "<br/>" + d.online_resident)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      d3.select(this)
        // change color of outline to highlight when mouse over
        .transition()
        .delay(100)
        .duration(100)
        .style("stroke", highlight_color)
        .style("stroke-width", "5");
        //TODO also highlight the amount of pictures on the corresponding isobar
    })
    .on("mouseout", function(d) {
      div.transition()
        .duration(500)
        .style("opacity", 0);
      // on mouseout - change color back to original
      d3.select(this)
        .transition()
        .style("stroke", online_resident_color)
        .style("stroke-width", "0");
        // TODO on mouseout - stop highlighting the pictures
    })
  //in person resident bar
  var bar3 = svg.selectAll('.iprbar')
    .data(data)
    .enter()
    //add a rectangle for this bar
    .append('rect')
    //set the class for this for linking purposes
    .attr("class", (data, i) => "category" + i)
    //x is the category
    .attr("x", function(d) {
      return xScale(d.Things_Added_to_the_Park) + (xScale.bandwidth() / 4);
    })
    //y is the response type
    .attr("y", function(d) {
      return yScale(d.in_person_resident);
    })
    .attr("width", xScale.bandwidth() / 4)
    .attr('fill', in_person_resident_color)
    .attr("height", function(d) {
      return height - margin.bottom - yScale(d.in_person_resident);
    })
    //hover actions
    .on("mouseover", function(d) {
      div.transition()
        .duration(200)
        .style("opacity", .9);
        //tooltip information - say the response type and the count
      div.html("In-Person Resident:" + "<br/>" + d.in_person_resident)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      d3.select(this)
      // change color of outline to highlight when mouse over
        .transition()
        .delay(100)
        .duration(100)
        .style("stroke", highlight_color)
        .style("stroke-width", "5");
         //TODO also highlight the amount of pictures on the corresponding isobar
    })
    //hoer out actions
    .on("mouseout", function(d) {
      div.transition()
        .duration(500)
        .style("opacity", 0);
      // on mouseout - change color back to original
      d3.select(this)
        .transition()
        .style("stroke", in_person_resident_color)
        .style("stroke-width", "0");
        // TODO on mouseout - stop highlighting the pictures
    })

    // title for the grouped bar chart
    var grouped_bar_title = svg
    .append("text")
    .attr("y", 15)
    .attr("x", 350)
    .style("fill", 'black')
    .style("font-size", "20px")
    .text("Response Counts for Different Survey Groups");

  //legend variables
  var rectX = 1000;
  var rectTextX = 1030;
  var rectY = 60;
  var rectTextY = 70;
  // Handmade legend
  svg.append("text")
    .attr("x", rectTextX)
    .attr("y", rectTextY - 30)
    .text("Legend: ")
    .style("font-size", "20px")
    .attr("alignment-baseline", "middle")
  // in person pedestrian square
  svg.append("rect")
    .attr("x", rectX)
    .attr("y", rectY)
    .attr("width", 15)
    .attr("height", 15)
    .style("fill", in_person_pedestrian_color)
   //in person resident square
   svg.append("rect")
    .attr("x", rectX)
    .attr("y", rectY + 30)
    .attr("width", 15)
    .attr("height", 15)
    .style("fill", in_person_resident_color)
  // online resident square
  svg.append("rect")
    .attr("x", rectX)
    .attr("y", rectY + 60)
    .attr("width", 15)
    .attr("height", 15)
    .style("fill", online_resident_color)
  // in person pedestrian text
   svg.append("text")
    .attr("x", rectTextX)
    .attr("y", rectTextY + 30)
    .text("In-Person Resident")
    .style("font-size", "20px")
    .attr("alignment-baseline", "middle") 
  // in person resident text
   svg.append("text")
    .attr("x", rectTextX)
    .attr("y", rectTextY)
    .text("In-Person Pedestrian")
    .style("font-size", "20px")
    .attr("alignment-baseline", "middle");
 // online resident text
 svg.append("text")
  .attr("x", rectTextX)
  .attr("y", rectTextY + 60)
  .text("Online Resident")
  .style("font-size", "20px")
  .attr("alignment-baseline", "middle")
 
//Iso-Type Bar Chart
    var svg2 = d3.select('#svg')
      .attr('width', width + 200)
      .attr('height', height + 200);

    //set the font size of the x axis
    svg2.select(".x.axis")
      .selectAll("text")
      .style("font-size", "15px");
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
      .attr("x", 50)
      .style("fill", 'black')
      .style("font-size", "15px")
      .text("Number of Responses");

    var xAxis = svg2.append('g')
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom().scale(xScale))
      .style('font-size', "15px")
      //Add label
      .append("text")
      .attr("x", width - 70)
      .attr("y", 40)
      .style("fill", 'black')
      .text("Things Added to Park");

    //Draw isotypes
    var isotypes = svg2.selectAll('.total')
      .data(data)
      .enter()
    //legend variables
    var imageY = 30;
    var startingTextY = 40;
    var imageX = 900;
    var textX = 930;

    // Handmade legends
      //Legend Title
    svg2.append("text")
      .attr("x", textX)
      .attr("y", startingTextY - 30)
      .text("Legend: ")
      .style("font-size", "20px")
      .attr("alignment-baseline", "middle")
      //add bench image
    svg2.append("image")
      .attr("href", "images/bench.png")
      .attr("width", 20)
      .attr("height", 20)
      .attr("x", imageX)
      .attr("y", imageY)
      //add rest area text
    svg2.append("text")
      .attr("x", textX)
      .attr("y", startingTextY)
      .text("= 1 response for Rest Areas (benches, etc.)")
      .style("font-size", "20px")
      .attr("alignment-baseline", "middle")
      //add tree image
    svg2.append("image")
      .attr("href", "images/tree.png")
      .attr("width", 20)
      .attr("height", 20)
      .attr("x", imageX)
      .attr("y", imageY + 30)
      //add tree text
    svg2.append("text")
      .attr("x", textX)
      .attr("y", startingTextY + 30)
      .text("= 1 response for Trees/Plants")
      .style("font-size", "20px")
      .attr("alignment-baseline", "middle")
      //add art image
    svg2.append("image")
      .attr("href", "images/art.png")
      .attr("width", 20)
      .attr("height", 20)
      .attr("x", imageX)
      .attr("y", imageY + 60)
      //add art text
    svg2.append("text")
      .attr("x", textX)
      .attr("y", startingTextY + 60)
      .text("= 1 response for Art Installations")
      .style("font-size", "20px")
      .attr("alignment-baseline", "middle")
      //add play image
    svg2.append("image")
      .attr("href", "images/play.png")
      .attr("width", 20)
      .attr("height", 20)
      .attr("x", imageX)
      .attr("y", imageY + 90)
      //add play text
    svg2.append("text")
      .attr("x", textX)
      .attr("y", startingTextY + 90)
      .text("= 1 response for Play Area for Kids")
      .style("font-size", "20px")
      .attr("alignment-baseline", "middle")
      //add fountain image
    svg2.append("image")
      .attr("href", "images/fountain.png")
      .attr("width", 20)
      .attr("height", 20)
      .attr("x", imageX)
      .attr("y", imageY + 120)
      //add fountain text
    svg2.append("text")
      .attr("x", textX)
      .attr("y", startingTextY + 120)
      .text("= 1 response for Fountains")
      .style("font-size", "20px")
      .attr("alignment-baseline", "middle")
      //add Other image
    svg2.append("image")
      .attr("href", "images/other.png")
      .attr("width", 20)
      .attr("height", 20)
      .attr("x", imageX)
      .attr("y", imageY + 150)
      //add Other text
    svg2.append("text")
      .attr("x", textX)
      .attr("y", startingTextY + 150)
      .text("= 1 response for Other")
      .style("font-size", "20px")
      .attr("alignment-baseline", "middle")
    ;

    var groups = svg2.selectAll("foo")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", (data, i) => "translate(" + (190 + i * 150) + "," + yScale2(19) + ")")
      .attr("class", (data, i) => "bar" + i)
      //hover actions
      .on("mouseover", function(data, i) {
        //tooltip functions
        div.transition()
          .duration(200)
          .style("opacity", .9);
          //say the Total + response count
        div.html("Total:" + "<br/>" + data.total_responses)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
          d3.selectAll(".category"+ i)
          .style("stroke", highlight_color)
          .style("stroke-width", "5");
      })
      //mouse out functions- go back to normal
      .on("mouseout", function(data, i) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
          d3.selectAll(".category" + i)
          .style("stroke", in_person_resident_color)
          .style("stroke-width", "0");
      });

    var images = groups.selectAll("bar")
      .data(data => d3.range(parseInt(data.total_responses, 10)))
      .enter()
      .append("svg:image")
      .attr("class", (data, i) => "individual_image" + i)
      .attr("width", 45)
      .attr("height", yScale2(19) / 2)
      .attr("y", function(data, i) {
        return height - (i * 48) - margin.bottom * 5.5;
      })
      .attr("xlink:href", function(data) {
        return d3.select(this.parentNode).datum().images
      })

    // title for the iso bar chart
    var iso_bar_title = svg2
    .append("text")
    .attr("y", 15)
    .attr("x", 300)
    .style("fill", 'black')
    .style("font-size", "20px")
    .text("What Enhancements and Additions Do People Want in Chester Park");

});
