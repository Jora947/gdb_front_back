import React from "react";
import axios from "axios";
import { tokenStore } from "../gdb/Token";



export default class LoginService {
    static async postLoginUser(userLogin, userPassword) {
        // const data = {username: userLogin, password: userPassword}
        let formData = new FormData()
        formData.append('username', userLogin)
        formData.append('password', userPassword)
        console.log(formData)
        const response = await axios.post(
            'http://127.0.0.1:8000/token', 
            formData, 
            {headers: { "Content-Type": "multipart/form-data"}}
        )
        tokenStore.addtoken(response.data)
        return response
    }

    static registration = async(userEmail, userPassword, userName) =>{
        const data = {username: userName, password: userPassword, email:userEmail}
        const response = await axios.post("http://127.0.0.1:8000/api/v1/user/", data)
        tokenStore.addtoken(response.data.token)
        return response
    }   
}