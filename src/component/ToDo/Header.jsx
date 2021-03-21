import logo from '../../assets/images/logo.png'
import {NavLink} from "react-router-dom";
import React, {useState} from "react";
import {
    DateLocal,
    DateLocalMoonEnd,
    DateLocalMoonStart,
    DateLocalWeekEnd,
    DateLocalWeekStart, DateLocalYearEnd, DateLocalYearStart
} from "../../common/DateLocal";
import {Modal} from "../../common/modal/Modal";
import ModalForm from "./ModalForm";
import ModalSelectDateForm from "./ModalSelectDateForm";
import {getObjective} from "../../reducer/objective_reducer";

export const Header = (props) => {

    const [modal, setModal] = useState({
        modal: false
    })

    const isPerformTrue = () => {
        props.setPerform(true)
    }

    const isPerformFalse = () => {
        props.setPerform(false)
    }

    const exit = () => {
        props.logout()
    }

    const dateSort = (e) => {
        switch (e) {
            case 'day' : {
                let date = [DateLocal(), DateLocal()]
                props.getObjective(date[0], date[1])
                return;
            }
            case 'week' : {
                let date = [DateLocalWeekStart(), DateLocalWeekEnd()]
                props.getObjective(date[0], date[1])
                return;
            }
            case  'moon' : {
                let date = [DateLocalMoonStart(), DateLocalMoonEnd()]
                props.getObjective(date[0], date[1])
                return;
            }
            case  'year' : {
                let date = [DateLocalYearStart(), DateLocalYearEnd()]
                props.getObjective(date[0], date[1])
                return;
            }
            case  'cleaner' : {
                props.getObjective()
                return;
            }
        }
    }

    return (
        <div className='header'>
            <div className='logo'>
                <img src={logo} alt=""/>
            </div>
            <div className='nav'>
                <span onClick={() => dateSort('day')}>
                    ДЕНЬ
                </span>
                <span onClick={() => dateSort('week')}>
                    НЕДЕЛЯ
                </span>
                <span onClick={() => dateSort('moon')}>
                    МЕСЯЦ
                </span>
                <span onClick={() => dateSort('year')}>
                    ГОД
                </span>
                <span onClick={() => setModal({...modal, modal: true})}>
                    СВОЙ ПЕРИОД
                </span>
                <span onClick={() => dateSort('cleaner')}>
                    Сбросить ВСЕ фильтры
                </span>
            </div>
            <div className='is_perform'>Показывать завершенные:
                <br/>
                <span onClick={() => isPerformTrue()}>ДА</span> / <span onClick={() => isPerformFalse()}>НЕТ</span>
            </div>
            <div className='login'>s
                <NavLink to='/auth'>Войти</NavLink>
                <span onClick={() => exit()}> Выйти</span>
            </div>

            <Modal
                onModalClose={() => setModal({...modal, modal: false})}
                title={'Выбрать свой период'}
                isOpened={ modal.modal }>
                <ModalSelectDateForm getObjective={props.getObjective}/>
            </Modal>
        </div>
    )
}