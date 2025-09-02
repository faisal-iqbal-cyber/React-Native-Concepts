    //FAISAL IQBAL    221370186

function assignGrade(number) {
    console.log("Marks: ",number);
    switch(true){
        case(number<50):
            console.log("You have Got F Grade")
            break;
        case(number<60 && number>50):
            console.log("You have Got D Grade")
            break;
        case(number<70 && number>60):
            console.log("You have Got C Grade")
            break;
        case(number<80 && number>70):
            console.log("You have Got B Grade")
            break;
        case(number<90 && number>80):
            console.log("You have Got A Grade")
            break;
        default:
            console.log("You didn't get any Grade!!")
            break;

    }


}


assignGrade(100);