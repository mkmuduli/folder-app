import ReactModal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(246, 245, 245 / 75%)',
  },
};

ReactModal.setAppElement('#modalRoot');

function Modal({ isOpen, onClose, children }) {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Modal"
            style={customStyles}>
            {children}
        </ReactModal>
    );
}

export default Modal