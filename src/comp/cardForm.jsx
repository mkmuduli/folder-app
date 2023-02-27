import Modal from "./Modal";

const CardForm = ({ type, onClose }) => {
    return (
        <Modal isOpen={Boolean(type)} onClose={onClose} >
            <section className="doc-creation-block" >
                <div className="doc-head-block" >
                    <h4>{type === 'new' ? "Create New" : 'Update'}</h4>
                    <span onClick={onClose} >&#215;</span>
                </div>
                <div className="doc-choose-block" >
                    <span className="active" >File</span>
                    <span>Folder</span>
                </div>
                <input className="doc-input-ele" />
                <span className="doc-input-msg" >file/folder already exits</span>
                <button className="doc-create-btn" >Create</button>
            </section>
        </Modal>
    )
}

export default CardForm;