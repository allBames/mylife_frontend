import edit from '../../assets/images/basic_sheet_pencil.png'
import del from '../../assets/images/basic_trashcan.png'
import React, {useEffect, useRef} from "react";
import {Modal} from "../../common/modal/Modal";
import ModalEditObjectiveForm from "./ModalEditObjectiveForm";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteObjective,
    editObjectiveEntry,
    getObjective,
    getObjectiveByID,
    nameSort
} from "../../reducer/objective_reducer";
import {getModal} from "../../reducer/header_reducer";
import userEvent from "@testing-library/user-event";

export const Body = () => {

    const ref = useRef()

    const dispatch = useDispatch()

    let objectiveList = useSelector(state => state.objectivePage.objectiveData)
    const isPerform = useSelector(state => state.headerBlock.headerData.is_perform)
    const modal = useSelector(state => state.headerBlock.modal)

    const onChangeHandler = event => {
        dispatch(editObjectiveEntry(event.target.id, event.target.checked))
    }

    const sortObj = (e) => {
        dispatch(getObjective('2021-03-20','2021-03-20', e))
    }

    return <div>
            <div className='body'>
            <table cellPadding='0' rules='none'>
                <tr>
                    <td className='td-name'>Название
                        <span onClick={() => sortObj('title')}>||</span></td>
                    <td className='td-name'>Метка
                        <span onClick={() => sortObj('label')}>||</span></td>
                    <td className='td-name'>Дата начала
                        <span onClick={() => sortObj('date_start')}>||</span></td>
                    <td className='td-name'>Дата конца
                        <span onClick={() => sortObj('date_end')}>||</span></td>
                    <td className='td-name'></td>
                </tr>
                { objectiveList.map(o => <tr key={o.id} >
                    {!isPerform && o.is_perform ?
                        <></>
                        : <>
                            <td className={`td-title ${o.main_id != null && 'no_main' }`} >
                                <div className='name'>
                                    <form onChange={onChangeHandler}>
                                        <input type="checkbox" id={o.id} checked={o.is_perform}/>
                                    </form>
                                    <span>{o.title}</span>
                                </div>
                            </td>
                            <td className='td-label'>
                                <div className='label'>
                                    <span>{o.label}</span>
                                </div>
                            </td>
                            <td className='td-data'>
                                <div className='data'>
                                    <span>{o.date_start}</span>
                                </div>
                            </td>
                            <td className='td-data'>
                                <div className='data'>
                                    <span>{o.date_end}</span>
                                </div>
                            </td>
                            <td className='td-buttons'>
                                <div className='edit' onClick={ () =>  dispatch(getModal(true, o.id)) &  dispatch(getObjectiveByID(o.id))}>
                                    <img src={edit} alt=""/>
                                </div>
                                <div className='delete' onClick={() => dispatch(deleteObjective(o.id)) }><img src={del} alt=""/></div>
                            </td>
                        </>}
                    </tr>)}
            </table>
        </div>
        <Modal
            onModalClose={() => dispatch(getModal(false, modal.id))}
            title = {'Добавить новую метку'}
            isOpened = { modal.modal }>
            <ModalEditObjectiveForm/>
        </Modal>
    </div>
}