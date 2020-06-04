import React, { useEffect, useRef, useReducer } from 'react';
import * as d3 from 'd3'

export default class Viz extends React.Component {


    DrawD3(width, height) {

      const data = {
        nodes: [{name: "app1", category: "Reccommend"}, {name: 'app2', category: 'rehost'}, {name: 'app3', category: 'refactor'}]
      }

      const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);
    }

componentDidMount() {
  this.DrawD3()
}


  render() {
    return (
    <div className='viz' ref='referee' />
  )
  }
}