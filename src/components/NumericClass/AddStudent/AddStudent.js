import React, { useState } from "react";

import Button from '../../UI/Button/Button';
import "./AddStudent.css";

const AddStudent = props => {
 
  const initialStudentState= { 
    id: '',
    firstname: '',
    lastname: '',
    age: '',
    image: ''
  }
  const [ newStudent, setNewStudent ] = useState(initialStudentState);

   // Affection des classes css en fonctions de l'état de la transition react
  const cssClasses = [
    "AddStudent",
    props.show === "entering"
      ? "AddOpen" 
      : props.show === "exiting" ? "AddClosed" : null
  ];

  // Affectation des champs a chaque champs à modifier de l'élève
  const inputChangeHandler = event => {
    let { name, value } = event.target;
    if (event.target.type === "file") {
      // Créé une url avec le fichier passé
      value = URL.createObjectURL(event.target.files[0])
    }
    setNewStudent({...newStudent, [name]: value})
  }

  // Une fois le formulaire soumis, on envoie les informations de l'élève a ajouter
  const submitHandler = event => {
    event.preventDefault();
    props.newStudent(newStudent);  
    setNewStudent(initialStudentState);
  };

  return (
    <div className={cssClasses.join(' ')} id="remove">
      <h2 className="Title">Add New Student</h2>
      <form onSubmit={submitHandler}>
        <label className="Title Text">
          First name :
          <br/>
          <input className="Input" type="text" name="firstname" value={newStudent.firstname} onChange={inputChangeHandler} />
        </label>
        <label className="Title Text">
          Last name :
          <br/>
          <input className="Input" type="text" name="lastname" value={newStudent.lastname} onChange={inputChangeHandler} />
        </label>
        <label className="Title Text">
          Age :
          <br/>
          <input className="Input" type="text" name="age" value={newStudent.age} onChange={inputChangeHandler} />
        </label>
        <label className="Title Text">
          Student picture :
          <br/>
          <input className="Input"
          type="file"
            name="image"
            accept="image/png, image/jpeg" onChange={inputChangeHandler}></input>
        </label>
        <br/>
        <Button clicked={props.closed} btnType="Cancel" noSubmit="true">CANCEL</Button>
        <Button type="submit" clicked={props.closed} btnType="Success">ADD</Button>
      </form>
    </div>
  );
};

export default AddStudent;