
import './button.styles.scss'

const Button_type_classes={
    google:'google',
    inverted:'inverted',
    normal:'normal'
}



const Button =({text,buttonType,...other})=>{
    return (
    <button 
    className={`button-container ${buttonType}`}{...other}
    >
    {text}
    </button>
)}

export default Button