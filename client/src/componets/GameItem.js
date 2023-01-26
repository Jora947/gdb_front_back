import React, { Component, useEffect, useState } from 'react'
import { Card, Image } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import {useNavigate} from 'react-router-dom';
import { getAllImageGame, getImageGame, getOneGame } from '../api/gameAPI';
import { useFetch } from '../hooks/useFetch';
import "../index.css";
import { GAME_ROUTE} from "../utlis/consts";
import {Buffer} from 'buffer';
import Loader from "../assets/Loader"


              

const GameItem = ({game}) =>{
    const navigate = useNavigate();
    const [isShown, setIsShown] = useState(false);
    const [games, setGame] = useState({info: []})
    const [img, setImg] = useState()
    const [fetchImageGame, isImageGameLoading, userGameErrors] = useFetch(async () => {
        const response = await getImageGame(game.id)
        const buffer = Buffer(response.data, 'binary').toString('base64')
        setImg(buffer)
    })
    
    useEffect(() => {
        getOneGame(game.id).then(response =>setGame(response.data))
        fetchImageGame()
        
    }, [])
    // useEffect(() => {
    //     console.log(img)
    // }, [img])
    
    const Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />
   
    return(
        // <>
        // { isImageGameLoading
        // ? <Loader />
        // : <>
        <Col md ={4}  onClick={() => navigate(GAME_ROUTE + '/' + game.id)}>
            <Card onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} className={"col mt-3"} style={{width:300, cursor: 'pointer', border:"0", height:325}}>
                <Image width={300} height={250} src={`data:image/png;base64,${img}`} className={"img"}/>
                <div className="mt-1 d-flex justify-content-between align-items-center">
                    <div className='d-flex  flex-column mt-1 game__cart'>
                        <div style={{fontSize: 18}}>{game.platforms && game.platforms.map(post => post.title).join(', ')}</div>
                        <div className='game__title'>{game.title}</div>
                        {isShown && (
                            <div className='more__info'>
                                <div className='game__info'>
                                    <div>Дата релиза:</div>
                                    <div>{games.release}</div>
                                </div>
                                <div className='game__info'>
                                    <div>Разработчик:</div>
                                    <div>{game.developer}</div>
                                </div>
                                <div className='game__info'>
                                    <div>Жанр:</div>
                                    <div>{games.genres && games.genres.map(post => post.title).join(', ')}</div>
                                </div>
                            </div>  
                        )}
                    </div>
                </div>
            </Card>
        </Col>
        // </>
        // }
        // </>
    )
}

export default GameItem;