import React from 'react';
import { sankey, sankeyLinkHorizontal, sankeyRight } from 'd3-sankey';
import { schemeTableau10 } from 'd3-scale-chromatic';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

export default class SankeyComp extends React.Component {


  DrawD3(width, height) {

    const dataCircles = [{R: 50, C: 75, name: 'app1', rec: 'retain', servers: 1 }, {R: 20, C: 45, name: 'app2', rec: 'rehost', servers: 4 }, {R: 30, C: 65, name: 'app3', rec: 'rearchitect', servers: 6 }];
    const margin = {left: 10,  right: 10, top: 10, bottom: 10};

    const svg = d3.select(this.refs.referee);

 var x = d3.scaleLinear()
    .domain([0, 100])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  svg  
  .append('text')
  .attr('color', 'black')
  .style('fontWeight', 'bold')
  .attr("text-anchor", "end")
  .attr("x", 500)
  .attr("y", height + 50)
  .text("Risk");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 100])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add a scale for bubble size
  var z = d3.scaleLinear()
    .domain([2000, 200010])
    .range([ 40, 200]);

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
