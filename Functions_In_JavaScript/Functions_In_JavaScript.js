//exception handing
try {
    result=divide(10,0);
    console.log(result);
}catch(error){
    console.log(error.message);
}
function divide(a,b){
    if (b===0){
        throw new Error("Error:b cannot be zero!!");
    }
    return a/b;
}

            
      