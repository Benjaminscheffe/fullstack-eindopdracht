import './ButtonComponent.scss';

function ButtonComponent( {classNames, buttonText, noteIcon, downloadIcon, editIcon, reviewIcon, buttonFunction }) {
    console.log(classNames);
    return (
        <button className={`btn ${classNames}`} onClick={buttonFunction}>
            { buttonText }
            { noteIcon && <> <i className="fa-solid fa-music"></i></> }
            { downloadIcon && <> <i className="fa-solid fa-download"></i></> }
            { editIcon && <> <i className="fa-solid fa-gear"></i></> }
            {reviewIcon && <> <i className="fa-solid fa-pen"></i></> }
        </button>
    );
}

export default ButtonComponent;