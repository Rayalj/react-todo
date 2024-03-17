import TodoListItem from './TodoListItem';
const todoList = [
    { id: 1, title: 'Complete assignment 1.1' },
    { id: 2, title: 'Complete assignment 1.2' },
    { id: 3, title: 'Complete assignment 1.3' },
  ];
 
function TodoList(){
 return(
  <div>
    <ul>
     {todoList.map(todo => (
       <TodoListItem key={todo.id} title={todo.title}/>
      ))}
    </ul>
  </div>
 );
}

export default TodoList;