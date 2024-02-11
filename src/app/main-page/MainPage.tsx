import {useEffect, useState} from 'react'
import Header from '../../components/header/Header'
import FormTask from '../../components/form-task/FormTask'
import ListTask from '../../components/list-task/ListTask'
import langStore from './../../store/interpreter/interpreter.ts'
import {observer} from 'mobx-react-lite'
import {BtnShowForm} from "../../components/btn-show-form/BtnShowForm";
import './MainPage.scss'
import tasksStore from "../../store/task-store/tasks-store.tsx";


const MainPage = observer(() => {
  const {getTasks} = tasksStore
  const {translate} = langStore
  const [updateForm, setUpdateForm] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div className='main'>
      <Header/>
      <div className='main__actionForm'>
        <BtnShowForm img={true} show={showForm} textBtnNoShow={translate('Add task')}
                     textBtnShow={translate('Hide form')} urlImg={'/assets/images/add.png'} altImg={'Add'}
                     setShow={setShowForm}/>
      </div>
      <div className='main__formTask'>
        <FormTask setUpdateForm={setUpdateForm} updateForm={updateForm} translate={translate}
                  setShowForm={setShowForm} showForm={showForm}/>
      </div>
      <ListTask setUpdateForm={setUpdateForm} updateForm={updateForm} translate={translate}/>
    </div>
  )
})

export default MainPage