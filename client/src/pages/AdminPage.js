import React, { useContext, useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Context } from "..";
import { getAllGenres } from "../api/gameAPI";
import CreateGame from "../componets/models/CreateGame";
import CreateGenre from "../componets/models/CreateGenre";
import { observable, autorun } from "mobx"


const Admin = () =>{
    const [genreVisible, setGenreVisible] = useState(false);
    const [gameVisible, setGameVisible] = useState(false);


    return(
        <Container className="d-flex flex-column">
            <Button onClick={() => setGenreVisible(true)} variant="outline-dark" className="mt-4 p-2">Добавить жанр</Button>
            <Button onClick={() => setGameVisible(true)} variant="outline-dark" className="mt-4 p-2">Добавить игру</Button>
            <CreateGenre show={genreVisible} onHide={()=>setGenreVisible(false)}/>
            <CreateGame show={gameVisible} onHide={()=>setGameVisible(false)}/>  
        </Container>
    )
}

export default Admin;