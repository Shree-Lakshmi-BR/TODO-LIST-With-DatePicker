import React, { useReducer, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./TodoUpdate.css";

function TodoUpdate() {
  let [task, settask] = useState("");
  let [date, setDate] = useState(new Date());
  let updateTask = ({ target: { value } }) => {
    settask(value);
  };
  let initialtask = [];
  let reducerfn = (ctasks, action) => {
    switch (action.type) {
      case "ADD":
        return [
          ...ctasks,
          {
            text: action.payload.task,
            date: action.payload.date,
            completed: false,
          },
        ];
      case "DELETE":
        let filteredTasks = ctasks.filter((t, i) => i !== action.payload);
        return filteredTasks;
      case "SEARCH":
        return ctasks.filter((t) =>
          t.text.toLowerCase().includes(action.payload.toLowerCase())
        );
      case "TOGGLE":
        return ctasks.map((t, i) =>
          i === action.payload ? { ...t, completed: !t.completed } : t
        );
      default:
        return ctasks;
    }
  };
  let [taskops, dispatcherfn] = useReducer(reducerfn, initialtask);
  let addTask = () => {
    dispatcherfn({ type: "ADD", payload: { task, date } });
    // settask(""); 
  };
  let deleteTask = (id) => {
    dispatcherfn({ type: "DELETE", payload: id });
  };
  let toggleTask = (id) => {
    dispatcherfn({ type: "TOGGLE", payload: id });
  };
  let [sid, setsid] = useState("");
  let updatesid = ({ target: { value } }) => {
    setsid(value);
  };
  let filterTasks = sid
    ? taskops.filter((t) => t.text.toLowerCase().includes(sid.toLowerCase()))
    : taskops;
  let [zoom, setZoom] = useState(100);

  let zoomIn = () => {
    setZoom((prezoom) => prezoom + 10);
  };

  let zoomOut = () => {
    setZoom((prezoom) => Math.max(10, prezoom - 10));
  };

  let completedTasks = filterTasks.filter((t) => t.completed);
  let pendingTasks = filterTasks.filter((t) => !t.completed);

  return (
    <div className="calendar">
      <div className="zoom">
        <button className="zoom-button" onClick={zoomIn}>
          +
        </button>
        <button className="zoom-button" onClick={zoomOut}>
          -
        </button>
      </div>
      <div className="date-picker-container">
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          className="date-picker"
        />
      </div>
      <div className="content" style={{ transform: `scale(${zoom / 100})` }}>
        <h1>ToDo List</h1>
        <div className="todo">
          <input
            className="top"
            type="text"
            value={task}
            onChange={updateTask}
            placeholder="Add New Task"
          />
          <button onClick={addTask} className="btn">
            ADD
          </button>
          <input
            className="top"
            type="text"
            value={sid}
            onChange={updatesid}
            placeholder="Search Tasks Here"
          />
        </div>
        <aside className="task_part">
          <div className="category">
            <h2>Pending Tasks</h2>
            <ol>
              {pendingTasks.map((t, i) => (
                <li key={i}>
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleTask(i)}
                  />
                  {t.text} ({t.date.toLocaleDateString()})
                  <button onClick={() => deleteTask(i)}>X</button>
                </li>
              ))}
            </ol>
          </div>
          <div className="category">
            <h2>Completed Tasks</h2>
            <ol>
              {completedTasks.map((t, i) => (
                <li key={i}>
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleTask(i)}
                  />
                  {t.text} ({t.date.toLocaleDateString()})
                  <button onClick={() => deleteTask(i)}>X</button>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default TodoUpdate;
