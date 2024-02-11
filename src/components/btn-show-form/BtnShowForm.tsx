import './BtnShowForm.scss'

export const BtnShowForm = ({...props}) => {
  return (
    <button className='btnShow' onClick={() => props.setShow(!props.show)}>
      <span className="btnShow__text">{!props.show ? props.textBtnNoShow : props.textBtnShow}</span>
      <img className={!props.show ? "btnShow__image" : "btnShow__imageRotate"} src={props.urlImg} alt={props.altImg}/>
    </button>
  );
}