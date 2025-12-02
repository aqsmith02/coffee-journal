import React, { useState, useEffect } from 'react';

export default function Todos({ API_URL, refreshTrigger }) {
    const [todoList, setTodoList] = useState([]);

    async function fetchTodos() {
        const response = await fetch(`${API_URL}/todos`);
        const data = await response.json();
        setTodoList(data);
    }

    useEffect(() => {
        fetchTodos();
    }, [refreshTrigger]);

    async function deleteTodo(todoId) {
        await fetch(`${API_URL}/todos/${todoId}`, {
            method: 'DELETE',
        });
        fetchTodos();
    }

    return (
        <div className="todos-container">
            <ul>
                {todoList.map((todo) => (
                    <li key={todo.id}>
                        <div>
                            {todo.completed ? (
                                <span>Completed</span>
                            ) : (
                                <span>In Progress</span>
                            )}{' '}
                            {todo.title}
                            <br />
                            {todo.description}
                        </div>
                        <button onClick={() => deleteTodo(todo.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
