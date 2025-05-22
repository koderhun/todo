import React, { useState, useEffect, useCallback } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [inputText, setInputText] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() === '') {
      alert('Пожалуйста, введите задачу!');
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: inputText,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputText('');
  }, [inputText, setTodos, setInputText]);

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Список задач</h1>
        
        <form onSubmit={addTodo} className="flex mb-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Введите задачу..."
            className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-r-md hover:bg-green-600"
          >
            Добавить
          </button>
        </form>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-2 border rounded-md"
            >
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="mr-2"
                />
                <span
                  className={`${todo.completed ? 'line-through text-gray-500' : ''}`}
                >
                  {todo.text}
                </span>
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;