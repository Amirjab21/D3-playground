// import React, { useEffect, useRef, useState } from "react";
// import * as d3 from "d3";
// import { sankey, sankeyLinkHorizontal, sankeyJustify} from 'd3-sankey';
// const size = {
//   width: 700,
//   height: 600
// };
// const Rect = ({ index, x0, x1, y0, y1, name, value, length, colors }) => {
//   return (
//     <>
//       <rect
//         x={x0}
//         y={y0}
//         width={x1 - x0}
//         height={y1 - y0}
//         fill={colors(index / length)}
//         data-index={index}
//       />
//       <text
//         x={x0 < size.width / 2 ? x1 + 6 : x0 - 6}
//         y={(y1 + y0) / 2}
//         style={{
//           fill: d3.rgb(colors(index / length)).darker(),
//           alignmentBaseline: "middle",
//           fontSize: 9,
//           textAnchor: x0 < size.width / 2 ? "start" : "end",
//           pointerEvents: "none",
//           userSelect: "none"
//         }}
//       >
//         {name}
//       </text>
//     </>
//   );
// };

// const Link = ({ data, width, length, colors }) => {
//   const link = sankeyLinkHorizontal();

//   return (
//     <>
//       <defs>
//         <linearGradient
//           id={`gradient-${data.index}`}
//           gradientUnits="userSpaceOnUse"
//           x1={data.source.x1}
//           x2={data.target.x0}
//         >
//           <stop offset="0" stopColor={colors(data.source.index / length)} />
//           <stop offset="100%" stopColor={colors(data.target.index / length)} />
//         </linearGradient>
//       </defs>
//       <path
//         d={link(data)}
//         fill={"none"}
//         stroke={`url(#gradient-${data.index})`}
//         strokeOpacity={0.5}
//         strokeWidth={width}
//       />
//     </>
//   );
// };


// const SankeyComp = props => {
//   const dragElement = useRef(null);
//   const graph = useRef(null);
//   const offset = useRef(null);

//   const svg = 

//   const colors = props.edit ? d3.interpolateWarm : d3.interpolateCool;
//   const sankeyConst = sankey()
//     .nodeAlign(sankeyJustify)
//     .nodes(props.data.nodes)
//     .links(props.data.links)
//     .nodeWidth(10)
//     .nodePadding(10)
//     .extent([[0, 0], [size.width, size.height]]);

//   var link = svg.append("g").selectAll(".link")
//       .data(graph.links)
//     .enter().append("path")
//       .attr("class", "link")
//       .attr("d", path)
//       .style("stroke-width", function(d) { return Math.max(1, d.dy); })
//       .sort(function(a, b) { return b.dy - a.dy; });

// // add the link titles
//   link.append("title")
//         .text(function(d) {
//     		return d.source.name + " → " + 
//                 d.target.name + "\n" + format(d.value); });

// // add in the nodes
//   var node = svg.append("g").selectAll(".node")
//       .data(graph.nodes)
//     .enter().append("g")
//       .attr("class", "node")
//       .attr("transform", function(d) { 
// 		  return "translate(" + d.x + "," + d.y + ")"; })
//       .call(d3.drag()
//         .subject(function(d) {
//           return d;
//         })
//         .on("start", function() {
//           this.parentNode.appendChild(this);
//         })
//         .on("drag", dragmove));

// // add the rectangles for the nodes
//   node.append("rect")
//       .attr("height", function(d) { return d.dy; })
//       .attr("width", sankey.nodeWidth())
//       .style("fill", function(d) { 
// 		  return d.color = color(d.name.replace(/ .*/, "")); })
//       .style("stroke", function(d) { 
// 		  return d3.rgb(d.color).darker(2); })
//     .append("title")
//       .text(function(d) { 
// 		  return d.name + "\n" + format(d.value); });

// // add in the title for the nodes
//   node.append("text")
//       .attr("x", -6)
//       .attr("y", function(d) { return d.dy / 2; })
//       .attr("dy", ".35em")
//       .attr("text-anchor", "end")
//       .attr("transform", null)
//       .text(function(d) { return d.name; })
//     .filter(function(d) { return d.x < width / 2; })
//       .attr("x", 6 + sankey.nodeWidth())
//       .attr("text-anchor", "start");
//   // const onMouseUp = e => {
//   //   dragElement.current = null;
//   // };

//   // const onMouseDown = e => {
//   //   if (e.target.tagName === "rect") {
//   //     dragElement.current = e.target;
//   //     offset.current = getMousePosition(e);
//   //     offset.current.y -= parseFloat(e.target.getAttributeNS(null, "y"));
//   //   }
//   // };

//   // const onMouseMove = e => {
//   //   if (dragElement.current) {
//   //     const coord = getMousePosition(e);
//   //     dragElement.current.setAttributeNS(null, "y", coord.y - offset.current.y);
//   //   }
//   // };

//   // useEffect(() => {
//   //   window.addEventListener("mouseup", onMouseUp);
//   //   window.addEventListener("mousedown", onMouseDown);
//   //   window.addEventListener("mousemove", onMouseMove);

//   //   return () => {
//   //     window.removeEventListener("mouseup", onMouseUp);
//   //     window.removeEventListener("mousedown", onMouseDown);
//   //     window.removeEventListener("mousemove", onMouseMove);
//   //   };
//   // }, []);

 

// };

// export default SankeyComp;
