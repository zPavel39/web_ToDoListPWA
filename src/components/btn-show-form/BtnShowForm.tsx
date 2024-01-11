import './BtnShowForm.scss'

export const BtnShowForm = ({...props}) => {
  return (
    <button className='btnShow' onClick={() => props.setShow(!props.show)}>
      {!props.show ?
        <>
          <span className="btnShow__text">{props.textBtnNoShow}</span>
          {props.img &&
            <img className="btnShow__image" src={props.urlImg} alt={props.altImg}/>
          }
        </>
        :
        <>
          <span className="btnShow__text">{props.textBtnShow}</span>
          {props.img &&
            <img className="btnShow__imageRotate" src={props.urlImg} alt={props.altImg}/>
          }
        </>
      }
    </button>
  );
}