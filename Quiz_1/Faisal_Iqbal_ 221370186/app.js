function CreateTask(){
    const textInput=document.getElementById('text');
    taskObject={
        text:textInput.value
    }

    const taskContainer = document.querySelector('.tasks');

    const taskDiv=document.createElement('div');
    taskDiv.className="tasks";

    const text=document.createElement('p');
    text.textContent=taskObject.text;
    taskDiv.appendChild(text);

    const button=document.createElement('button');
    button.textContent="Mark as Completed";
    taskDiv.addEventListener("click",()=>{
        taskDiv.remove();
    });

    taskDiv.appendChild(button);
    taskContainer.appendChild(taskDiv);

    textInput="";



}