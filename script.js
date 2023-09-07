window.addEventListener('load',()=>{
    const addForm = document.querySelector(".add-form")
    const addInput = document.querySelector(".add-input")
    const imgBtn = document.querySelector("img")

    const main = document.querySelector("main")
    const section = document.querySelector("section")
    const nav = document.querySelector("nav")
    const mainText = document.getElementById('footer-text')

    const id = 0;
    const tasks = []

    
    const addTask = (id,title, status = "")=>{
    
        id = tasks.length
        

        const task ={
            id:id,
            title:title,
            status:"pendente"
        }
        
    

        tasks.push(task)
        addInput.value = ""

        loadTasks()
    }

    const createElement = (tag, innerText = "",innerHtml = "") =>{
        const element = document.createElement(tag)
        if(innerText){
            element.innerText = innerText
        }
        if(innerHtml){
            element.innerHTML = innerHtml
        }
        return element
    }

    const createRow = (task)=>{
        const {id,title,status} = task
        
        const li = createElement("li")
        

        const checkbox = createElement("input")
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add('checkbox-btn')

        const inputTask = createElement("span")
        inputTask.innerText = title
        inputTask.style.textTransform = "capitalize"


        checkbox.addEventListener("change",({target})=>{
            if(target.checked == false){
                task.status = "pendente"
                inputTask.classList.remove("title")
            }
            if(target.checked == true){
                task.status = "concluido"
                inputTask.classList.add("title")
            }
            loadTasks()
        })

        const remove = createElement("img")
        remove.src="./images/icon-cross.svg"
        remove.classList.add("remove")

        remove.addEventListener("click",()=>{
            let indexTask = tasks.at(id);
            tasks.splice(indexTask,1)
            loadTasks()
        })

        li.addEventListener("mouseover",()=>{
            li.appendChild(remove)
        })
        

        li.appendChild(checkbox)
        li.appendChild(inputTask)
        

        return li
    
    } 
    const loadTasks = ()=>{
        section.innerHTML =""
        tasks.forEach((task)=>{
            const li = createRow(task)
            section.appendChild(li)
            const checkbox = li.querySelector("input")
            if(task.status =="concluido"){
                checkbox.checked = true
                const inputTask = li.querySelector("span")
                inputTask.classList.add("title")
            }
        })
        loadFooter()
    }
    const loadFooter = ()=>{
        const div = document.querySelector('div')
        const x = window.matchMedia("(max-width: 500px)")

        const footer = createElement("footer","" ,"")
        const itemsLeft = createElement("span")

        itemsLeft.classList.add("item-left")
        itemsLeft.innerHTML = `${tasks.length} items left`

        section.appendChild(footer)
        footer.appendChild(itemsLeft)

        const actions = createElement("nav","",`<button class="btn-all">All</button>
            <button class="btn-active">Active</button>
            <button class="btn-completed">Completed</button>`)

        const btnclear = createElement("button","","Clear Completed")
        btnclear.classList.add("clear-btn")
    

        if(x.matches){
            div.innerHTML = ""
            actions.classList.add('nav-mobile')
            footer.appendChild(btnclear)
            div.appendChild(actions)
            
        }
        if(x.matches == false){
           footer.appendChild(actions)
           footer.appendChild(btnclear)
           
    
           
        }

        const btnClear = document.querySelector(".clear-btn")
        const btnAll = document.querySelector(".btn-all")
        const btnActive = document.querySelector(".btn-active")
        const btnCompleted = document.querySelector(".btn-completed")
        
        btnClear.addEventListener('click',()=>{
             while(tasks.length > 0) {
                 tasks.pop();
             }
             addInput.value =""
             loadTasks()  
         })
    
        btnAll.addEventListener('click',()=>{
             loadTasks()
        })
    
        btnActive.addEventListener('click',()=>{
             section.innerHTML =""
             tasks.forEach((task)=>{
             if(task.status =="pendente"){
                     const li = createRow(task)
                     section.appendChild(li)
                     const checkbox = li.querySelector("input")
                     checkbox.checked = false
                 }
             })
             section.appendChild(footer)
             itemsLeft.textContent = `${tasks.filter(task=>task.status == "pendente").length} items left`
         })
    
        btnCompleted.addEventListener('click',()=>{
             section.innerHTML =""
             tasks.forEach((task)=>{
                 if(task.status =="concluido"){
                     const li = createRow(task)
                     section.appendChild(li)
                     const checkbox = li.querySelector("input")
                     checkbox.checked = true
                     const inputTask = li.querySelector("span")
                     inputTask.classList.add("title")
                 }
             })
             section.appendChild(footer)
             itemsLeft.textContent = `${tasks.filter(task=>task.status == "concluido").length} items left`
         })

     return footer
    }

    addForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        const title = addInput.value
        if(title ==""){
            alert("prenche o bagulho jao")
            next()
        }
        addTask(id,title)
    })
    
    imgBtn.addEventListener('click',()=>{
        document.body.classList.toggle("lightmodebackground")
        addForm.classList.toggle("lightmode")
        section.classList.toggle("lightmode")
        imgBtn.classList.toggle("sun") 
        if(body.classList == "lightmodebackground"){
            document.querySelector("footer").classList.toggle("lightmode")
            document.querySelector("nav").classList.toggle("lightmode")
        }
        else{
            document.querySelector("footer").classList.toggle("darkmode")
            document.querySelector("nav").classList.toggle("darkmode") 
        }
    })
    

    
    loadTasks() 
    

})
