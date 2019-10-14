import React, { Fragment, useState, useEffect } from 'react';
import Transition from "react-transition-group/Transition";
import uuid from 'uuid/v4';

import Button from '../UI/Button/Button';
import NumericClassStudent from './NumericClassStudent/NumericClassStudent';
import AddStudent from './AddStudent/AddStudent';
import EditStudent from './EditStudent/EditStudent';
import Backdrop from './Backdrop/Backdrop';
import Spinner from '../UI/Spinner/Spinner';
import axios from '../../axios';
import './NumericClass.css';

// State initial pour l'élève à modifier
const NumericClass = props => {
  const initialStudentToChange = {
    id: null,
    firstname: '',
    lastname: '',
    age: null,
    image: ''
  }
  const [displayStudents, setDisplayStudents] = useState(false);
  const [displayAddBox, setDisplayAddBox] = useState(false);
  const [studentsClass, setStudentsClass] = useState(null);
  const [displayEditBox, setDisplayEditBox] = useState(false);
  const [studentToChange, setStudentToChange] = useState(initialStudentToChange);
  const [error, setError] = useState(false);
  
  // Fonction de requête de type GET pour récupérer les données de la base (firebase)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/students.json');
        setStudentsClass(Object.values(response.data));
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, []);
 
  // Switch pour l'affichage des élèves
  const displayStudentsHandler = () => {
    if (displayStudents) {
      setDisplayStudents(false);
    } else {
      setDisplayStudents(true);
    }
  }

  // Ajout d'un id unique (uuid) à l'étudiant, puis ajout à la classe
  const newStudentHandler = student => {
    student.id = uuid();
    setStudentsClass([...studentsClass, student]);
  }

  // Suppression d'un élève par id
  const deleteStudentHandler = id => {
    setStudentsClass(
      studentsClass.filter(student => student.id !== id)
    );
  };
  
  // Récupération des informations de l'élève à modifier
  const editStudentHandler = student => {
    setDisplayEditBox(true);
    setStudentToChange({
     id: student.id, 
     firstname: student.firstname, 
     lastname: student.lastname, 
     age: student.age, 
     image: student.image
    })
  }

  // Update de l'élève par id 
  const updateStudent = (id, updatedStudent) => {
    setDisplayEditBox(false);
    setStudentsClass(studentsClass.map(student => (student.id === id ? updatedStudent : student)))
  }

  // Si error lors de la connection avec la base de données, affichage d'un message d'erreur, sinon affichage du loader
  let loadClass = error ? <p>Students class can't be loaded</p> : <Spinner />;

  // Affichage des composants uniquement si les données des 5 élèves sont présentes
  if (studentsClass) {
    loadClass = (
      <Fragment>
        <Button clicked={displayStudentsHandler} className="Display">Display Students</Button>
        {/* Les transitions css ont une limitation: elles ne permettent pas de supprimer les divs créés du DOM,
          Par conséquent pour les animations choisis (drop) les boites "Add" et "Edit" ne disparaissaient
          pas, et empéchaient l'utilisation des boutons "display student" et "add student", d'où l'utilisation 
          des transitions react qui le permettent. */}
        <Transition mountOnEnter unmountOnExit in={displayAddBox} timeout={300}>
          {displayAddBox => (
            <AddStudent show={displayAddBox} closed={() => setDisplayAddBox(false)} newStudent={newStudentHandler} />
          )}
        </Transition>
        {/* Composant pour masquer l'arrière plan quand la box "Add" s'affiche */}
        <Backdrop show={displayAddBox} />
        <br/>
        <Button clicked={() => setDisplayAddBox(true)} className="Add">Add Student</Button>
        <section className="Student">
        {displayStudents ? (
          studentsClass.map(student => (
            // Création d'une carte d'élève pour chaque élément de la liste studentsClass
            <NumericClassStudent 
              key={uuid()} 
              student = {student}  
              delete={() => deleteStudentHandler(student.id)} 
              edit={() => editStudentHandler(student)}/>
          ))
        ) : null}
        </section>
        {/* Choix des transitions react identique a "Add" */}
        <Transition mountOnEnter unmountOnExit in={displayEditBox} timeout={300}>
          {displayEditBox => (
            <EditStudent 
              show={displayEditBox} 
              setDisplayEditBox={setDisplayEditBox} 
              studentToChange={studentToChange} 
              closed={updateStudent} />
          )}
        </Transition>
        {/* Composant pour masquer l'arrière plan quand la box "Edit" s'affiche */}
        <Backdrop show={displayEditBox} />
      </Fragment>
    )
  }

  return (
    <div>
      {loadClass}
    </div>
  );
};

export default NumericClass;