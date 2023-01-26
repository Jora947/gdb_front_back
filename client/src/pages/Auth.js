import React, { useState, useContext, useEffect } from "react";
import {GAMES_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utlis/consts";
import {NavLink, useLocation, useHistory, useNavigate} from "react-router-dom";
import {Container, Form, Card, Button} from 'react-bootstrap'
import LoginService from "../api/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { useFetch } from "../hooks/useFetch";


const Auth = observer(() =>{
    const {user} = useContext(Context)
    const location = useLocation()
    const navigation = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")

    // const [fetchLoginUser, isCurrentGameLoading, CurrentGameErrors] = useFetch(async () => {
        
    // })

    const click = async () => {
        try {
            let data;
            if (isLogin){
                data = await LoginService.postLoginUser(userName,password)
            } else {
                data  = await LoginService.registration(email,password,userName)
                console.log(data)
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigation(GAMES_ROUTE)
        } catch (e){
            alert(e.response.data.message)
        }
    }


    return(
        <Container className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight - 105}}
        >
            <Card style={{width:600}} className="p-5">
                <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    {isLogin ? "" 
                    : <Form.Control
                        className="mt-4"
                        placeholder="Введите ваш email..."
                        value = {email}
                        onChange = {e => setEmail(e.target.value)}
                    />}
                    <Form.Control
                        className="mt-4"
                        placeholder="Введите ваш никнейм..."
                        value = {userName}
                        onChange = {e => setUserName(e.target.value)}
                    />
                    <Form.Control
                        className="mt-4"
                        placeholder="Введите ваш пароль..."
                        value = {password}
                        onChange = {e => setPassword(e.target.value)}
                        type = "password"
                    />
                    {isLogin ?
                        <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
                                <div>
                                    Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                                </div>
                                <div>
                                    <NavLink to={""}>Забыли пароль</NavLink>
                                </div>
                        </div>
                            :
                            <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
                                <div className="">
                                    Есть аккаунт? <NavLink to={LOGIN_ROUTE}> Войдите!</NavLink>
                                </div>
                            </div>
                    }
                    {/* </Form> */}
                    <Button 
                        className="mt-3" 
                        variant={"outline-primary"}
                        onClick = {click}
                    >
                        {isLogin ? "Войти" : "Регистрация"}
                    </Button>
                </Form>
            </Card>
        </Container>
    )
})

export default Auth;