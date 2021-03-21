import React from "react";
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import Users from "./component/Users/Users";
import Navbar from "./component/Nav/Navbar";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import store from "./reducer/redux-store";
import DiaryContainer from "./component/Diary/DiaryContainer";
import DiaryAdd from "./component/Diary/DiaryAdd";
import Auth from "./component/Auth/Auth";
import ToDoPageContainer from "./component/ToDo/ToDoPage";


function App() {
    return (
        <div>
            <Navbar/>
            <Switch>
                <Route exact path='/diary/add' render={() => <DiaryAdd/>}/>
                <Route exact path='/diary' render={() => <DiaryContainer/>}/>
                <Route exact path='/diary/:diaryID?' render={() => <DiaryAdd/>}/>
                <Route exact path='/objective' render={() => <ToDoPageContainer/>}/>
                <Route exact path='/auth' render={() => <Auth/>}/>

                <Route path='/users' render={() => <Users/>}/>
            </Switch>
        </div>
    )
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
