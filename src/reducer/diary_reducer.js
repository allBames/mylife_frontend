import {DiaryAPI} from "../api/DiaryAPI";
import {updateObjectInArray} from "../common/object-helpers";

const SET_DIARY = 'SET_DIARY'
const SET_ONE_DIARY_ENTRY = 'SET_ONE_DIARY_ENTRY'
const SET_DIARY_DATA = 'SET_DIARY_DATA'

let initialState = {
    diaryData: [
        {
            id: 1,
            assessment: 'Отлично',
            dateOfCreation: '17.01.2021',
            description: 'Самый лучший день',
            mood: 'Ленивое',
            title: 'Моя первая запись'
        },
    ],
    diaryEntry: ''
}

let diary_reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DIARY: {
            return {
                ...state,
                diaryData: [...action.newDiary]
            }
        }
        case SET_ONE_DIARY_ENTRY: {
            debugger
            return {
                ...state,
                diaryData: updateObjectInArray(state.diaryData, action.diaryID, "id", {title: action.title})
            }
        }
        case SET_DIARY_DATA: {
            return {
                ...state,
                diaryEntry: action.diary,
                diaryData: state.diaryData.filter(d => d.id !== action.diary)
            }
        }
        default:
            return state;
    }
}

export let setDiary = (newDiary) => ({type: SET_DIARY, newDiary})
export let editDiaryData = (diaryID, ...diary) => ({type: SET_ONE_DIARY_ENTRY, diaryID, ...diary})
export let setDiaryData= (diary) => ({type: SET_DIARY_DATA, diary})

export let getDiary = () => async (dispatch) => {
   let response = await DiaryAPI.getDiary()
        dispatch(setDiary(response.data))
}

export let getOneDiaryEntry = (diaryID) => async (dispatch) => {
    let response = await DiaryAPI.getOneDiaryEntry(diaryID)
         dispatch(setDiaryData(response.data))
}

export let addDiaryEntry = (diary) => async (dispatch) => {
    debugger
    let response = await DiaryAPI.addDiary(diary)
    dispatch(setDiaryData(response.data))
}

export let deleteDiaryEntry = (diaryID) => async (dispatch) => {
    debugger
    let response = await DiaryAPI.deleteDiary(diaryID)
    dispatch(setDiaryData(response.data))
}

export let editDiaryEntry = (diaryID, diary) => async (dispatch) => {
    let response = await DiaryAPI.editDiary(diaryID, diary)
    dispatch(editDiaryData(diaryID, response.data))
}

export default diary_reducer;