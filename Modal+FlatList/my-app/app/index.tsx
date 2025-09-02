import React from "react";
import { View } from "react-native";
import ProductList from './Componenets/ProductList';
export default function Index() {
  var details={
    name:"Faisal",
    age:20,
    gender:"Male"

  }
  var arr=[
    {
    name:"Saqib",
    age:21,
    gender:"Male"

    },{
    name:"Aryan",
    age:22,
    gender:"Male"
    },{
    name:"Shahid",
    age:23,
    gender:"Male"
    }
  ];
  var country=[
    {
    country_name:"Pakistan",
    capital:"Islamabad",
    description:"Hello! This is  very Interesting Country!! "

    },{
      country_name:"India",
      capital:"Bombay",
      description:"Hello! This is  very Chawal Country!! "
    },{
      country_name:"England",
      capital:"Europe",
      description:"This is my Country !! "
    }
  ];
  return (
    <View style={{flex:1}}>
      {/* <Text>Hi I am Faisal Iqbal</Text>
      <NewCompnenet name="Faisal Iqbal" />
      <NewComponent2 name={details.name} age={details.age} gender={details.gender}/>
      {
        arr.map((x,index)=>(
          <NewComponent3 name={x.name} age={x.age} gender={x.gender}/>
          ))
      } */}

      

      {/* <Login/> */}
      <ProductList/>
      
    </View>
  );
}
