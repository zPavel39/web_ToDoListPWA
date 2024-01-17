import React from "react";
import "./ListTask.scss";
import tasksStore from "../../store/task-store/tasks-store";
import {observer} from "mobx-react-lite";

interface props {
  setActiveModal: (activeModal: boolean) => void;
  activeModal: boolean;
  translate: (key: string) => string;
}

const ListTask = observer(({...props}: props) => {
  const {tasks, delTask, updateCompleted, updateTaskOpenModel, sortTasksList} = tasksStore;


  const callbacks = {
    delTask: (id: number) => {
      delTask(id);
    },
    updateCompleted: (id: number) => {
      updateCompleted(id);
    },
    updateTaskOpenModel: (id: number) => {
      updateTaskOpenModel(id);
      props.setActiveModal(!props.activeModal);
    },
    sortTasksList: (sort: string) => {
      sortTasksList(sort)
    }
  };

  return (
    <div className="tasks-container">

      <ul className="tasks">
        <div className="tasks__header">
          <span>{props.translate('Sort')}:</span>
          <button className="tasks__header_btn" onClick={() => sortTasksList('Date')}>{props.translate('Date')}</button>
          <button className="tasks__header_btn"
                  onClick={() => sortTasksList('Completed')}>{props.translate('Active')}</button>
        </div>
        {tasks.map((task) => {
          const {id, title, description, date, completed} = task;
          return (
            <li
              className={completed ? "tasks__list completed" : " tasks__list"}
              key={id}
            >
              {!props.activeModal ?
                <>
                  <div className="tasks__leftBlock">
                    <h2 className="tasks__leftBlock_title">{title}</h2>
                    <p className="tasks__leftBlock_description">{description}</p>
                  </div>
                  <div className="tasks__rightBlock">
                <span className="tasks__rightBlock_date">
                  {date.split("-").reverse().join(".")}
                </span>
                    <div className="tasks__blockBtn">
                      <button
                        className="tasks__blockBtn_btn"
                        onClick={() => callbacks.updateTaskOpenModel(id)}
                      >
                        {props.translate('Update')}
                      </button>
                      <button
                        className="tasks__blockBtn_btn"
                        onClick={() => updateCompleted(id)}
                      >
                        {props.translate('Completed')}
                      </button>
                      <button
                        className="tasks__blockBtn_btn"
                        onClick={() => callbacks.delTask(id)}
                      >
                        {props.translate('Remove')}
                      </button>
                    </div>
                  </div>
                </>
                :
                <>
                  <div className="tasks__leftBlock">
                    <input className="tasks__leftBlock_input" value={title}></input>
                    <textarea className="tasks__leftBlock_inputDescription" maxLength={200}
                              value={description}></textarea>
                  </div>
                  <div className="tasks__rightBlock">
                    <input type={"date"} className="tasks__rightBlock_inputDate" value={date}/>
                    <div className="tasks__blockBtn">
                      <button
                        className="tasks__blockBtn_btn"
                        onClick={() => callbacks.updateTaskOpenModel(id)}
                      >
                        {props.translate('Save')}
                      </button>
                      <button
                        className="tasks__blockBtn_btn"
                        onClick={() => callbacks.delTask(id)}
                      >
                        {props.translate('Remove')}
                      </button>
                    </div>
                  </div>
                </>
              }
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default React.memo(ListTask);