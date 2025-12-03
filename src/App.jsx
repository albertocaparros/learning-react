import { useState } from 'react';
import { initialTodos, createTodo } from './todos.js';

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  console.log('rendered');

  function toggleTodo(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  return (
    <>    
      <NewTodo onAdd={newTodo => setTodos([...todos, newTodo])} />
      <List todos={todos} onToggleTodo={toggleTodo} />
    </>
  );
}

function List({ todos, onToggleTodo }) {
  console.log("render List");

  const [showActive, setShowActive] = useState(false);

  const activeTodos = () => todos.filter(todo => !todo.completed);
  const visibleTodos = showActive ? activeTodos() : todos;

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
          {visibleTodos.map(todo => (
            <li 
              key={todo.id}
              onClick={() => onToggleTodo(todo.id)}
            >
              {todo.completed ? <s>{todo.text}</s> : todo.text}
            </li>
          ))}
        </ul>
        <Footer count={activeTodos().length} />
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
