//Making Objects Using Constructor Function
function Cat(name,type){
    this.name=name;
    this.type=type;
}
const  outcat=new Cat("Tommas","Domestic");//object is formed 
console.log(outcat.name);//acessing object elements
console.log(outcat.type);

//Destructuring in JavaScript

var arr=[1,2,3];
[a,b,c]=arr;//variables are directly assigning to Values
console.log(a);
console.log(b);
console.log(c);

const [a1,b1]=[1,2,3,4,5];//values are assigned 
console.log(a1,b1);
//swapping
var x=10;
var y=20;
[a,b]=[b,a];
console.log(a,b)

//Ignoring Values
const arr2=[1,2,3,4,5];
const [m,,n]=arr2;//2 will be ignored
console.log(m,n)

//Object Destructuring
const myobject={
    name1:"Faisal_Iqbal",
    id:221370186
}
const {name1,id}=myobject;//values are assigned to that variables
console.log(name1 , id)

//Object Destructuring
const myobject2={
    name2:"John"
}
const {name2: firstname,age=30}=myobject2;//here values are asigned on runtime and name2 variable rename to firstname 
console.log(firstname,age);

//Nested Object Destructuring
const myobject3={
    fname:"Tom",
    id1:186,
    
    card:{
        gender:"Male",
        city:"Okara",
        Province:"Punjab"

    }
}
const {id1,card:{Province}}=myobject3//Nested Object destructuring
console.log(id1);
console.log(Province);

//Renaming Properties
const value={
    n1:"Saqib",
    r:200
}
const {n1:myname,r:rollno}=value;//names are changed 
console.log(myname);//we are acessing value through changed named variable
console.log(rollno);





