import './InputComponent.scss';

function InputComponent({ inputType, inputName, inputLabel, inputId, validationRules, register, errors, onChange }) {
    return (
        <label htmlFor={inputId}>
            {inputLabel}
            <input
                type={inputType}
                {...register(inputName, validationRules)}
                id="name-field"
                onChange={onChange}
            />
            {errors[inputName] && <span className="error-message">{errors[inputName].message}</span>}
        </label>
    );
}

export default InputComponent;