import React from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");

  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if(loadedTodos){
      setTodos(loadedTodos);
    }
  },[]);

  React.useEffect(() => {
    if (todos.length > 0){
      const json = JSON.stringify(todos);
      localStorage.setItem("todos", json);
    }
  }, [todos]);

  // Handle submit
  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };

    if (newTodo.text.length > 0) {
      setTodos([...todos].concat(newTodo));
      setTodo("");
    } else {
      alert("Enter Valid Task");
      setTodo("");
    }

  }

  // Handle deletes
  function handleDelete(id) {
    if (id) {
      let updatedTodos = [...todos].filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    }

  }

  // Toggle complete
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  // Handle Edits
  function handleEdit(id) {
    let todoToEdit = [...todos].filter((todo) => todo.id === id);
    console.log(todoToEdit[0].text);
    setEditingText(todoToEdit[0].text);
    setTodoEditing(id);
  }

  // Handle submitting edints
  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id && editingText.length > 0) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          align="right"
          placeholder="Add a new task..."
          required
        />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map((todo) =>
        <div className="todo" key={todo.id}>
          <input
            type="checkbox"
            id="completed"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
          />

          {todo.id === todoEditing ? (
            <input
              type="text"
              onChange={(e) => setEditingText(e.target.value)}
              value={editingText}
            />
          ) : (
            <div>{todo.text}</div>
          )}

          <div className="todo-actions">
            <button className="button__delete" onClick={() => handleDelete(todo.id)} value={todo.id} >x</button>
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>) : (
              <button onClick={() => handleEdit(todo.id)}>Edit</button>
            )}
          </div>
        </div>)
      }
    </div>
  );
};
export default App;
