import React from "react";
import {NavLink} from "react-router-dom";

const Navbar = (props) => {
    return <div>
        <div>
            <NavLink to={'/diary'}>Дневник</NavLink>
        </div>
        <div>
            <NavLink to='/users'>Пользователи</NavLink>
        </div>
        <div>
            <NavLink to='/objective'>To-Do List</NavLink>
        </div>
    </div>
}

export default Navbar
