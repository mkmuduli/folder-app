import AddIcon from '../asset/add_new_button.png';

const DocCreation = ({onCreate}) => {
    return (
        <div className='doc-ele doc-create' onClick={onCreate} >
            <img src={AddIcon} alt="add-document" />
        </div>
    )
}

export default DocCreation;