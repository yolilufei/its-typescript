


function add():void {
    debugger;
    const name: HTMLInputElement = document.querySelector('.name');
    const content: HTMLInputElement = document.querySelector('.content');
    const item = {
        name: name.value,
        content: content.value
    };
    addTodoItem(item);
}

/**
 * @description 添加待办项到列表
 * @param item 
 * todo 原生js，使用 documentFragment
 */
function addTodoItem(item: Todo.TodoItem): void {
    const list = document.querySelector('.todo-list--tbody');
    const trNode = createElement('tr');
    const tdNameNode = createElement('td');
    tdNameNode.innerText = item.name;
    const tdConNode = createElement('td');
    tdConNode.innerText = item.content;
    // 新增删除列
    const fragment = document.createDocumentFragment();
    const tdRemoveNode = createElement('td');
    const removeNode = createElement('button');
    removeNode.classList.add('todo_list-remove_btn');
    removeNode.innerText = '删除';
    removeNode.addEventListener('click', removeItem);
    tdRemoveNode.appendChild(removeNode);
    fragment.appendChild(tdRemoveNode);
    trNode.appendChild(tdNameNode);
    trNode.appendChild(tdConNode);
    trNode.appendChild(tdRemoveNode);
    list.appendChild(trNode);
}

/**
 * @description 封装创建 html 元素方法
 * @param element 
 * todo 理解 Node、Element、HTMLElement 三者之间的关系
 */
function createElement(element: string): HTMLElement {
    return document.createElement(element);
}

/**
 * @description 删除待办项
 * @param event 
 */
function removeItem(event: Event): void {

}