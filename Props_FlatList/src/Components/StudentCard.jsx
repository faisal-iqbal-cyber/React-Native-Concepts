import React from 'react';
import './StudentCardStyling.css';

function StudentCard(props) {
  return (
    <div className=" div3 card text-white  mb-4 mx-auto student-card">
      <div className="card-body text-center">
        <b><p className="card-text" style={{color :'white'}}>The Student Name is: {props.name}</p>
         <b></b><p className="card-text" style={{color :'white'}}>The Student RollNo. is: {props.rollno}</p>
         <b></b><p className="card-text" style={{color :'white'}}>The Student Grade is: {props.grade}</p></b>
      </div>
    </div>
  );
}

export default StudentCard;