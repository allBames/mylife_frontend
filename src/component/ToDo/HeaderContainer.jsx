import React from "react";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {Header} from "./Header";
import {setPerform} from "../../reducer/header_reducer";
import {logout} from "../../reducer/auth-reducer";
import {getObjective} from "../../reducer/objective_reducer";


function HeaderContainer(props) {

    if (props.token === "") {
        return <Redirect to={'/auth'}/>
    }

    return <Header getObjective={props.getObjective} logout={props.logout} setPerform={props.setPerform}/>
}

let mapStateToProps = (state) => ({
    token: state.authPage.token
})

export default compose(
    withRouter,
    connect(mapStateToProps, { setPerform, logout, getObjective })
)
(HeaderContainer)
