import { useState } from 'react';
import { initialTodos, createTodo } from './todos.js';

export default function TodoList() {
  console.log('rendered');

  const [todos, setTodos] = useState(initialTodos);  
  const activeTodos = todos.filter(todo => !todo.completed);

  function toggleTodo(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  function addTodo(newTodo) {
    setTodos([...todos, newTodo])
  }

  return (
    <>    
      <NewTodo onAdd={addTodo} />
      <List todos={todos} activeTodos={activeTodos} onToggleTodo={toggleTodo} />
      <Footer count={activeTodos.length} />
    </>
  );
}

function List({ todos, activeTodos, onToggleTodo }) {
  console.log("render List");

  const [showActive, setShowActive] = useState(false);
  const showTodos = showActive ? activeTodos : todos;

  return (
      <section>
        <label>
          <input
            type="checkbox"
            checked={showActive}
            onChange={e => setShowActive(e.target.checked)}
          />
          Show only active todos
        </label>
        <ul>
          {showTodos.map(todo => (
            <li 
              key={todo.id}
              onClick={() => onToggleTodo(todo.id)}
            >
              {todo.completed ? <s>{todo.text}</s> : todo.text}
            </li>
          ))}
        </ul>
      </section>
    )
}

function Footer({ count }) {
  console.log("Render footer");
  return <footer>{count} todos left</footer>;
};


function NewTodo({ onAdd }) {
  console.log("Render NewTodo");
  const [text, setText] = useState('');

  function handleAddClick() {
    setText('');
    onAdd(createTodo(text));
  }

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAddClick}>
        Add
      </button>
    </>
  );
}
