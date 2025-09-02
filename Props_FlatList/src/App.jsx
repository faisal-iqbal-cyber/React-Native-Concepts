import { useState } from 'react';
import './App.css';
import React from 'react';
import StudentCard from './Components/StudentCard';
import StudentList from './Components/StudentList';
import card from './Components/card.png';

function App() {
  const array = [
    {
      name: 'Aryan',
      rollno: '221370208',
      grade: 'A'
    },
    {
      name: 'Saqib',
      rollno: '221370198',
      grade: 'B+'
    },
    {
      name: 'Danish',
      rollno: '221370200',
      grade: 'B-'
    },
    {
      name: 'Shahid',
      rollno: '221370103',
      grade: 'C+'
    }
  ];

  return (
    <div className="container my-5">
      <h1 style={{ color: 'white' }}>Student Card:</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            backgroundImage: `url(${card})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '350px',
            width: '600px',
            border: '1px solid black',
            borderRadius: '10px',
            color: '#2E52A6'
          }}
        >
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <b>
            <p style={{ marginLeft: '90px', marginTop: '15px' }}>Name : Faisal Iqbal</p>
          </b>
          <b>
            <p style={{ marginLeft: '90px' }}>RollNo : 221370186</p>
          </b>
          <b>
            <p style={{ marginLeft: '90px' }}>Grade : A+</p>
          </b>
        </div>
      </div>
          {/* Array of Object is passing as Props */}
      <StudentList array={array} />

      <h1 style={{color:'white'}} className="text-center  mt-5 mb-3">Student Detail:</h1>
      <div className="d-flex justify-content-center">


        {/* Static Value Passing as Props */}
        <StudentCard name="Faisal" rollno="221370186" grade="A+" />
      </div>
    </div>
  );
}

export default App;
