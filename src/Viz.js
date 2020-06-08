import React from 'react';
import { sankey, sankeyLinkHorizontal, sankeyRight } from 'd3-sankey';
import { schemeTableau10 } from 'd3-scale-chromatic';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

export default class SankeyComp extends React.Component {

  formatData() {
    const data = { nodes: [{ name: 'refactor' }, { name: 'rehost' }, { name: 'repurchase' }, { name: 4 }, { name: '5' }], links: [] };
    this.props.data.forEach((app) => {
      data.nodes.push(
        {
          serverCount: app.serverCount, name: app.name,
        },
      );
      if (app.recommendations.length > 0) {
        app.recommendations.forEach((rec) => {
          if (rec.recommendation === 4) {
            data.links.push({ source: app.name, target: rec.category.toString(), value: app.serverCount + 1, recommend: 1 });
          }
          if (rec.recommendation === 3) {
            data.links.push({ source: app.name, target: rec.category.toString(), value: app.serverCount + 1, recommend: 0 });
          }
        });
      }
    });
  }

  DrawD3(width, height) {

    if (this.props.data) {
      const dataReal = { nodes: [{ name: 'refactor' }, { name: 'rehost' }, { name: 'repurchase' }, { name: 'retain' }, { name: 'rearchitect' }, { serverCount: 0, name: 'AB Initio Browser',category: 1 }, { name: 'AccessTest1',category: 1 }, { name: 'ACIWEB',category: 1 }, { name: 'Acorn Web',category: 1 }, { name: 'adada',category: 1 }, { name: 'AIM',category: 1 }, { name: 'AIM v2',category: 1 }, { name: 'AlarmPoint',category: 1 }, { name: 'Amex',category: 1 }, { name: 'Amirs-due-to-expire-app',category: 1 }, { name: 'Anacorp',category: 1 }, { name: 'App with no servers',category: 1 }, { name: 'Apply Portal', category: 1 }],
        links: [{ source: 'ACIWEB', target: 'refactor', value: 1, recommend: 1,category: 1 }, { source: 'adada', target: 'rearchitect', value: 1, recommend: 1 }, { source: 'AIM v2', target: 'rearchitect', value: 2, recommend: 1 }, { source: 'AccessTest1', target: 'rearchitect', value: 2, recommend: 1 }, { source: 'AccessTest1', target: 'rehost', value: 2, recommend: 1 }, { source: 'adada', target: 'retain', value: 2, recommend: 1 }, { source: 'AIM', target: 'repurchase', value: 2, recommend: 1 }, { source: 'Amex', target: 'rehost', value: 2, recommend: 1 }, { source: 'Amirs-due-to-expire-app', target: 'rehost', value: 2, recommend: 1 }, { source: 'App with no servers', target: 'retain', value: 2, recommend: 1 }, { source: 'Anacorp', target: 'rehost', value: 2, recommend: 1 }, { source: 'Amex', target: 'repurchase', value: 2, recommend: 1 },
          { source: 'Acorn Web', target: 'refactor', value: 2, recommend: 1 }, { source: 'AlarmPoint', target: 'rearchitect', value: 2, recommend: 1 }, { source: 'Apply Portal', target: 'repurchase', value: 2, recommend: 1 }, { source: 'AB Initio Browser', target: 'rehost', value: 2, recommend: 1 }, { source: 'adada', target: 'rehost', value: 2, recommend: 1 }] }
      // formatData() do this to turn data from graphql query into data ready for Sankey

      const names = dataReal.nodes.map(item => item.name);
      const  appsonly = dataReal.nodes.filter(item => item.category && item.category === 1.).map(item => item.name)
      console.log(appsonly,'apps')
  function color(d) {
    const colorx = d3.scaleOrdinal(schemeTableau10).domain(names)
    return colorx(d.name ? d.name : d.source.name);
  }  

  function colorlinks(d) {
    const colorx = d3.scaleOrdinal(schemeTableau10).domain(names)
    return colorx(d.target.name)
  }

  function colorBlues(d) {
    const colorx = d3.scaleOrdinal(["#007DB9", "rgb(54, 175, 78)", "#26AAE1", '#F3A32F']).domain(appsonly);
    return colorx(d.name)
  }

      const Sankey = sankey()
        .nodeWidth(30)
        .nodePadding(10)
        .nodeAlign(sankeyRight)
        .size([width, height])
        .nodeId(d => d.name)
        .nodeSort(a => {})


      const graph = Sankey(dataReal);
      // eslint-disable-next-line react/no-string-refs
      const svg = d3.select(this.refs.referee);

      const div = d3.select('body').append('div')
        .attr('class', 'tooltip-donut')
        .style('opacity', 0)
        .style('position', 'absolute')
        .style('background-color', '#eaeaea');

    const path = sankeyLinkHorizontal();
    // add in the nodes
    svg.append('g')
        .attr('stroke', '#000')
      .selectAll('rect')
      .data(graph.nodes)
      .join('rect')
        .attr('x', d => d.x0)
        .attr('y', d => d.y0)
        .attr('height', d => d.y1 - d.y0)
        .attr('width', d => d.x1 - d.x0)
        .attr('fill', (d, i) => d.category ? colorBlues(d) : color(d))
      .append('title')
        .text(d => `${d.name}\n`);

    const link = svg.append('g')
      .attr('fill', 'none')
      .attr('stroke-opacity', 0.8)
      .selectAll('g')
      .data(graph.links)
      .join('g')
        .style('mix-blend-mode', 'multiply');

    link.append('path')
        .attr('d', path)
        .attr('class', 'link')
        // .attr('stroke', d => colorlinks(d))
        .style('stroke', (d, i) => {

    // make unique gradient ids  
    const gradientID = `gradient${i}`;

    const startColor = colorBlues(d.source);
    const stopColor = color(d.target);

    const linearGradient = link.append('linearGradient')
        .attr('id', gradientID);

    linearGradient.selectAll('stop') 
      .data([                             
          {offset: '10%', color: startColor },      
          {offset: '90%', color: stopColor }    
        ])                  
      .enter().append('stop')
      .attr('offset', d => {
        return d.offset; 
      })   
      .attr('stop-color', d => {
        return d.color;
      });

    return `url(#${gradientID})`;
  })
        .attr('stroke-width', d => 30)
        

    link.append('title')
        .text(d => `${d.source.name} → ${d.target.name}\n`);


const gradient = link.append('linearGradient')
        .attr('id', d => (d.index))
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', d => d.source.x1)
        .attr('x2', d => d.target.x0);

    gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', d => color(d.source));
     gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', d => color(d.target));

        function highlightPaths(option, source) {
          let paths = svg.selectAll('path')
          .filter(d => {console.log(d); return source === true ? d.source.name === option : d.target.name === option})
          .transition()
          .duration(100)
          .attr('stroke', 'red')

          svg.selectAll('path').filter(d => source === true ? d.source.name !== option :  d.target.name !== option)
          .transition()
          .duration(100)
          .attr('opacity', 0.01)
        }

        let apprects = d3.selectAll('rect')
        .filter(d => ['AB Initio Browser', 'adada', 'ACIWEB', 'Acorn Web', 'AIM', 'Amex', 'Amirs-due-to-expire-app', 'AccessTest1', 'Appy Portal', 'Anacorp', 'AIM v2', 'AlarmPoint', 'App  with no servers', 'Apply Portal', 'App with no servers'].includes(d.name))
        apprects.on('mouseover', function(d, i) {
          highlightPaths(d.name, true)
        })
        .on('mouseout', function(d, i) {
          svg.selectAll('path')
        .attr('d', path)
        .attr('stroke', d =>  colorlinks(d))
        // .attr('stroke-width', d => Math.max(1, d.width))
        .attr('opacity', 1)
        })

      let rects = d3.selectAll('rect')
        .filter(d => ['refactor', 'rehost', 'repurchase', 'retain', 'rearchitect'].includes(d.name))
          
        rects.on('mouseover', function(d, i) {
          highlightPaths(d.name)
        })
        .on('mouseout', function(d, i) {
          svg.selectAll('path')
        .attr('d', path)
        .attr('stroke', d =>  colorlinks(d))
        // .attr('stroke-width', d => Math.max(1, d.width))
        .attr('opacity', 1)
        })



      // show value on mouse hover
      d3.selectAll('path').on('mouseover', function (d, i) {

                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '.85');

                  div.transition()
                .duration(50)
                .style('opacity', 1);
                console.log(d)
                div.html(`application ${d.source.name} has ${d.value} servers`)
  
      .style('left', (d3.event.pageX + 10) + 'px')
      .style('top', (d3.event.pageY - 15) + 'px');
      })
      
      .on('mouseout', function (d, i) {
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '1');

                  div.transition()
                .duration('50')
                .style('opacity', 0)
      })

    svg.append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 16)
        .attr('font-weight', 'bold')
        .attr('width', 50)
        .attr('text-align', 'left')
      .selectAll('text')
      .data(graph.nodes)
      .join('text')
        .attr('x', d => d.x0 < width / 2 ? d.x1 - 50 : d.x0 + 50)
        .style('width', 50)
        .attr('y', d => (d.y1 + d.y0) / 2)
        .attr('dy', '0.35em')
        .attr('text-anchor', d => d.x0 < width / 2 ? 'end' : 'start')
        .text(d => d.name);
    }
}

  componentDidMount() {
    this.DrawD3(1000, 800)
  }

  render() {
    return (
      <svg style={{ overflow: 'visible' }} width={1000} height={800} ref={'referee'} />
    );
  }
}

SankeyComp.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
};
