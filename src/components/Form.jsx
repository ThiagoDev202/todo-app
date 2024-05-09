// src/components/Form.client.jsx
function Form({ setTodos, todos }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const value = event.target.todo.value.trim();
        if (!value) return;

        const newTodo = {
          title: value,
          id: self.crypto.randomUUID(),
          is_completed: false,
        };

        setTodos([...todos, newTodo]);

        localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
        event.target.reset();
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input 
                type="text"
                name="todo"
                id="todo"
                placeholder="Write your next task"
            />
            <button type="submit">Add Todo</button>
        </form>
    );
}

export default Form;
