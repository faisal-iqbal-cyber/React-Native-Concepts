import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Products from './components/Products'

function App() {

  const obj = {
    title: "Computer",
    price : "25000",
    description : "Computing device"
  }
  const obj1 = [
    {
      title: "Computer",
      price : "2000",
      description : "Computing device"
    },
    {
      title: "Mouse",
      price : "12000",
      description : "Computing device"
    },
    {
      title: "Computer",
      price : "25000",
      description : "Computing device"
    }
  ]
  return (
    <div>
      <h2>Products app</h2>

      <Products title={obj.title} price={obj.price} description={obj.description}/>
      <Products title="Keyboard" price="2000" description="Computing Device"/>

    {
      obj1.map((x,index)=>(
        <Products title={x.title} price={x.price} description={x.description}/>
      ))
    }

    </div> 
 
  )
}

export default App
