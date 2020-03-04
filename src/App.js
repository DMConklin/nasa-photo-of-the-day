import React, { useState } from "react";
import "./App.css";
import Search from "./components/Search/Date.js";
import Media from "./components/MediaContainer/MediaContainer.js";

function App() {
  const [data, setData] = useState(Object);

  const dataSetter = (data) => {
    setData(data);
  }

  return (
    <div className="App">
      <Search dataSetter={dataSetter} />
      <Media date={data.date} explanation={data.explanation} media_type={data.media_type} title={data.title} url={data.url} />
    </div>
  );
}

export default App;
