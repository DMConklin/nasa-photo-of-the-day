import React, { useEffect } from "react";
import axios from 'axios';
import "./App.css";
import Header from "./components/Header/Header.js";
import Media from "./components/MediaContainer/MediaContainer.js";

function App() {

useEffect(() => {
   axios
    .get("https://api.nasa.gov/planetary/apod?api_key=VSDX406ElKtT7Zaql3PPtpmCz7yhy6tKEgRV796g")
    .then(response => console.log(response));
}, []);

  return (
    <div className="App">
      <Header />
      <Media />
    </div>
  );
}

export default App;
