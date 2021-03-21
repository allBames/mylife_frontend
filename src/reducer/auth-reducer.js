import {AuthAPI} from "../api/AuthAPI";

const SET_USER_DATA = 'SET_USER_DATA'

let initialState = {
    token: sessionStorage.getItem('token'),
    id: localStorage.getItem('id')
}

let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            sessionStorage.setItem ('token', action.token)
            localStorage.setItem ('id', action.userID)
            return {
                ...state,
                token: action.token,
                id:  action.userID

            }
        }
        default:
            return state;
    }
}

export let setUserData = (userID, token) => ({type: SET_USER_DATA, userID, token})


export let login = (email, password) => async (dispatch) => {
    let data = await AuthAPI.login(email, password)
     dispatch(setUserData(data.user.id, data.token))
}

export let logout = () => async (dispatch) => {
    let data = await AuthAPI.logout()
    dispatch(setUserData(null, ""))
}

export default authReducer;