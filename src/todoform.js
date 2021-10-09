import { useState } from "react";

function ToDoForm({ addTask }) {
  const [userInput, setUserInput] = useState("");

  const handlerSubmit = (e) => {
    e.preventDefault();
    addTask(userInput);
    setUserInput("");
  };

  const handlerChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const handlerKeyPress = (e) => {
    if (e.key == "Enter") {
      handlerSubmit(e);
    }
  };

  return (
    <form onSubmit={handlerSubmit}>
      <input
        value={userInput}
        type="text"
        onChange={handlerChange}
        onKeyDown={handlerKeyPress}
        placeholder="Введите задачу"
      />
      <button>Сохранить</button>
    </form>
  );
}

export default ToDoForm;
