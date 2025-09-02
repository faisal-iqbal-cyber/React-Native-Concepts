function createTask(){
    const Name=document.getElementById('name');
    const Id=document.getElementById('id');
    const Gender=document.querySelector('input[name="gender"]:checked')

const taskObject={
    name:Name.value,
    id:Id.value,
    gender:Gender.checked ? Gender.value : "Not Selected"

}
const taskContainer=document.getElementById('tasks');
const taskDiv=document.createElement('div');
taskDiv.className="task";

const n=document.createElement('h1');
n.textContent='Name :'+taskObject.name;
taskDiv.append(n)

const i=document.createElement('h3');
i.textContent='ID :'+taskObject.id;
taskDiv.append(i)

const g=document.createElement('h4');
g.textContent='Gender'+taskObject.gender;
taskDiv.append(g)

const button=document.createElement('button');
button.textContent="Mark as Complete";
button.addEventListener('click',()=>{
    taskDiv.remove();
})
taskDiv.append(button);
taskContainer.append(taskDiv);

Name.value="";
Id.value="";
Gender.checked =false

}
