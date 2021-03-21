import React from 'react'
import {Field, reduxForm} from "redux-form";
import {addDiaryEntry, deleteDiaryEntry, editDiaryEntry, getOneDiaryEntry} from "../../reducer/diary_reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

function DiaryAddForm(props) {
    return <div> {
        <form onSubmit={props.handleSubmit}>
            <Field type="text" name={'title'} component={'input'} placeholder="Название"/>
            <Field type="text" name={'fullText'} component={'input'}/>
            <Field type="text" name={'mood'} component={'input'}/>
            <Field type="text" name={'assessment'} component={'input'}/>
            <Field type="date" name={'dateOfCreation'} component={'input'}/>
            <button>Сохранить</button>
        </form>
    }
    </div>
}

const DiaryReduxAddForm = reduxForm({
    form: 'addDiary',
    enableReinitialize: true
})(DiaryAddForm)


class DiaryAdd extends React.Component {

    componentDidMount() {
        this.props.getOneDiaryEntry(this.props.match.params.diaryID)
    }

    render() {

        const onSubmit = (values) => {
            let diaryID = this.props.match.params.diaryID
            if (diaryID) {
                this.props.editDiaryEntry(diaryID, values)
            } else {
                this.props.addDiaryEntry(values)
            }

        }

        const deleteDiary = (diaryID) => {
            this.props.deleteDiaryEntry(diaryID)
        }

        return <div>
            <h1>Добавить запись в дневник</h1>
            <DiaryReduxAddForm initialValues={this.props.initialValues} onSubmit={onSubmit}/>
            { this.props.match.params.diaryID && <button onClick={ (e) => { deleteDiary(this.props.diaryID) } }>Удалить</button> }
        </div>
    }
}

const mapStateToProps = (state) => ({
    diary: state.diaryPage.diaryEntry,
    initialValues: {
        title: state.diaryPage.diaryEntry.title,
        fullText: state.diaryPage.diaryEntry.fullText,
        mood: state.diaryPage.diaryEntry.mood,
        assessment: state.diaryPage.diaryEntry.assessment,
        dateOfCreation: state.diaryPage.diaryEntry.dateOfCreation
    },
    diaryID: state.diaryPage.diaryEntry.id
})

export default compose(
    withRouter,
    connect(mapStateToProps, {addDiaryEntry, getOneDiaryEntry, editDiaryEntry, deleteDiaryEntry})
)
(DiaryAdd)
