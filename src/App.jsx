import { useState, useCallback, memo } from 'react';
import { initialTodos, createTodo } from './todos.js';

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []); 

  const handleShowActiveChange = useCallback((checked) => {
    setShowActive(checked);
  }, []); 

  return (
    <>
      <NewTodo onAdd={newTodo => setTodos([...todos, newTodo])} />
      <List
        todos={todos}
        showActive={showActive}
        onToggleTodo={toggleTodo}
        onShowActiveChange={handleShowActiveChange}
      />
    </>
  );
}

const List = memo(function List({ todos, showActive, onToggleTodo, onShowActiveChange }) {
  console.log("List rendered"); 

  const activeCount = todos.filter(t => !t.completed).length;
  const visibleTodos = showActive ? todos.filter(t => !t.completed) : todos;

  return (
    <section>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={e => onShowActiveChange(e.target.checked)}
        />
        Show only active todos
      </label>

      <ul>
        {visibleTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onToggle={onToggleTodo} />
        ))}
      </ul>

      <Footer count={activeCount} />
    </section>
  );
});

const TodoItem = memo(function TodoItem({ todo, onToggle }) {
  return (
    <li onClick={() => onToggle(todo.id)} style={{cursor: 'pointer'}}>
      {todo.completed ? <s>{todo.text}</s> : todo.text}
    </li>
  );
});

const Footer = memo(function Footer({ count }) {
  console.log("Footer rendered");
  return <footer>{count} todos left</footer>;
});

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
