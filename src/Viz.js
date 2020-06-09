import React from 'react';
import { sankey, sankeyLinkHorizontal, sankeyRight } from 'd3-sankey';
import { schemeTableau10 } from 'd3-scale-chromatic';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

export default class SankeyComp extends React.Component {



  DrawD3(width, height) {

    const dataCircles = [{R: 50, C: 75, name: 'app1', rec: 'retain', servers: 1 }, {R: 20, C: 45, name: 'app2', rec: 'rehost', servers: 4 }, {R: 30, C: 65, name: 'app3', rec: 'rearchitect', servers: 6 },
    {R: 50, C: 15, name: 'app1', rec: 'repurchase', servers: 4 }, {R: 88, C: 45, name: 'Adobe', rec: 'rearchitect', servers: 10 }, {R: 90, C: 25, name: 'AMEX', rec: 'retain', servers: 12 },
    {R: 50, C: 75, name: 'OSX', rec: 'retain', servers: 1 }, {R: 40, C: 85, name: 'MSX', rec: 'rehost', servers: 4 }, {R: 10, C: 65, name: 'app3', rec: 'rearchitect', servers: 9 },
    {R: 50, C: 75, name: 'apple', rec: 'rehost', servers: 1 }, {R: 21, C: 45, name: 'confidential', rec: 'rehost', servers: 4 }, {R: 50, C: 65, name: 'AXIOS', rec: 'rearchitect', servers: 1 }];
    const margin = {left: 10,  right: 10, top: 10, bottom: 10};

    const svg = d3.select(this.refs.referee);

      const div = d3.select('body').append('div')
      .attr('class', 'tooltip-donut')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background-color', '#eaeaea');

      svg.append('rect')
      .attr('fill', "red")
      .attr('opacity', 0.1)
      .attr('x', 250)
      .attr('width',250)
      .attr('height',500)
      // .attr('y', 250)

      svg.append('rect')
      .attr('fill', "green")
      .attr('opacity', 0.1)
      .attr('y', 0)
      .attr('width',500)
      .attr('height',250)
      // .attr('y', 250)

 var x = d3.scaleLinear()
    .domain([0, 100])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  svg  
  .append('text')
  .attr('fill', 'red')
  .style('fontWeight', 'bold')
  .attr("text-anchor", "end")
  .attr('font-size',30)
  .attr("x", 500)
  .attr("y", height + 50)
  .text("Risk");

  svg  
  .append('text')
  .attr('font-size',30)
  .style('fill', 'green')
  .style('fontWeight', 'bold')
  .attr("text-anchor", "end")
  .attr("x", -40)
  .attr("y", 20)
  .text("Complexity");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 100])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add a scale for bubble size
  var z = d3.scaleLinear()
    .domain([0, 20])
    .range([ 5, 40]);

  // Add a scale for bubble color
  var myColor = d3.scaleOrdinal()
    .domain(["retain", "rehost","refactor","repurchase","rearchitect"])
    .range(schemeTableau10);

  const sevenRs = dataCircles.map(item => item.rec)

  function color(d) {
    const colorx = d3.scaleOrdinal(schemeTableau10).domain(sevenRs)
    return colorx(d.rec);
  }  

  svg.append('g')
  .selectAll("dot")
  .data(dataCircles)
  .enter()
  .append("circle")
    .attr("cx", function (d) { return x(d.R); } )
    .attr("cy", function (d) { return y(d.C); } )
    .attr("r", function (d) { return z(d.servers); } )
    .style("fill", function (d) { return color(d) } )
    .style("opacity", "0.7")
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .on('mouseover', onMouseOver )
    .on('mouseleave', onMouseOut)

    function onMouseOver(d, i) {
    d3.select(this).transition()
        .duration('50')
        .style('opacity', '1');

        div.transition()
        .duration(200)
        .style('display','flex')
        .style('opacity', 1)
        .style("left", (d3.event.pageX + 30) + "px")
        .style("top", (d3.mouse(this)[1]+30) + "px")
        .style('background-color', color(d))
        div.html(() => {
          console.log(d)
          return `${d.name} <br /> option: ${d.rec} <br /> servers: ${d.servers}`
        })
  }
  function onMouseOut(d, i) {
    d3.select(this).transition()
        .duration('50')
        .style('opacity', '0.7');

        div.transition()
        .duration(200)
        .style('opacity', 0)
        // .style('display','none')
  }


}

  componentDidMount() {
    this.DrawD3(500, 500);
  }


  render() {
    return (
      <svg style={{ overflow: 'visible', padding: 10 }} width={500} height={500} ref={'referee'} />
    );
  }
}

SankeyComp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
};
