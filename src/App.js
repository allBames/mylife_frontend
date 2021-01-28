import React from "react";
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import Users from "./component/Users";
import Navbar from "./component/Navbar";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import store from "./reducer/redux-store";
import DiaryContainer from "./component/DiaryContainer";
import DiaryAdd from "./component/DiaryAdd";


class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <Switch>
                    <Route exact path='/diary/add' render={() => <DiaryAdd/>}/>
                    <Route exact path='/diary' render={() => <DiaryContainer/>}/>
                    <Route exact path='/diary/:diaryID?' render={() => <DiaryAdd/>}/>

                    <Route path='/users' render={() => <Users/>}/>
                </Switch>
            </div>
        )
    }
}

let AppContainer = compose(
    withRouter,
    connect(null, {}))(App)

let MyLifeApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MyLifeApp
