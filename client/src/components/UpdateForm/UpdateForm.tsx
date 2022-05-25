import React, { useRef} from "react";
import { PuppyType } from "../../types";
import './UpdateForm.css'

interface UpdateFormComponentsType {
  puppy: PuppyType;
}

const UpdateForm = ({ puppy }: UpdateFormComponentsType) => {
  let nameInputRef = useRef<HTMLInputElement>(null);
  let breedInputRef = useRef<HTMLInputElement>(null);
  let birthDateInputRef = useRef<HTMLInputElement>(null);

  const SubmitHandler = () => {
    const inputName = nameInputRef.current!.value;
    const inputBreed = breedInputRef.current!.value;
    const inputBirthDate = birthDateInputRef.current!.value;

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: inputName,
        breed: inputBreed,
        birth: inputBirthDate,
      })
    };
    fetch(`/api/puppies/${puppy.id}`, requestOptions);
    window.location.reload()
  };

  return (
    <div className="updateForm">
      <input className="updateForm__input" type="text" placeholder="name" ref={nameInputRef} />
      <input className="updateForm__input" type="text" placeholder="breed" ref={breedInputRef} />
      <input className="updateForm__input" type="text" placeholder="birth date" ref={birthDateInputRef} />
      <button className="updateForm__button" type="submit" onClick={SubmitHandler}>
        Update
      </button>
    </div>
  );
};

export default UpdateForm;
