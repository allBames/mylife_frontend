import {Field, reduxForm} from "redux-form";
import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {login} from "../../reducer/auth-reducer";
import {getObjective} from "../../reducer/objective_reducer";
import {compose} from "redux";

const AuthForm = (props) => {
    return <div>
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field type="text" name={'email'} component={'input'} pleaseholder={'Email'}/>
            </div>
            <div>
                <Field type="password" name={'password'} component={'input'} pleaseholder={'Пароль'}/>
            </div>
            <button>Вход</button>
        </form>
    </div>
}

const AuthReduxForm = reduxForm({
    form: 'auth'
})(AuthForm)

const Auth = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password)
    }

    // if (props.token !== "") {
    //     return <Redirect to={'/objective'}/>
    // }

    return <div>
        <h1>Авторизация</h1>
        <AuthReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => ({
    token: state.authPage.token
})

export default compose(
    connect(mapStateToProps, {login, getObjective}),
)
(Auth)