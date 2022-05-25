import React, { useEffect, useState } from "react";
import { PuppyType } from "../../types";
import UpdateForm from "../UpdateForm/UpdateForm";
import "./Card.css";

interface CardPropsComponentType {
  puppy: PuppyType;
}

const Card = ({ puppy }: CardPropsComponentType) => {
  const [click, setClick] = useState(false);
  const [info, setInfo] = useState(false);
  const [url, setUrl] = useState('');

  const updateHandler = () => {
    setClick(!click);
  };

  const infoHandler = () => {
    setInfo(!info);
  };

  const deleteHandler = () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`/api/puppies/${puppy.id}`, requestOptions);
    window.location.reload();
  };
  const fetchUnsplash = async () => {
    const data = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${puppy.breed}&client_id=wiSYEYCauBvmzu_WWKR3a6cSkmt3OKdxOg4AQo8oEaM`
    );
    const jsonData = await data.json();
    console.log(jsonData)
    if(jsonData.results.length === 0){
      setUrl('https://www.rit.edu/nsfadvance/sites/rit.edu.nsfadvance/files/default_images/photo-unavailable.png')
    } else {
      let i = Math.floor(Math.random()*10);
      const result = jsonData.results[i];
      setUrl(result.urls.small)
    }
  }
  useEffect(() => {
    fetchUnsplash();
  }, [])

  return (
    <div className="container">
      <div onClick={infoHandler} className="container__header">
        {/* <img src={puppy.url} alt="puppy img" /> */}
         <img src= {url} alt="puppy img"/>
        <h1>name: {puppy.name}</h1>
      </div>
      {info && (
        <div className="container__info">
          <p>breed: {puppy.breed}</p>
          <p>birth date: {puppy.birth}</p>
        </div>
      )}
      <div className="container__btn">
        <button className="container__btn--update" onClick={updateHandler}>
          Update Puppy
        </button>
        <button className="container__btn--delete" onClick={deleteHandler}>
          Delete Puppy
        </button>
      </div>
      {click && <UpdateForm puppy={puppy} />}
    </div>
  );
};

export default Card;
