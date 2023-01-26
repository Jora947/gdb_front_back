import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Stack from 'react-bootstrap/Stack';
import { Context } from "..";
import { getAllRewiew } from "../api/gameAPI";
import "../rewiew.css"


const Rewiew = () =>{
    const {game} = useContext(Context)
    useEffect(() => {
        getAllRewiew().then(response => game.setRewiew(response.data))
    }, [])





    return(
        <div class="list__games">
        <div class="center">
        <div class="heading">Рецензии</div>
        <div class="sort__review">
            <div>Популярные</div>
            <div>Новые</div>
        </div>
        <Stack gap={3} className = "review__stack">
        {game.rewiew.map(rewiew =>
            <div className="review__body" key={rewiew.id}>
                <div className="review__title">{rewiew.title}</div>
                <div>{rewiew.body}</div>
            </div>
        )}
        </Stack>
        </div>
    </div>
    )
}

export default Rewiew;