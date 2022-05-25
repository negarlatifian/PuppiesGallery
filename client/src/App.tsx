import React, { useEffect, useState } from "react";
import "./App.css";
import Gallery from "./components/Gallery/Gallery";
import Header from "./components/Header/Header";
import { PuppyType } from "./types";

function App() {
  const [puppiesData, setPuppiesData] = useState<PuppyType[]>([]);

  const fetchData = async () => {
    const result = await fetch("api/puppies", { mode: "no-cors" });
    const data = await result.json();
    return data;
  };
  fetchData();

  useEffect(() => {
    const fetchPuppies = async () => {
      const data = await fetchData();
      setPuppiesData(data);
    };
    fetchPuppies();
  }, []);
  console.log(puppiesData);

  return (
    <div className="App">
      <Header />
      <Gallery puppiesData={puppiesData} />
    </div>
  );
}

export default App;
