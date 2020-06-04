import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Sankey from "./Sankey";

export default function App() {
  const DATA = {nodes
      :[{name:"Berlin"},{"name":"Refactor"},{"name":"Rehost"},{"name":"Rescore"},{"name":"Amsterdam"},{"name":"Paris"},{"name":"London"},{"name":"Munich"},{"name":"Brussels"},{"name":"Dubai"},{"name":"Dublin"},{"name":"Other Cities"},{"name":"No Response"},{"name":"Responded"},{"name":"Rejected"},{"name":"Interviewed"},{"name":"No Offer"},{"name":"Declined Offer"},{"name":"Accepted Offer"}],
      links:[{source: 0, target: 1, value: 1}]
  }
  const [data, setData] = useState(DATA);
  const [editMode, setEditMode] = useState(false);

  // useEffect(() => {
  //   fetch("https://raw.githubusercontent.com/ozlongblack/d3/master/energy.json")
  //     .then(res => res.json())
  //     .then(data => {console.log(data);setData(data)});
    
  // }, []);

  return (
    <div className="App">
      <div>
        <button onClick={() => setEditMode(!editMode)}>Edit Mode</button>
      </div>
      <Sankey data={data} edit={editMode} />
    </div>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
