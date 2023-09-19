import './form-input.styles.scss'

const FormInput = ({ label, htmlFor, ...otherprops }) => {
    return (
        <div className="group">
            <input
                className="form-input"
                {...otherprops}
            />
            {label && (
                <label
                    className={`${otherprops.value.length ? 'shrink' : ''
                        }form-input-label`}
                    htmlFor={htmlFor}>{label}</label>
            )}
            
        </div>
    )
}
export default FormInput