import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container,Row,Form} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Context } from "..";
import GameList from "../componets/GameList";
import TypeGames from "../componets/TypeGames"
import { getAllGame, getAllGenres, getGame, getGenre } from "../api/gameAPI";
import { useFetch } from "../hooks/useFetch";
import { tokenStore } from "../gdb/Token";
import Loader from "../assets/Loader"



const Games = observer(() =>{

    const {game} = useContext(Context)
    const {user} = useContext(Context)
    console.log(tokenStore.token.user.id)
    const [fetchGenres, isGenresLoading, GenresErrors] = useFetch(async () => {
        const response = await getAllGenres()
        game.setGenres(response.data)
    })
    const [fetchGames, isGamesLoading, GamesErrors] = useFetch(async () => {
        const response = await getAllGame()
        game.setGames(response.data)
        game.setFilteredGames(response.data)
    })
    useEffect(() => {
        fetchGenres()
        fetchGames()
    }, [])

    useEffect(() => {
        // fetchGames()
        filterGamesBy(game.selectedGenre)
    }, [game.selectedGenre])
    
    function filterGamesBy(Genre) {
        let games = game.games.slice();
        let res_games = []
        
        games.map((game, index) => {
            let isGameInGenre = false
            for (let i = 0; i < game.genres.length; i++) {
                if (game.genres[i].title === Genre.title) {
                    isGameInGenre = true
                }
            }
            if (isGameInGenre) {
                res_games.push(game)
            }
        })
        game.setFilteredGames(res_games)
    }

    
    return(
        <>
        { isGamesLoading
        ? <Loader />
        : <>
        <Container>
            <Row className="mt-1">
                <Col md={2}>
                    <TypeGames/>
                </Col>
                <Col md={9}>
                    <GameList/>
                </Col>
            </Row>
        </Container>
        </>
        }
        </>
    )
})

export default Games;