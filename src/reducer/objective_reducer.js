import {ObjectiveAPI} from "../api/ObjectiveAPI";
import {updateObjectInArray, updateObjectInArray2} from "../common/object-helpers";

const SET_OBJECTIVE = 'SET_OBJECTIVE'
const NEW_OBJECTIVE = 'NEW_OBJECTIVE'
const EXCLUDE_OBJECTIVE = 'DELETE_OBJECTIVE'
const UPDATE_OBJECTIVE = 'UPDATE_OBJECTIVE'
const SET_OBJECTIVE_ALL = 'SET_OBJECTIVE_ALL'
const GET_OBJECTIVE_BY_ID = 'GET_OBJECTIVE_BY_ID'
const NAME_SORT = 'NAME_SORT'

let initialState = {
    objectiveData: [
        // {
        //     id: 1,
        //     title: 'Моя первая запись',
        //     date_start: '17.01.2021',
        //     date_end: '17.01.2021',
        //     label: 'Дом'
        // },
        // {
        //     id: 2,
        //     title: 'Моя первая запись2',
        //     date_start: '17.01.2021',
        //     date_end: '17.01.2021',
        //     label: 'Дом'
        // }
    ],
    objective: ''
}

let objective_reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OBJECTIVE: {
            let mySort
            if(action.sort === undefined){
                mySort = (od) => od.sort((a, b) => (a.id > b.id ? 1 : -1))
            }
            else if (action.sort === "title") mySort = (od) => od.sort((a, b) => (a.title > b.title ? 1 : -1))
            else if (action.sort === "label") mySort = (od) => od.sort((a, b) => (a.label > b.label ? 1 : -1))
            else if (action.sort === "date_start") mySort = (od) => od.sort((a, b) => (a.date_start > b.date_start ? 1 : -1))
            else if (action.sort === "date_end") mySort = (od) => od.sort((a, b) => (a.date_end > b.date_end ? 1 : -1))
            return {
                ...state,
                    objectiveData: mySort([...action.objectives])
            }
        }
        case NEW_OBJECTIVE: {
            return {
                ...state,
                objectiveData: [...state.objectiveData, action.newObjective]
            }
        }
        case EXCLUDE_OBJECTIVE: {
            return {
                ...state,
                objectiveData: state.objectiveData.filter(o => o.id !== action.objective)
            }
        }
        case UPDATE_OBJECTIVE: {
            return {
                ...state,
                objectiveData: updateObjectInArray(state.objectiveData, action.objectiveID, "id", {is_perform: action.is_perform})
            }
        }
        case SET_OBJECTIVE_ALL: {
            return {
                ...state,
                objectiveData: state.objectiveData.map (o => {
                    if (o["id"] === action.objectiveID) {
                        return {...o, title: action[0].title,
                            label: action[0].label,
                            date_start: action[0].date_start,
                            date_end: action[0].date_end,
                            main_id: action[0].main_id}
                    }
                    return o
                })
            }
        }
        case GET_OBJECTIVE_BY_ID: {
            let a = state.objectiveData.filter(o => o.id === action.objectiveID)
            return {
                ...state,
                objective: a[0]
            }
        }
        case NAME_SORT: {
            let newState = Object.assign({}, state)
            return {
                ...newState,
                objectiveData: newState.objectiveData.sort((a, b) => (a.title > b.title ? 1 : -1))
            }
        }
        default:
            return state;
    }
}

export let setObjective = (objectives, sort) => ({type: SET_OBJECTIVE, objectives, sort})
export let newObjective = (newObjective) => ({type: NEW_OBJECTIVE, newObjective})
export let excludeObjective = (objective) => ({type: EXCLUDE_OBJECTIVE, objective})
export let updateObjective = (objectiveID, is_perform) => ({type: UPDATE_OBJECTIVE, objectiveID, is_perform})
export let updateObjectiveAll = (objectiveID, ...objective) => ({type: SET_OBJECTIVE_ALL, objectiveID, ...objective})
export let getObjectiveByID = (objectiveID) => ({type: GET_OBJECTIVE_BY_ID, objectiveID})
export let getNameSort = () => ({type: NAME_SORT})

export let getObjective = (date_start, date_end, sort) => async (dispatch) => {
    let response = await ObjectiveAPI.getObjective(localStorage.getItem('id'), date_start, date_end)
    dispatch(setObjective(response.data, sort))
}

export let addObjective = (objective) => async (dispatch) => {
    let response = await ObjectiveAPI.addObjective(objective)
    dispatch(newObjective(response.data))
}

export let nameSort = () => async (dispatch) => {
    dispatch(getNameSort())
}

export let deleteObjective = (objectiveID) => async (dispatch) => {
    let response = await ObjectiveAPI.deleteObjective(objectiveID)
    dispatch(excludeObjective(response.data))
}

export let editObjectiveEntry = (objectiveID, is_perform) => async (dispatch) => {
    await ObjectiveAPI.editObjective(objectiveID, is_perform)
    dispatch(updateObjective(objectiveID, is_perform))
}

export let editObjective = (objectiveID, objective) => async (dispatch) => {
    let response = await ObjectiveAPI.editObjectiveAll(objectiveID, objective)
    dispatch(updateObjectiveAll(objectiveID, response.data))
}

export default objective_reducer;