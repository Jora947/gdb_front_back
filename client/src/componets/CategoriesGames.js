import React, { useContext } from "react";
import {observer} from "mobx-react-lite"
import { Form, Row } from "react-bootstrap";
import GameItem from "./GameItem";
import { Context } from "..";


const CategoriesGames = observer(() =>{
    const {game} = useContext(Context)
    return(
        <Row className="d-flex">
            {game.filtered_games.map(game =>
                <GameItem key ={game.id} game={game}/>
            )}
        </Row>
    );
});

export default CategoriesGames;