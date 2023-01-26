import React, { useContext } from "react";
import {Routes, Roure, Navigate, Route} from 'react-router-dom';
import { Context } from "..";
import { authRoutes, publicRoutes } from "../routes";
import { GAMES_ROUTE } from "../utlis/consts";
const Approuter = () =>{
    const {user} = useContext(Context)

    return(
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component})=>
                <Route key ={path} path={path}  element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component})=>
                <Route key ={path} path={path}  element={<Component/>} exact/>
            )}
            <Route path='*' element={<Navigate to={GAMES_ROUTE}/>} />
        </Routes>
    )
}

export default Approuter;