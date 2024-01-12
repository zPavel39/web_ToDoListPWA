import {useState} from 'react'
import Header from '../../components/header/Header'
import FormTask from '../../components/form-task/FormTask'
import ListTask from '../../components/list-task/ListTask'
import Modal from '../../components/modal/Modal'
import langStore from './../../store/interpreter/interpreter.ts'
import {observer} from 'mobx-react-lite'
import {BtnShowForm} from "../../components/btn-show-form/BtnShowForm";
import './MainPage.scss'


const MainPage = observer(() => {

  const {translate} = langStore
  const [activeModal, setActiveModal] = useState(false)
  const [showForm, setShowForm] = useState(false)

  return (
    <div className='Main'>
      <Header/>
      <BtnShowForm img={true} show={showForm} textBtnNoShow={translate('Add task')} textBtnShow={translate('Hide form')} urlImg={'/assets/images/add.png'} altImg={'Add'} setShow={setShowForm}/>
      {showForm &&
        <FormTask setActiveModal={setActiveModal} activeModal={activeModal} translate={translate}/>
      }

      <ListTask setActiveModal={setActiveModal} activeModal={activeModal} translate={translate}/>

      {activeModal && (<Modal setActiveModal={setActiveModal} activeModal={activeModal} translate={translate}/>)}
    </div>
  )
})

export default MainPage