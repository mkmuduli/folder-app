import file from '../asset/file.png';
import folder from '../asset/folder.png';
import AddIcon from '../asset/add_new_button.png';


const Menu = () => {
    return (
        <section className='option-block' >
            <span>copy</span>
            <span>rename</span>
            <span>delete</span>
        </section>
    )
}

export const Doc = ({ type }) => {
    return (
        <div className='doc-ele' >
            <img src={type === "file" ? file : folder} alt="Document" />
            <span className='doc-name' >sample.png</span>
            {/* <Menu /> */}
        </div>
    )
}

export const CreateDoc = () => {
    return (
        <div className='doc-ele doc-create' >
            <img src={AddIcon} alt="add-document" />
        </div>
    )
}