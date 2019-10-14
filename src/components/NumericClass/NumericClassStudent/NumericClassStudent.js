import React from 'react';


import Button from '../../UI/Button/Button';
import './NumericClassStudent.css';

const NumericClassStudent = props => {
  return ( 
    <div className="Card">
      <img className="Img" src={props.student.image} alt={props.student.firstname}/>
      <p>{props.student.firstname} {props.student.lastname}</p>
      <p className="Age">{props.student.age} years old</p>
      <Button clicked={props.delete} btnType="Cancel">DELETE</Button>
      <Button clicked={props.edit} btnType="Success">EDIT</Button>
    </div>
  );
}

export default NumericClassStudent;