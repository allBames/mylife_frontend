import React from "react";
import {connect} from "react-redux";
import Diary from "./Diary";
import {addDiaryEntry, deleteDiaryEntry, getDiary, getOneDiaryEntry} from "../../reducer/diary_reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

class DiaryContainer extends React.Component {
    componentDidMount() {
        this.props.getDiary()
    }

    render() {
        return  <Diary deleteDiaryEntry={this.props.deleteDiaryEntry} diaryList={this.props.diaryList}/>
    }
}

let mapStateToProps = (state) => ({
    diaryList: state.diaryPage.diaryData
})

export default compose(
    withRouter,
    connect(mapStateToProps, { getDiary, addDiaryEntry, deleteDiaryEntry })
)
(DiaryContainer)
