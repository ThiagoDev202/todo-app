// Ordered list
function TODOList({ todos, setTodos }) {
    return (
      <ol className="todo_list">
        {todos && todos.length > 0 ? (
          todos?.map((item, index) => (
            <Item key={index} item={item} todos={todos} setTodos={setTodos} />
          ))
        ) : (
          <p>Seems lonely in here, what are you up to?</p>
        )}
      </ol>
    );
  }

  export default TODOList;

function Item({ item, setTodos }) {
    const [editing, setEditing] = React.useState(false);
    const inputRef = React.useRef(null);
    const completeTodo = () => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === item.id ? { ...todo, is_completed: !todo.is_completed } : todo
            )
        );
        // Update localStorage after todo as completed
        const updatedTodos = JSON.stringify(todos);
        localStorage.setItem("todos", updatedTodos);
    };
    const handleEdit = () => {
        setEditing(true);
    };
    React.useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(
                inputRef.current.value.length,
                inputRef.current.value.lenght
            );
        }
    }, [editing]);
    const handleInputChange = (e) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === item.id ? { ...todo, title: e.target.value } : todo
          )
        );
    };
    const handleDelete = () => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));
        // Update localStorage after deleting todo
        const updatedTodos = JSON.stringify(
          todos.filter((todo) => todo.id !== item.id)
        );
        localStorage.setItem("todos", updatedTodos);
    };
    const handleInputSubmit = (event) => {
        event.preventDefault();
      
        // Update localStorage after editing todo
        const updatedTodos = JSON.stringify(todos);
        localStorage.setItem("todos", updatedTodos);
        setEditing(false);
      };     
    const handleInputBlur = () => {
        // Update localStorage after editing todo
        const updatedTodos = JSON.stringify(todos);
        localStorage.setItem("todos", updatedTodos);
      
        setEditing(false);
    };
    return (
        <li id={item?.id} className="todo_item">
            {editing ? (
                <form className="edit-form" onSubmit={handleInputSubmit}>
                    <label htmlFor="edit-todo">
                        <input
                            ref={inputRef}
                            type="text"
                            name="edit-todo"
                            id="edit-todo"
                            defaultValue={item?.title}
                            onBlur={handleInputBlur}
                            onChange={handleInputChange}
                        />
                    </label>
                </form>
        ) : (
        <>        
            <button className="todo_items_left" onClick={completeTodo}>
                <svg fill={item.is_completed ? "#22C55E" : "#0d0d0d"}>
                    <circle cx="11.998" cy="11.998" fillRule="nonzero" r="9.998"/>
                </svg>
                <p style={item.is_completed ? { textDecoration: "line-through" } : {}}>
                    {item?.title}
                </p>
            </button>
            <div className="todo_items_right">
                <button>
                    <span onClick={handleEdit}>Edit</span>
                    <svg>
                        <path d="" />
                    </svg>
                </button>
                <button onClick={handleDelete}>
                    <span className="visually-hidden">Delete</span>
                    <svg>
                        <path d="" />
                    </svg>
                </button>
            </div>
        </>
        )}
        </li>
    );
}

// export default TODOList; Item;
// export default TODOList;