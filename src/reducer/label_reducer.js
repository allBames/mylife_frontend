import {LabelAPI} from "../api/LabelAPI";
import {DiaryAPI} from "../api/DiaryAPI";
import {setDiaryData} from "./diary_reducer";

const SET_LABEL = 'SET_LABEL'
const NEW_LABEL = 'NEW_LABEL'
const EXCLUDE_LABEL = 'EXCLUDE_LABEL'

let initialState = {
    labelData: [
        {
            id: 1,
            title: 'Моя первая запись'
        }
    ]
}

let label_reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LABEL: {
            return {
                ...state,
                labelData: [...action.label]
            }
        }
        case NEW_LABEL: {
            return {
                ...state,
                labelData: [...state.labelData, action.newLabel]
            }
        }
        case EXCLUDE_LABEL: {
            return {
                ...state,
                labelData: state.labelData.filter(l => l.id !== action.labelID)
            }
        }
        default:
            return state;
    }
}

export let setLabel = (label) => ({type: SET_LABEL, label})
export let newLabel = (newLabel) => ({type: NEW_LABEL, newLabel})
export let excludeLabel = (labelID) => ({type: EXCLUDE_LABEL, labelID})

export let getLabel= () => async (dispatch) => {
    let response = await LabelAPI.getLabel()
    dispatch(setLabel(response.data))
}

export let addLabel = (label) => async (dispatch) => {
    let response = await LabelAPI.addLabel(label)
    dispatch(newLabel(response.data))
}

export let deleteLabel = (labelID) => async (dispatch) => {
    let response = await LabelAPI.deleteLabel(labelID)
    dispatch(excludeLabel(response.data))
}

export default label_reducer;