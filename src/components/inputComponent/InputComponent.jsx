function InputComponent({ inputType, inputName, inputLabel, inputId, validationRules, register, errors, onChange, accept }) {
    return (
        <label htmlFor={inputId}>
            {inputLabel}
            <input
                type={inputType}
                accept={accept}
                {...register(inputName, validationRules)}
                id="name-field"
                onChange={onChange}
            />
            {errors[inputName] && <span className="error-message">{errors[inputName].message}</span>}
        </label>
    );
}

export default InputComponent;