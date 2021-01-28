import React from 'react'
import {NavLink} from "react-router-dom";

const Diary = (props) => {

    const deleteDiary = (diaryID) => {
        debugger
        props.deleteDiaryEntry(diaryID)
    }

    return <div> {
        props.diaryList.map(d => <div key={d.id}>
            <div>
                <div>Название: {d.title}</div>
                <div>Описание: {d.fullText}</div>
                <div>Настроение: {d.mood}</div>
                <div>Оценка дня: {d.assessment}</div>
                <div>Дата создания: {d.dateOfCreation}</div>
                {d.diaryImg && <div><img src={d.diaryImg} alt="Фото"/></div>}
                <NavLink to={'/diary/' + d.id}>Открыть</NavLink>
                <button onClick={ (e) => { deleteDiary(d.id, d) } }>Удалить</button>
            </div>
        </div>)
    }
        <NavLink to={'/diary/add'}>Добавить запись</NavLink>
    </div>
}

export default Diary
