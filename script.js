const task_content = document.getElementById('content')
const task_input = document.getElementById('input-task')

let id = 0;
let tasks = []

const getdbTasks = () => JSON.parse(localStorage.getItem('tasks')) ?? [];

const setdbTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const newTask = () => {
    if (task_input.value == '' || task_input.value === null || task_input.value === undefined) return;
    id++;
    const db = getdbTasks();
    db.push({
        id: id,
        title: task_input.value,
        checked: false
    })
    setdbTasks(db)
    showTasks();
}

const removeTask = (id) => {

    const db = getdbTasks();
    db = tasks.filter((el) => {
        return el.id != id
    })
    setdbTasks(db);
    showTasks();
}
const showTasks = () => {
    task_content.innerHTML = ""

    const db = getdbTasks();

    db.map((t, i) => {
        task_content.innerHTML +=
            `
        <div class="task">
            <header>
                <div class="title">
                    <input class="checkbox" data-id="${t.id}" type="checkbox" ${t.checked ? 'checked' : ''}/>
                    <h3 style="${t.checked ? "text-decoration: line-through 5px lightgray;" : ''}">${t.title}</h3>
                </div>
                <div class="close-btn" data-id="${t.id}">✖</div>
            </header>
        </div>`
    })
}
const clickTask = (e) => {
    const el = e.target;
    if (el.classList.contains('checkbox')) {
        const db = getdbTasks();
        db.forEach(element => {
            if (element.id == el.getAttribute('data-id')) {
                element.checked = !element.checked;
                console.log(element)
                setdbTasks(db)
                showTasks();
            }
        });
    }
    if (el.classList.contains('close-btn')) {
        const id = el.getAttribute('data-id');
        removeTask(id)
    }
}
task_content.addEventListener('click', clickTask);
task_input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') newTask();
})
showTasks();