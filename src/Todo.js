import React from 'react'

export default function Todo({todo, toggleTodo}) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }
    return (
        <div className="align-self-start">
            <label>
                <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} className="mr-2"/>
                {todo.name}
            </label>
        </div>
    )
}
