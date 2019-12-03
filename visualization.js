const barwidth = 50;
const barOffset = 5;

//Generate SVG
const width = 1100,
  height = 1000;
const margin = {
  top: 40,
  bottom: 30,
  left: 100,
  right: 30
};

// set SVG variable with height, width, bg color
let svg = d3.select('#groupbar')
  .append('svg')
  .attr("preserveAspectRatio", "xMidYMid meet")
  .attr("viewBox", [0, 0, width + margin.left + margin.right,
    height + margin.top + margin.bottom + 120
  ].join(' '));
// Define the div for the tooltip
let div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

//Define data
d3.csv("data/Q1/clean_greenspace.csv").then(function(data) {

  // Define Scales
  let yScale = d3.scaleLinear()
    .domain([0, 10])
    .range([height - margin.bottom, margin.top])

  var xScale = d3.scaleBand()
    .domain(data.map(function(d) {
      return d.Things_Added_to_the_Park;
    }))
    .range([margin.left, width - margin.right])
    .padding(0.5);

  let making_axis = function(d) {
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
    .style("font-weight", "bold");

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
    .text("Enhancements to the Park")
    .attr("x", width + 50)
    .attr("y", height + margin.bottom + 20)
    .style("fill", 'black')
    .style("font-weight", "bold")
    .style("text-anchor", "end");

  //Draw bars for the grouped bar chart
  //in person pedestrian bar (aka pedbar)
  var bar = svg.selectAll('.pedbar')
    .data(data)
    .enter()
    //add a rectangle as the bar
    .append('rect')
    //set a class for this bar for linking purposes
    .attr("class", (data, i) => "category" + i)
    // class this bar as a pedestrian bar
    .classed("pbar", true)
    //x is the category
    .attr("x", function(d) {
      return xScale(d.Things_Added_to_the_Park);
    })
    //y is the response type
    .attr("y", function(d) {
      return yScale(d.in_person_pedestrian);
    })
    .attr("width", xScale.bandwidth() / 4)
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
      div.html("In-Person Pedestrian:" + "<br/>" + num_responses + "<br/>" + other_responses_pedestrian)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      d3.select(this)
      //change color of outline of in person pedestrian bar to highlight when mouse over
        .classed("unhighlighted", false)
        .classed("highlighted", true)
        .transition()
        .delay(100)
        .duration(100);
        //also highlight the amount of pictures on the corresponding isobar
        // by changing the opacity of the number of responses to 1, and the rest to 0.2
      d3.select(".bar" + i)
        .selectAll("image")
        .style("opacity", (d, i) => {
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
        .classed("highlighted", false)
        .classed("unhighlighted", true)
        .transition();
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
    //class this as an online resident bar
    .classed("orbar", true)
    //x is the category
    .attr("x", function(d) {
      return xScale(d.Things_Added_to_the_Park) + 2 * xScale.bandwidth() / 4;
    })
    //y is the response type
    .attr("y", function(d) {
      return yScale(d.online_resident);
    })
    .attr("width", xScale.bandwidth() / 4)
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
        .classed("unhighlighted", false)
        .classed("highlighted", true)
        .transition()
        .delay(100)
        .duration(100);
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
        .classed("highlighted", false)
        .classed("unhighlighted", true)
        .transition();
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
    //class this bar as an in person resident bar
    .classed("iprbar", true)
    //x is the category
    .attr("x", function(d) {
      return xScale(d.Things_Added_to_the_Park) + (xScale.bandwidth() / 4);
    })
    //y is the response type
    .attr("y", function(d) {
      return yScale(d.in_person_resident);
    })
    .attr("width", xScale.bandwidth() / 4)
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
        .classed("unhighlighted", false)
        .classed("highlighted", true)
        .transition()
        .delay(100)
        .duration(100);
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
        .classed("highlighted", false)
        .classed("unhighlighted", true)
        .transition();
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
    .style("font-weight", "bold")
    .text("Response Counts for Different Survey Groups");

  //legend variables
  let rectX = 1000;
  let rectTextX = 1030;
  let rectY = 50;
  let rectTextY = 60;

    // Programmatically generating a legend for the bar chart using functions and pulling data from CSV
    function bar_legend() { 
      
      // append legend title
      svg.append("text")
        .attr("x", rectTextX)
        .attr("y", rectTextY)
        .text("Legend: ")
        .style("font-size", "20px")
        .attr("alignment-baseline", "middle");

      //Color Variables for legend
      // coral
      let in_person_pedestrian_color = "#FC8D62";
      // green
      let in_person_resident_color = '#66C2A5';
      //light blue
      let online_resident_color = "#8DA0CB";
      //add these colors to an array to call from later
      let color_array = [in_person_pedestrian_color, in_person_resident_color, online_resident_color]

      // append the color rectangles to the legend
      let bar_legend_rect = svg.selectAll('.legend_entry')
        .data(data)
        .enter()
        .append("rect")
        .attr("x", rectX)
        .attr("y", function(d,i) {
          rectY = rectY + 30; // increase the y position each time
          return rectY;
        })
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", function(d,i) {
          if (i < 3) {
            return color_array[i]; //get the color of the rect from the color array
          }
          else {
            return "#FFFFFF"; // for the rest of the squares, return white (since it will loop through 6 times, but we only want 3)
          }
        })

      // append the text to the legend for each category
      let text_array = ["In-Person Pedestrian", "In-Person Resident", "Online Resident"]
      let bar_legend_text = svg.selectAll('.legend_entry')
          .data(data)
          .enter()
          .append("text")
            .attr("x", rectTextX)
            .attr("y", function(d){
              rectTextY = rectTextY + 30; //increase the y position each time
              return rectTextY;
            })
            .text(function(d,i){
              return text_array[i]; //survey response type
            })
            .style("font-size", "20px")
            .attr("alignment-baseline", "middle")
      }
      //call the bar legend function for it to appear
      bar_legend();

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
    .style("font-weight", "bold");

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

  //making a new variable so that the X Axis label does not get rotated also
  var xAxis_label = svg2.append('g')
    //Add label
    .append("text")
    .text("Enhancements to the Park")
    .attr("x", width + 50)
    .attr("y", height + margin.bottom + 20)
    .style("fill", 'black')
    .style("font-weight", "bold")
    .style("text-anchor", "end");

  //Draw isotypes
  var isotypes = svg2.selectAll('.total')
    .data(data)
    .enter()
  //legend variables
  let imageY = 50;
  let startingTextY = 60;
  let imageX = 880;
  let startingTextX = 910;

  // Programmatically generating a legend for the isograph using functions and pulling data from CSV
  function legend() { 
    svg2.append("text")
      .attr("x", startingTextX)
      .attr("y", startingTextY)
      .text("Legend: ")
      .style("font-size", "20px")
      .attr("alignment-baseline", "middle");
    // append the images to the legend
    let legend_pic = svg2.selectAll('.legend_entry')
      .data(data)
      .enter()
      .append("image")
        .attr("href", function(d) {
          return d.images;
        })
        .attr("width", 20)
        .attr("height", 20)
        .attr("x", imageX)
        .attr("y", function(d) {
          imageY = imageY + 30; // increase the y position each time
          return imageY;
        })
    // append the text to the legend for each category
    let legend_text = svg2.selectAll('.legend_entry')
        .data(data)
        .enter()
        .append("text")
          .attr("x", startingTextX)
          .attr("y", function(d){
            startingTextY = startingTextY + 30; //increase the y position each time
            return startingTextY;
          })
          .text(function(d){
            return "= 1 response for " + d.Things_Added_to_the_Park;
          })
          .style("font-size", "20px")
          .attr("alignment-baseline", "middle")
    }
    //call the legend function for it to appear
    legend();

    // hovering actions for the isograph chart
    var groups = svg2.selectAll("isograph")
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
          .classed("unhighlighted", false)
          .classed("highlighted", true);
      })
      //mouse out functions- go back to normal
      .on("mouseout", function(data, i) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
          d3.selectAll(".category" + i)
          .classed("highlighted", false)
          .classed("unhighlighted", true);
      });

    // images for the isograph chart
    var images = groups.selectAll("iso_images")
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
    .style("font-weight", "bold")
    .text("What Enhancements and Additions Do People Want in Chester Park?");

});
