import React, { useState } from "react";
import { PuppyType } from "../../types";
import UpdateForm from "../UpdateForm/UpdateForm";
import "./Card.css";

interface CardPropsComponentType {
  puppy: PuppyType;
}

const Card = ({ puppy }: CardPropsComponentType) => {
  const [click, setClick] = useState(false);
  const [info, setInfo] = useState(false);

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

  return (
    <div className="container">
      <div onClick={infoHandler} className="container__header">
        <img src={puppy.url} alt="puppy img" />
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
