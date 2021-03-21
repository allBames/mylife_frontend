const SET_PERFORM = 'SET_PERFORM'
const GET_MODAL = 'GET_MODAL'

let initialState = {
    headerData: {
        is_perform: true
    },
    modal: {
        modal: false,
        id: 0
    }
}

let header_reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PERFORM: {
            return {
                ...state,
                headerData: {is_perform: action.is_perform}
            }
        }
        case GET_MODAL: {
            return {
                ...state,
                modal: {modal: action.modal, id: action.id}
            }
        }
        default:
            return state;
    }
}

export let setPerform = (is_perform) => ({type: SET_PERFORM, is_perform})
export let getModal = (modal, id) => ({type: GET_MODAL, modal, id})

export default header_reducer;