import React from 'react';
import StudentCard from './StudentCard';
import './StudentListStyling.css';

function StudentList(props) {
  return (
    <div className="container my-5">
      <h1 style={{color:'white'}}className="list text-center mb-4">Student List:</h1>
      <div className=" row justify-content-center">
        {props.array.map((x, index) => (
          <div className="col-md-6 col-lg-4 d-flex justify-content-center"  key={index}>
            <StudentCard name={x.name} rollno={x.rollno} grade={x.grade} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentList;