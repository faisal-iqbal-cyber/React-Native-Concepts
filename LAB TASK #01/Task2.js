//FAISAL IQBAL 221370186
let num1 = 50;
let num2 = 20;

function idea(num1,num2){
    try {
        if (num1 < num2) {
            console.log("The Num2 is greater than Num1");
        } else {
            throw new Error("Custom Error !! Num2 is Less than Num1");
        }
    } catch (error) {
        console.log(error.message);
    }

}
idea(num1,num2);

