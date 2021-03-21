import React, {useEffect} from "react";
import ToDo from "./ToDo";
import HeaderContainer from "./HeaderContainer";
import {connect} from "react-redux";
import {getObjective} from "../../reducer/objective_reducer";
import {Body} from "./Body";

const ToDoPage = (props) => {

    return (
        <div className='main'>
            <HeaderContainer/>
            <ToDo/>
            <Body/>
        </div>
    )
}

const ToDoPageContainer = (props) => {

    return (
        <ToDoPage token={props.token} getObjective={props.getObjective}/>
    )
}

const mapStateToProps = (state) => ({
    token: state.authPage.token
})

export default connect(mapStateToProps, {getObjective})(ToDoPageContainer)


