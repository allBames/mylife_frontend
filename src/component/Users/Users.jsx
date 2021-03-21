import React, {useState} from 'react';
import {Modal} from "../../common/modal/Modal";

const Users = () => {

    const [modal, setModal] = useState({
        modal: false
    })

    return ( <div>
            <button onClick={() => setModal({...modal, modal: true})}>Open</button>
            <Modal
                onModalClose={() => setModal({...modal, modal: false})}
                title={'modal'}
                isOpened={ modal.modal }>
                <p>ПРИВЕТ</p>
            </Modal>
        </div>

    )
}

export default Users