const Modal = ({ closeModal, children }) => {

    return (
        <div className={"modal-container"}>
            <div className="overlay" onClick={closeModal}>

            </div>
            <div className="modal-content">

                <div className="header-modal">
                    <a href="#" onClick={closeModal}>
                        X
                    </a>
                </div>

                <div className="body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;