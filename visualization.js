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
var svg = d3.select('#groupbar')
  .append('svg')
  .attr("preserveAspectRatio", "xMidYMid meet")
  .attr("viewBox", [0, 0, width + margin.left + margin.right, 
    height + margin.top + margin.bottom + 120].join(' '));
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

  var making_axis = function(d) {
    xScale.classed("tilted")
    return d.Things_Added_to_the_Park
  }

  //Draw Axes
  var yAxis = svg.append('g')
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft().scale(yScale))
    .style('font-size', "17px")
      //Add label
      .append("text")
      .text("Number of Responses")
      .attr("x", 90)
      .attr("y", 15)
      .style("fill", 'black')
      .style("font-weight","bold");

  var xAxis = svg.append('g')
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom().scale(xScale))
    .style('font-size', "25px").selectAll("text")	
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", function(d) {
        return "rotate(-35)" 
        });
  var xAxis = svg.append('g')
    //Add label
    .append("text")
    .text("Things Added to Park")
    .attr("x", width + 50)
    .attr("y", height + margin.bottom)
    .style("fill", 'black')
    .style("font-weight","bold")
    .style("text-anchor","end");

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
    .on("mouseover", function(d, i) {
      //tooltip informtation
      div.transition()
        .duration(200)
        .style("opacity", .9);
      //number of responses variable
      var num_responses = d.in_person_pedestrian;
      // string variable for the other responses text
      var other_responses_pedestrian = d.other_responses_pedestrian;

      //response type info and count of responses (and Other responses if necessary)
      div.html("In-Person Pedestrian:" +"<br/>" + num_responses + "<br/>" + other_responses_pedestrian)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      d3.select(this)
      //change color of outline of in person pedestrian bar to highlight when mouse over
        .transition()
        .delay(100)
        .duration(100)
        .style("stroke", highlight_color)
        .style("stroke-width", "5");
        //also highlight the amount of pictures on the corresponding isobar
        // by changing the opacity of the number of responses to 1, and the rest to 0.2
      d3.select(".bar" + i)
        .selectAll("image")
        .style("opacity", (d,i) => {
          return i < num_responses ? 1 : 0.3
        });

    })
    //when the cursor stops hovering, set back to normal
    .on("mouseout", function(d, i) {
      div.transition()
        .duration(500)
        .style("opacity", 0);
      // on mouseout - change color back to original
      d3.select(this)
        .transition()
        .style("stroke", in_person_pedestrian_color)
        .style("stroke-width", "0");
      //on mouseout - reset opacity
      d3.select(".bar" + i)
      .selectAll("image")
      .style("opacity", 1)
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
    .on("mouseover", function(d, i) {
      div.transition()
        .duration(200)
        .style("opacity", .9);
      //var for num responses
      var or_num_responses = d.online_resident;
      // string var for the other responses text
      var other_responses_online = d.other_responses_online;
        //tooltip - say the response type and the count, and other response text if necessary
      div.html("Online Resident: " + or_num_responses + "<br/>" + other_responses_online)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      d3.select(this)
        // change color of outline to highlight when mouse over
        .transition()
        .delay(100)
        .duration(100)
        .style("stroke", highlight_color)
        .style("stroke-width", "5");
        //also highlight the amount of pictures on the corresponding isobar
        // by changing the opacity of the number of responses to 1, and the rest to 0.2
        d3.select(".bar" + i)
          .selectAll("image")
          .style("opacity", (d,i) => {
            return i < or_num_responses ? 1 : 0.3
          });
        })
    .on("mouseout", function(d, i) {
      div.transition()
        .duration(500)
        .style("opacity", 0);
      // on mouseout - change color back to original
      d3.select(this)
        .transition()
        .style("stroke", online_resident_color)
        .style("stroke-width", "0");
      //on mouseout - reset opacity
      d3.select(".bar" + i)
      .selectAll("image")
      .style("opacity", 1)
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
    .on("mouseover", function(d, i) {
      div.transition()
        .duration(200)
        .style("opacity", .9);
      //var for num responses
      var ipr_num_responses = d.in_person_resident;
        //tooltip information - say the response type and the count
      div.html("In-Person Resident:" + "<br/>" + ipr_num_responses)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      d3.select(this)
      // change color of outline to highlight when mouse over
        .transition()
        .delay(100)
        .duration(100)
        .style("stroke", highlight_color)
        .style("stroke-width", "5");
        //also highlight the amount of pictures on the corresponding isobar
        // by changing the opacity of the number of responses to 1, and the rest to 0.2
        d3.select(".bar" + i)
          .selectAll("image")
          .style("opacity", (d,i) => {
            return i < ipr_num_responses ? 1 : 0.3
          });
        })
    //hover out actions
    .on("mouseout", function(d, i) {
      div.transition()
        .duration(500)
        .style("opacity", 0);
      // on mouseout - change color back to original
      d3.select(this)
        .transition()
        .style("stroke", in_person_resident_color)
        .style("stroke-width", "0");
      //on mouseout - reset opacity
      d3.select(".bar" + i)
        .selectAll("image")
        .style("opacity", 1)   
       })

    // title for the grouped bar chart
    var grouped_bar_title = svg
      .append("text")
      .attr("y", 20)
      .attr("x", 350)
      .style("fill", 'black')
      .style("font-size", "25px")
      .style("font-weight","bold")
      .text("Response Counts for Different Survey Groups");

  //legend variables
  var rectX = 1000;
  var rectTextX = 1030;
  var rectY = 80;
  var rectTextY = 90;
  // Grouped Bar legend
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


    var svg2 = d3.select('#isograph')
      .append('svg')
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("viewBox", [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom + 120]
      .join(' '));

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
      .style('font-size', "17px")
     //Add label
     .append("text")
     .text("Number of Responses")
     .attr("x", 90)
     .attr("y", 15)
     .style("fill", 'black')
     .style("font-weight","bold");

    var xAxis = svg2.append('g')
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom().scale(xScale))
      .style('font-size', "25px").selectAll("text")	
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", function(d) {
          return "rotate(-35)" 
          })

          var xAxis = svg2.append('g')
          //Add label
          .append("text")
          .text("Things Added to Park")
          .attr("x", width + 50)
          .attr("y", height + margin.bottom)
          .style("fill", 'black')
          .style("font-weight","bold")
          .style("text-anchor","end");

    //Draw isotypes
    var isotypes = svg2.selectAll('.total')
      .data(data)
      .enter()
    //legend variables
    var imageY = 80;
    var startingTextY = 90;
    var imageX = 880;
    var startingTextX = 910;

    // Handmade legends
    //Isotype Legend Title
    svg2.append("text")
      .attr("x", startingTextX)
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
      .attr("x", startingTextX)
      .attr("y", startingTextY)
      .text("= 1 response for Rest Areas")
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
      .attr("x", startingTextX)
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
      .attr("x", startingTextX)
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
      .attr("x", startingTextX)
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
      .attr("x", startingTextX)
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
      .attr("x", startingTextX)
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
      .attr("preserveAspectRatio", "xMidYMid meet")
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
    .attr("y", 20)
    .attr("x", 300)
    .style("fill", 'black')
    .style("font-size", "25px")
    .style("font-weight","bold")
    .text("What Enhancements and Additions Do People Want in Chester Park?");

});
