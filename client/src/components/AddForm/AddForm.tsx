import React, { useRef} from "react";
import './AddForm.css'


const AddForm = () => {
  let nameInputRef = useRef<HTMLInputElement>(null);
  let breedInputRef = useRef<HTMLInputElement>(null);
  let birthDateInputRef = useRef<HTMLInputElement>(null);
  let urlInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = () => {
    const inputName = nameInputRef.current!.value;
    const inputBreed = breedInputRef.current!.value;
    const inputBirthDate = birthDateInputRef.current!.value;
    const inputUrl = urlInputRef.current!.value;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: inputName,
        breed: inputBreed,
        birth: inputBirthDate,
        url: inputUrl,
      })
    };
    fetch(`/api/puppies`, requestOptions);
    window.location.reload()
  };

  return (
    <div>
      <input className="add__input" type="text" placeholder="name" ref={nameInputRef} />
      <input className="add__input" type="text" placeholder="breed" ref={breedInputRef} />
      <input className="add__input" type="text" placeholder="birth date" ref={birthDateInputRef} />
      <input className="add__input" type="text" placeholder="url" ref={urlInputRef} />
      <button type="submit" onClick={submitHandler}>Add Puppy</button>
    </div>
  );
};

export default AddForm;
