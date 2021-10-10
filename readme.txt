
1) Добавить styles.css https://github.com/VladKalachev/lesson-todos-react

2) Удаляем все, кроме главного компонента

export default function App() {
  return (
    <div className="App">
      <h1>Todo React</h1>
    </div>
  );
}

3) Создаем файл todo.js (для компонента "список задач")

function ToDo() {
  return null;
}

export default ToDo;

4) Создаем файл todoform.js (для компонента "добавление задачи")

function ToDoForm() {
  return null;
}

export default ToDoForm;

5) Подключим компоненты в основной файл + подключим состояние + пропишем внутри программы переменные и функции

import "./styles.css";

import { useState } from 'react'
import ToDo from './todo'
import ToDoForm from './todoform'

export default function App() {

  // Определяем состояние: todos=имя, setTodos=функция изменения, []=пустой массив
  const [todos, setTodos] = useState([])

  // дальше...

  return (
    <div className="App">
      <h1>Todo React</h1>
    </div>
  );
}

6) Определим три функции:
	а) добавление задач
	б) удаление задач
	в) переключение сделана/не сделана

  // добавление задачи
  const addTask = () => {

  }

  // удаление задачи
  const removeTask = () => {

  }

  // переключение задачи
  const handleToggle = () => {

  } 	

7) Добавим базовую разметку приложения

  return (
    <div className="App">
      <h1>Todo React</h1>
      <header>
        <h2>Список задач: {todos.length}</h2>
      </header>
      <ToDoForm />
      {todos.map((todo) => {
        return <Todo key={todo.id} />;
      })}
    </div>
  );

8) Добавим функции в компоненты
	а) в ToDoForm надо передать в нее addTask
	б) в ToDo надо передать todo, toggleTask, removeTask

  return (
    <div className="App">
      <h1>Todo React</h1>
      <header>
        <h2>Список задач: {todos.length}</h2>
      </header>
      <ToDoForm addTask={addTask} />
      {todos.map((todo) => {
        return (
          <ToDo
            todo={todo}
            toggleTask={handleToggle}
            removeTask={removeTask}
            key={todo.id}
          />
        );
      })}
    </div>

9) Наполним кодом компоненты, сначала ToDoForm: импортируем туда useState и определяем состояние

import { useState } from "react";

function ToDoForm() {
  // Определяем состояние: userInput=имя, setUserInput=функция изменения, ""=начальное значение
  const [userInput, setUserInput] = useState("");
  // дальше...
  return null; // дальше...
}

export default ToDoForm;

10) добавляем в ToDoForm разметку

import { useState } from "react";

function ToDoForm() {
  // Определяем состояние: userInput=имя, setUserInput=функция изменения, ""=начальное значение
  const [userInput, setUserInput] = useState("");

  // Определение функции-обработчика работы формы
  const handlerSubmit = () => {};

  // Определение функции-обработчика изменения
  const handlerChange = () => {};

  // Определение функции-обработчика нажатия
  const handlerKeyPress = () => {};

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

11) напишем логику для добавления нового значения в список задач
	а) для функции handlerChange
	б) если значение будет меняться, то...
	в) будем брать изменения и отправлять их в state
	г) отправление идет через функцию setUserInput

import { useState } from "react";

function ToDoForm({ addTask }) {
  // Определяем состояние: userInput=имя, setUserInput=функция изменения, ""=начальное значение
  const [userInput, setUserInput] = useState("");

  // Определение функции-обработчика работы формы
  const handlerSubmit = (e) => {
    e.preventDefault()
    addTask(userInput)
  };

  // Определение функции-обработчика изменения
  const handlerChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  // Определение функции-обработчика нажатия
  const handlerKeyPress = () => {};

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

12) в файле App.js допишем код addTask
	а) в функцию addTask приходит параметр userInput
	б) проверяем, что он не пустой
	в) создаем новый элемент списка

  // добавление задачи
  const addTask = (userInput) => {
    if (userInput) {
      const newItem = {
        id: Math.random().toString(36).substr(2, 9),
        task: userInput,
        complete: false
      };
      setTodos([...todos, newItem]);
    }
  };

13) сделаем так, чтобы после отправки значения текстовое окошко очищалось
	а) перейдем на файл todoform.js
	б) подправим функцию handlerSubmit

  // Определение функции-обработчика работы формы
  const handlerSubmit = (e) => {
    e.preventDefault();
    addTask(userInput);
    setUserInput("");
  };

14) сделаем так, чтобы нажатие клавиши Enter добавляло новую задачу, то есть вызывалась функция handlerSubmit

  // Определение функции-обработчика нажатия
  const handlerKeyPress = (e) => {
    if (e.key == "Enter") {
      handlerSubmit(e)
    }
  };

15) обработаем списки и работу с ними
	а) переходим в todo.js
	б) компонент принимает три значения
		1) todo
		2) toggleTask
		3) removeTask

function ToDo({ todo, toggleTask, removeTask }) {
  return (
    <div key={todo.id} className="item-todo">
      <div
        className={todo.complete ? "item-text strike" : "item-text"}
        onClick={() => toggleTask(todo.id)}
      >
        {todo.task}
      </div>
      <div className="item-delete" onClick={() => removeTask(todo.id)}>
        x
      </div>
    </div>
  );
}

export default ToDo;

16) осталось дописать переключение удаление задач
	а) переходим в app.js
	б) для удаления надо пройти по всем задачам и создать новый список без того элемента id которого прислали


  // удаление задачи
  const removeTask = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };

17) осталось дописать переключение задач
  	а) переходим в app.js
	б) для переключения надо изменить состония одного поля записи

  // переключение задачи!
  const handleToggle = (id) => {
    setTodos([
      ...todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : { ...todo }
      )
    ]);
  };





