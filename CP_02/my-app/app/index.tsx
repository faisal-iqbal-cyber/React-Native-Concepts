import { Text, View } from "react-native";
import DisplayDetails from './Components/DisplayDetails'
export default function Index() {
  const country=[
    {
      country_Name:"Pakistan",
      country_Capital:"Islamabad",
      country_Description:"This is very Beautiful Country!!",
    },
    {
      country_Name:"India",
      country_Capital:"Bombay",
      country_Description:"This is very very Chawal Country that i have ever seen!!!",

    },
    {
      country_Name:"England",
      country_Capital:"Maxico",
      country_Description:"This is Exellent Country!",

    }
  ]
  return (
    <View>
      {
        country.map((x,index)=>(
          <DisplayDetails name={x.country_Name} capital={x.country_Capital} description={x.country_Description}/>
        ))
      }
    </View>
  );
}
