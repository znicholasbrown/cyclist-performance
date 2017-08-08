$('.tube').show();

setTimeout(() => {
  $.getJSON("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json", (data) => {
  
  data.forEach((d) => {
    d.Place = +d.Place;
    d.Seconds = -(2210 - d.Seconds);
  })

  
var margin = {top: 40, right: 60, bottom: 40, left: 60}, 
    width = 960 - margin.left - margin.right, 
    height = 500 - margin.top - margin.bottom;

  var x = d3.scaleLinear()
      .range([width, 0])
      .domain(d3.extent(data, (d) => { return d.Seconds }));
  
  var xAxis = d3.axisBottom(x).ticks(10).tickFormat(d3.format("+"));
  
  var y = d3.scaleLinear()
      .range([height, 0])
      .domain([d3.max(data, (d) => { return d.Place; } ), 1]);

  var yAxis = d3.axisLeft(y);
  
  var svg = d3.select(".root")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
  
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
    
  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + (-40) + ", "+(height/2)+")rotate(-90)")
    .text("Place")
    
  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + width/2 + ", "+(height + 40)+")")
    .text("Seconds behind fastest time")
  
  svg.selectAll("point")
      .data(data)
    .enter().append("a")
      .attr("xlink:href", (d) => { return d.URL } )
      .attr("cursor", (d) => { return d.URL === "" ? "default" : "pointer" } )
      .append("circle")
        .attr("class", "point")
        .attr("cy", (d) => {  return y(d.Place) } )
        .attr("cx", (d) => { return x(d.Seconds) } )
        .attr("r", 5)
        .style("fill", (d) => { return d.Doping === "" ? "#0F6FCF" : "#808B96" })
        .on("mouseover", (d) => {
          let minutes = "0" + Math.floor(d.Seconds + 2210 / 60),
              seconds = "0" + (d.Seconds + 2210 - minutes * 60),
              time = minutes.substr(-2) + ":" + seconds.substr(-2);
          tip.html("<p><strong>" + d.Name + "</strong></p><p>Time: " + time + "</p><p>Year: " + d.Year + "</p>");
        return tip.style("visibility", "visible");
        })
      .on("mousemove", () => {
        return tip.style("top", (d3.event.pageY-100)+ "px").style("left",(d3.event.pageX-100)+ "px");
        })
      .on("mouseout", () => {
        return tip.style("visibility", "hidden");
        });
  
  
var tip = d3.select("body")
    .append("foreignObject")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden");
             
  $('.container').show();
  $('.tube').hide();

  })
  
}, 1250)

