import React from 'react'

export default function Todo({todo, toggleTodo, deleteTodo}) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    function handleDelete() {
        deleteTodo(todo.id)
    }

    return (
        <div className="align-self-start d-flex border-bottom">
            <label>
                <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} className="mr-2"/>
                {todo.name}
            </label>
            <i className="fas fa-trash-alt text-dark ml-auto mt-1" onClick={handleDelete} data-index="`i`"></i>
        </div>
    )
}
