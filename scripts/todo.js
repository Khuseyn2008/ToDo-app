const addBtn = document.querySelector('#add-btn');
const todoList = document.querySelector('#todo-list');
const emptyList = document.querySelector('#empty-list');
console.log(addBtn);

addBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    const taskInput = document.querySelector('#new-todo');
    // Получаем значение поля ввода названия задачи предварительно очистив его от пробелов
    const taskText = taskInput.value.trim();
    if (taskText.length === 0) {
        return;
    }

    const task = {
        id: crypto.randomUUID(),
        text: taskText,
        isCompleted: false,
    };

    todoList.insertAdjacentHTML(
        'beforeend',
        `
        <li id="${task.id}" class="flex items-center justify-between p-4 rounded-lg shadow ${
            task.isCompleted ? 'bg-slate-50' : 'bg-purple-50'
        }">
        <div class="flex items-center">
          <input type="checkbox" class="h-5 w-5 text-purple-500 focus:ring-purple-400 mr-3" ${
              task.isCompleted ? 'checked' : ''
          }>
          <span class="${task.isCompleted ? 'text-gray-500 line-through' : 'text-gray-800'}">${
            task.text + ' 1 kg'
        }</span>
        </div>
        <button data-action="delete" class="text-gray-400 hover:text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </li>
        `
    );
    taskInput.value = '';
    taskInput.focus();

    if (todoList.children.length > 0) {
        const emptyList = document.querySelector('#empty-list');
        emptyList.classList.add('hidden');
    }
});

todoList.addEventListener('click', (evt) => {
    if (evt.target.dataset.action !== 'delete') {
        return;
    }
    const parentLi = evt.target.closest('li');
    parentLi.remove();

    if (todoList.children.length === 0) {
        emptyList.classList.remove('hiddem')
    }
});

todoList.addEventListener('change', (evt) => {
    console.log('Change event: ');
    const parentLi = evt.target.closest('li');
    const taskText = parentLi.querySelector('span');
    if (evt.target.checked) {
        parentLi.classList.remove('bg-purple-50');
        parentLi.classList.add('bg-slate-50');
        taskText.classList.remove('text-gray-800');
        taskText.classList.add('text-gray-500', 'line-through');
    } else {
        parentLi.classList.remove('bg-slate-50');
        parentLi.classList.add('bg-purple-50');
        taskText.classList.remove('text-gray-500', 'line-through');
        taskText.classList.add('text-gray-800');
    }
});
