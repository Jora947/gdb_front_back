import React, { useContext, useEffect, useState } from "react";
import TypeGames from "../componets/TypeGames";
import { Col, Container,Row,Form, Card, Image, Button} from "react-bootstrap";
import "../index.css"
import { useNavigate, useParams } from "react-router-dom";
import { getAllGame, getImageGame, getOneGame,getAllImageGame } from "../api/gameAPI";
import { useFetch } from "../hooks/useFetch";
import {Buffer} from 'buffer';
import CloseIcon from "../assets/close.svg"
import { Context } from "..";
import Loader from "../assets/Loader"
import GameItem from "../componets/GameItem";
import { GAME_ROUTE } from "../utlis/consts";
import AddtoCategory from '../componets/models/AddtoCategory';

const GamePage = () =>{
    const navigate = useNavigate();
    const {game} = useContext(Context);
    const [games, setGame] = useState({});
    const [gamesSameGenre, setGamesSameGenre] = useState([]);
    const [isAllDataLoading, setIsAllDataLoading] = useState(true);
    const {id} = useParams()
    const [img, setImg] = useState()
    const [allImg, setAllImg] = useState()
    const [categoryVisible, setcategoryVisible] = useState(false);



    const [fetchImageGame, isImageGameLoading, userGameErrors] = useFetch(async () => {
        const response = await getImageGame(id)
        const buffer = Buffer(response.data, 'binary').toString('base64')
        setImg(buffer)  
    })
    const [fetchAllImageGame, isImageAllGameLoading, userAllGameErrors] = useFetch(async () => {
        const response = await getAllImageGame(id)
        console.log(response)
        setAllImg(response.data)
    })

    const [fetchGames, isUserGamesLoading, GamesErrors] = useFetch(async () => {
        const response = await getAllGame()
        game.setGames(response.data)
        setIsAllDataLoading(!isUserGamesLoading && !isCurrentGameLoading)
    })

    const [fetchCurrentGame, isCurrentGameLoading, CurrentGameErrors] = useFetch(async () => {
        const response = await getOneGame(id)
        setGame(response.data)
        setIsAllDataLoading(isUserGamesLoading && isCurrentGameLoading)
    })

    useEffect(()=>{
        fetchGames()
        fetchCurrentGame()
        fetchImageGame()
        fetchAllImageGame()
    },[])

    useEffect(()=>{
        chosedSameGames()
    },[isAllDataLoading])

    const [model, setModel] = useState(false)
    const [tempImgsrc, setTemp] = useState("")

    const getImg = () =>{
        setTemp(`data:image/png;base64,${img}`)
        setModel(true)
    }
   
    function chosedSameGames(){
        let games_all = game.games.slice();
        let res_games = []
        if (!(isCurrentGameLoading)) {
            games_all.map(game => {
                for (let i = 0; i < game.genres.length; i++) {
                    for (let j = 0; j < games.genres.length; j++) {
                        if (game.genres[i].title === games.genres[j].title && game.id != games.id) {
                            res_games.push(game)
                        }
                    }
                }
            })
            setGamesSameGenre(res_games)
        }
    }
    console.log(game.selectedCategory)
    return(
    <>
    {isCurrentGameLoading
    ? <Loader />
    : <>
        <div className={model ? "model open" : "model"}>
            <img src={tempImgsrc}/>
            <img className="icon" src={CloseIcon} onClick={()=>setModel(false)}/>
        </div>
        <div className="main__game d-flex justify-content-between m-auto mt-5">
            <div className="">
                <div className="d-flex justify-content-between">
                    <div>{games.release}</div>
                    <div className="ms-1">Платформы:{games.platforms && games.platforms.map(post => post.title).join(', ')}</div>
                    <div>Среднее время игры: {games.time_to_play} часов</div>
                </div>
                <h4>{games.title}</h4>
                    <div className="d-flex">
                        <AddtoCategory show={categoryVisible} onHide={()=>setcategoryVisible(false)} currentGame={games}/> 
                        <Button onClick={() => setcategoryVisible(true)} variant="outline-dark" className="">Добавить в категорию</Button>
                        <Button className="ms-4" variant="outline-dark">Написать рецензию</Button>
                    </div>
                    <div>
                        <div>Оценка</div>
                    </div>
                <h4>О игре</h4>
                    <div>
                        <div>{games.description}</div>
                    </div>
                <div className="d-flex justify-content-between" style={{width:"550px"}}>
                    <div style={{width:"300px"}}>
                        <div className="title_about">Платформа:</div>
                        <div>{games.platforms && games.platforms.map(post => post.title).join(', ')}</div>
                        <div className="title_about">Жанр</div>
                        <div>{games.genres && games.genres.map(post => post.title).join(', ')}</div>
                        <div className="title_about">Разработчик</div>
                        <div>{games.developer}</div>
                    </div>
                    <div style={{width:"250px"}}>
                        <div className="title_about">Metascore</div>
                        <div style={{color:"#29CA4D"}}>88</div>
                        <div className="title_about">Дата релиза</div>
                        <div>{games.release}</div>
                        <div className="title_about">Издатель</div>
                        <div>{games.production}</div>
                    </div>
                </div>
                <h4>Системные требования</h4>
                <div>{games.system_requirements}</div>
                    <div>
                        
                    </div>
            </div>
            <div className="ms-5">
                <Image className="game_image" width={530} height={340} src={`data:image/png;base64,${img}`} onClick={()=>{getImg()}}/>
                    <div className="wrap">
                    {isImageAllGameLoading
                        ? <Loader />
                        : <>{allImg.map(img => 
                            <Image className="box" width={250} height={210} src={`data:image/png;base64,${img}`}/>
                        )}</>
                        }
                    </div>
            </div>
        </div>
        <h4 className="d-flex justify-content-center mt-5">Игры как {games.title}</h4>
        <Row className="d-flex mt-2 same__games">
            {gamesSameGenre.map(game =>
                <GameItem key ={game.id} game={game}/>
            )}
        </Row>
        <div className="d-flex justify-content-center mt-5">Комменты</div>
        </>
    }
    </>
    )
}

export default GamePage;