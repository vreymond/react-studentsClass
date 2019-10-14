import React, { useState } from "react";

import Button from '../../UI/Button/Button';
import "./EditStudent.css";

const EditStudent = props => {
  const [ student, setStudent ] = useState(props.studentToChange)

  // Affection des classes css en fonctions de l'état de la transition react
  const cssClasses = [
    "EditStudent",
    props.show === "entering"
      ? "EditOpen" 
      : props.show === "exiting" ? "EditClosed" : null
  ];

  // Affectation des champs a chaque champs à modifier de l'élève
  const inputChangeHandler = event => {
    let { name, value } = event.target;
    if (event.target.type === "file") {
      // Créé une url avec le fichier passé
      value = URL.createObjectURL(event.target.files[0]);
    }
    setStudent({...student, [name]: value});
  }

  // Une fois le formulaire soumis, on renvoie l'élève modifié
  const submitHandler = event => {
    event.preventDefault();
    props.closed(student.id, student)
  };

  return (
    <div className={cssClasses.join(' ')} id="remove">
      <h2 className="Title">Edit Student</h2>
      <form onSubmit={submitHandler}>
        <label className="Title Text">
          Update First name :
          <br/>
          <input className="Input" type="text" name="firstname" value={student.firstname} placeholder={student.firstname} onChange={inputChangeHandler} />
        </label>
        <label className="Title Text">
          Update Last name :
          <br/>
          <input className="Input" type="text" name="lastname" value={student.lastname} placeholder={student.lastname} onChange={inputChangeHandler} />
        </label>
        <label className="Title Text">
          Update Age :
          <br/>
          <input className="Input" type="text" name="age" value={student.age} placeholder={student.age} onChange={inputChangeHandler} />
        </label>
        <label className="Title Text">
          Update profile picture:
          <br/>
          <input 
            className="Input" 
            type="file"
            name="image"
            accept="image/png, image/jpeg" onChange={inputChangeHandler}></input>
        </label>
        <br/>
        <Button clicked={() => props.setDisplayEditBox(false)} btnType="Cancel" noSubmit="true">CANCEL</Button>
        <Button clicked={props.closed} btnType="Success">EDIT</Button>
      </form>
      
    </div>
  );
};

export default EditStudent;