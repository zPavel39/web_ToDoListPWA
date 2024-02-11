import React from "react";
import "./ListTask.scss";
import tasksStore from "../../store/task-store/tasks-store";
import {observer} from "mobx-react-lite";

interface props {
  setUpdateForm: (activeModal: boolean) => void;
  updateForm: boolean;
  translate: (key: string) => string;
}

const ListTask = observer(({...props}: props) => {
  const {
    tasks,
    updateTitleInput,
    updateDescriptionInput,
    updateDateInput,
    idSearch,
    setUpdateTitleInput,
    setUpdateDescriptionInput,
    setUpdateDateInput,
    delTask,
    saveTask,
    updateCompleted,
    updateTaskOpenForm,
    sortTasksList
  } = tasksStore;

  const callbacks = {
    delTask: (id: number) => {
      delTask(id);
    },
    updateCompleted: (id: number) => {
      updateCompleted(id);

    },
    updateTaskOpenForm: (id: number) => {
      updateTaskOpenForm(id);
      props.setUpdateForm(true);
      console.log('id', id)
    },
    saveTask: () => {
      saveTask()
      props.setUpdateForm(!props.updateForm);
      console.log('idSearch', idSearch)
    },
    sortTasksList: (sort: string) => {
      sortTasksList(sort)
    }
  };
  console.log('task', tasks)

  return (
    <div className="tasks-container">

      <ul className="tasks">
        {tasks.length > 2 &&
          <div className="tasks__header">
              <span>{props.translate('Sort')}:</span>
              <button className="tasks__header_btn"
                      onClick={() => sortTasksList('Date')}>{props.translate('Date')}</button>
              <button className="tasks__header_btn"
                      onClick={() => sortTasksList('Completed')}>{props.translate('Active')}</button>
          </div>
        }
        {tasks.map((task) => {
          const {id, title, description, date, completed} = task;
          return (
            <li
              className={completed ? "tasks__list completed" : " tasks__list"}
              key={id}
            >
              {!props.updateForm || (idSearch !== id) ?
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
                        onClick={() => callbacks.updateTaskOpenForm(id)}
                      >
                        {props.translate('Update')}
                      </button>
                      <button
                        className="tasks__blockBtn_btn"
                        onClick={() => callbacks.updateCompleted(id)}
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
                    <input className="tasks__leftBlock_input" value={updateTitleInput}
                           onChange={(e) => setUpdateTitleInput(e.target.value)}></input>
                    <textarea className="tasks__leftBlock_inputDescription" maxLength={200}
                              value={updateDescriptionInput}
                              onChange={(e) => setUpdateDescriptionInput(e.target.value)}>

                    </textarea>
                  </div>
                  <div className="tasks__rightBlock">
                    <input type={"date"} className="tasks__rightBlock_inputDate" value={updateDateInput}
                           onChange={(e) => setUpdateDateInput(e.target.value)}
                    />
                    <div className="tasks__blockBtn">
                      <button
                        className="tasks__blockBtn_btn"
                        onClick={() => callbacks.saveTask()}
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
  )
    ;
});

export default React.memo(ListTask);