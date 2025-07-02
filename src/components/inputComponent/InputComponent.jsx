import './InputComponent.scss';

function InputComponent({ inputType, inputName, inputLabel, inputId, validationRules, register, errors }) {
    return (
        <label htmlFor={inputId}>
            {inputLabel}
            <input
                type={inputType}
                {...register(inputName, validationRules)}
                id="name-field"
            />
            {errors[inputName] && <span className="error-message">{errors[inputName].message}</span>}
        </label>
    );
}

export default InputComponent;