import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Sankey from "./Sankey";
import Viz from './Viz';

export default function App() {
  const DATA = {nodes :[{name:"Berlin"},{"name":"Refactor"},{"name":"Rehost"},{"name":"Rescore"},{"name":"Amsterdam"},{"name":"Paris"},{"name":"London"},{"name":"Munich"},{"name":"Brussels"},{"name":"Dubai"},{"name":"Dublin"},{"name":"Other Cities"},{"name":"No Response"},{"name":"Responded"},{"name":"Rejected"},{"name":"Interviewed"},{"name":"No Offer"},{"name":"Declined Offer"},{"name":"Accepted Offer"}],
      links:[{source: 0, target: 1, value: 100},{source: 0, target: 2, value: 100},{source: 0, target: 3, value: 50}]
  }
  const [data, setData] = useState();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/ozlongblack/d3/master/energy.json")
      .then(res => res.json())
      .then(data => {setData(data)});
    
  }, []);
  if (data) {
  return (
    <div style={{width: '100%', height: '100%', display:'flex', justifyContent:'center',alignItems:'center'}}>
      <Viz  data={data} />
    </div>
  );
  } else {
    return <div />
  }
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
