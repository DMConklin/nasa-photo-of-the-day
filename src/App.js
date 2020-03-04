import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./App.css";
import Header from "./components/Header/Header.js";
import Media from "./components/MediaContainer/MediaContainer.js";

function App() {
  const [data, setData] = useState(Object);

  useEffect(() => {
    axios
      .get("https://api.nasa.gov/planetary/apod?api_key=VSDX406ElKtT7Zaql3PPtpmCz7yhy6tKEgRV796g")
      .then(response => {
        setData(response.data);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <Media date={data.date} explanation={data.explanation} media_type={data.media_type} title={data.title} url={data.url} />
    </div>
  );
}

export default App;
