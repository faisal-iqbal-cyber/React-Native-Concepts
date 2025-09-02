// console.log("Hello world");
// var(Function Scope)
// function test(){
//     var x=5;
//     if(true){
//         var y=10;
//         console.log(x,y);
//     }
//     console.log(x,y);
// }//let concept (Block scope)
function test1(){
    let x=5;
    if(true){
        let y=10;
        console.log(x,y);
    }
    console.log(x,y);
}

// test();
test1();

// //switch cases
// var readline=require("readline");
// var rl=readline.createInterface({
//     input:process.stdin,
//     output:process.stdout
// });
// rl.question("Enter Any Day : ", function(day){
    
//    switch(day){
//     case "Monday":
//         console.log("Today is Monday!");
//         break;
//     case "Tuesday":
//         console.log("Today is Tuesday!");
//         break;
//     case "Wednesday":
//         console.log("Today is Wednesday!");
//         break;
//     default:
//         console.log("Neither day is today!!");
//         break;
    
// }
// })
