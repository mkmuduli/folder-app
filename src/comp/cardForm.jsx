import { useEffect, useState } from "react";
import Modal from "./Modal";

const CardForm = ({ type, onClose, onSubmit, fileData }) => {
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('file');

    const handleChange = (e) => {
        setFileName(e.target.value)
    }

    const handelSubmit = () => {
        onSubmit({
            fileName,
            fileType,
            oldName: fileData?.name
        })
    }

    useEffect(()=>{
        if(fileData?.name) setFileName(fileData.name);
        if(fileData?.type) setFileType(fileData.type);
    },[fileData])


    return (
        <Modal isOpen={Boolean(type)} onClose={onClose} >
            <section className="doc-creation-block" >
                <div className="doc-head-block" >
                    <h4>{type === 'new' ? "Create New" : 'Update'}</h4>
                    <span onClick={onClose} >&#215;</span>
                </div>
                <div className="doc-choose-block" >
                    <span className={fileType === 'file' ? 'active' : ''} onClick={() => setFileType('file')} >File</span>
                    <span className={fileType === 'folder' ? 'active' : ''} onClick={() => setFileType('folder')} >Folder</span>
                </div>
                <input className="doc-input-ele" value={fileName} onChange={handleChange} />
                {/* <span className="doc-input-msg" >file/folder already exits</span> */}
                <button className="doc-create-btn" onClick={handelSubmit} >Submit</button>
            </section>
        </Modal>
    )
}

export default CardForm;