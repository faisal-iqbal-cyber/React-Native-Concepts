function createTasks() {
    const Item=document.getElementById('item')
    const Description=document.getElementById('description')
    const Price=document.getElementById('price')
    const Category=document.getElementById('category')
    const terms=document.getElementById('terms')
    const MartialStatus=document.querySelector('input[name="martialStatus"]:checked')

    const taskObject={
        item:Item.value,
        description:Description.value,
        price:Price.value,
        category:Category.value,
        term:terms.checked ? "Acceptd":"Not Accepted",
        martialStatus:MartialStatus ? MartialStatus.value:"Not Selected"
    
    }
    const taskContainer=document.getElementById('tasks')
    const taskDiv=document.createElement('div')
    taskDiv.className="task"

    const items=document.createElement('h2');
    items.textContent="Title:"+taskObject.item;
    taskDiv.append(items);

    const descriptions=document.createElement('p')
    descriptions.textContent="Description:"+taskObject.description
    taskDiv.append(descriptions)

    const prices=document.createElement('p')
    prices.textContent="Price"+taskObject.price
    taskDiv.append(prices)

    const categorys=document.createElement('p')
    categorys.textContent="Category:"+taskObject.category
    taskDiv.append(categorys)

    const termss=document.createElement('p')
    termss.textContent="Terms:"+taskObject.term
    taskDiv.append(termss)

    const mariage=document.createElement('p')
    mariage.textContent="Marriage:"+taskObject.martialStatus
    taskDiv.append(mariage)

    const button=document.createElement('button')
    button.textContent="Mark as Complete"
    button.addEventListener('click',()=>{
        taskDiv.remove()
    })
    taskDiv.append(button)
    taskContainer.append(taskDiv)

    Item.value="",
    Description.value="",
    Price.value="",
    Category.value="",
    terms.checked=false,
    MartialStatus ? MartialStatus.value:false


    


    
    
}
