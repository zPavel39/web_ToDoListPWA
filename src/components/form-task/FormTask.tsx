import React, { useState } from "react";
import tasksStore from "../../store/task-store/tasks-store";
import { observer } from "mobx-react-lite";
import "./FormTask.scss";

const FormTask = observer(({ ...props }: any) => {

  const { createTask, updateTask, validation } = tasksStore;

  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [dateValue, setDateValue] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const callbacks = {
    createTask: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      createTask({
        title: titleValue,
        description: descriptionValue,
        date: dateValue,
      });
      setTitleValue("");
      setDescriptionValue("");
    },
    updateTask: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      updateTask({
        title: titleValue,
        description: descriptionValue,
        date: dateValue,
      });
      setTitleValue("");
      setDescriptionValue("");
      props.setActiveModal(false)
    },
  };
  return (
    <div className="container">
      <form
        className={props.showForm ? "form" : "formNoActive"}
        onSubmit={
          props.activeModal ? callbacks.updateTask : callbacks.createTask
        }
      >
        <div className="form__left">
          <label>{props.translate('Title')}: {titleValue.length !== 0 || validation ? '' : 'Не может быть пустым'}</label>
          <input
            className={titleValue.length !== 0 || validation ? "form__left_inputTitle" : "form__left_inputTitleValid"}
            type="text"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            placeholder={props.translate('TitlePH')}
          />
          <label>{props.translate('Description')}:</label>
          <textarea
            className="form__left_inputDescription"
            rows={4}
            maxLength={200}
            placeholder={props.translate('DescriptionPH')}
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
          />
        </div>
        <div className="form__right">
          <div className="form__label">
            <label>Дата:</label>
            <input
              className="form__right_inputDate"
              type="date"
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
            />
          </div>
          <button className="form__right_btnSubmit" type="submit">
          {props.translate('Confirm')}
          </button>
        </div>
      </form>
    </div>
  );
});

export default React.memo(FormTask);