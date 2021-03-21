import React, {useEffect} from "react";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {
    deleteObjective,
    editObjectiveEntry,
    getObjective,
    getObjectiveByID, nameSort
} from "../../reducer/objective_reducer";
import {Body} from "./Body";
import {getModal} from "../../reducer/header_reducer";
import {withAuthRedirect} from "../withAuthRederect";


function BodyContainer(props) {

    return <Body getObjectiveByID={props.getObjectiveByID} modal={props.modal} getModal={props.getModal}
                 isPerform={props.isPerform} editObjectiveEntry={props.editObjectiveEntry}
                 deleteObjective={props.deleteObjective}
                 nameSort={props.nameSort}
    />
}

let mapStateToProps = (state) => ({
    isPerform: state.headerBlock.headerData.is_perform,
    modal: state.headerBlock.modal,
    userID: state.authPage.id
})


export default compose(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, {nameSort, getObjective, deleteObjective, editObjectiveEntry, getModal, getObjectiveByID})
)
(BodyContainer)
