import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => ({
    token: state.authPage.token
})

export const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component{
        render() {
            if(!this.props.token || this.props.token === "") return <Redirect to={"./auth"}/>
            return <Component {...this.props} />
        }
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent)
}