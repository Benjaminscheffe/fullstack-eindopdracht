import './ButtonComponent.scss';

function ButtonComponent( {classNames, buttonText, noteIcon, downloadIcon, editIcon, buttonFunction }) {
    console.log(classNames);
    return (
        <button className={`btn ${classNames}`} onClick={buttonFunction}>
            { buttonText }
            { noteIcon && <> <i className="fa-solid fa-music"></i></> }
            { downloadIcon && <> <i className="fa-solid fa-download"></i></> }
            { editIcon && <> <i className="fa-solid fa-gear"></i></> }
        </button>
    );
}

export default ButtonComponent;