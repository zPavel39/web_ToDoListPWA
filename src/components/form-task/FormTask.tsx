import React, {useCallback, useState} from "react";
import tasksStore from "../../store/task-store/tasks-store";
import { observer } from "mobx-react-lite";
import {BtnShowForm} from "../btn-show-form/BtnShowForm.tsx";
import "./FormTask.scss";

const FormTask = observer(({ ...props }: any) => {

  const { createTask, validation } = tasksStore;

  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [showDescription, setShowDescription] = useState(false)
  const [dateValue, setDateValue] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const callbacks = {
    createTask: useCallback((e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      createTask({
        title: titleValue,
        description: descriptionValue,
        date: dateValue,
      });
      setTitleValue("");
      setDescriptionValue("");
      console.log('123')
      /*props.setShowForm(false)*/
    }, [titleValue]),
    /*updateTask: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      updateTask({
        title: titleValue,
        description: descriptionValue,
        date: dateValue,
      });
      setTitleValue("");
      setDescriptionValue("");
      props.setActiveModal(false)
    },*/
  };
  return (
    <form
        className={`${props.showForm ? `form ${showDescription ? 'forMaxHeight' : ''}` : 'formNoShow'}`}
        onSubmit={callbacks.createTask
          /*props.activeModal ? callbacks.updateTask : */
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
          <BtnShowForm img={true} show={showDescription} textBtnNoShow={props.translate('Description')}
                       textBtnShow={props.translate('Description')} urlImg={'/assets/images/add.png'} altImg={'Add'}
                       setShow={setShowDescription} />
          <textarea
            className={showDescription ? "form__left_inputDescription" : "form__left_inputDescriptionNoShow"}
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
  );
});

export default React.memo(FormTask);