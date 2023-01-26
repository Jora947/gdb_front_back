import React, { useEffect, useState, useContext, useReducer } from 'react';
import "../profiel.css"
import UserService from "../api/UserService"
import {useFetch} from "../hooks/useFetch"
import { tokenStore } from '../gdb/Token';
import Avatar from "../assets/avatar.jpg"
import { Button, Col, Container, Image, ListGroup, Row } from 'react-bootstrap';
import CreateCategory from '../componets/models/CreateCategoty';
import { deleteCategory, getAllCategory } from '../api/gameAPI';
import { Context } from '..';
import DeleteIcon  from "../assets/delete.svg"
import { observer } from 'mobx-react-lite';
import CategoriesGames from '../componets/CategoriesGames';


const Personal = observer(() =>{
    const {game} = useContext(Context)
    const [categortVisible, setCategoryVisible] = useState(false);

    // const [fetchCategors, isCategoryLoading, CategorysErrors] = useFetch(async () => {
    //     const response = await getAllCategorssy(tokenStore.token.user.id)
    //     game.setCategory(response.data)
    // })

    useEffect(() => {
        game.setFilteredGames([])
        game.setSelectedCategory([])
    }, [])

    useEffect(() => {
        getAllCategory(tokenStore.token.user.id).then(response => game.setCategory(response.data))
    }, [game.selectedCategory, game.category])

    function filterCategorysBy(Category) {
        try{
            game.setFilteredGames(Category.games)
        } catch {
            console.log('hehe')
        }
        
    }

    return(
        <div className="test">
        <div className="profi">
            <div className="1" ><img src={Avatar}  width="200" height="200"/></div>
            <div className="nav__prof">
                <Container className="d-flex flex-column">
                    <Button onClick={() => setCategoryVisible(true)} variant="outline-dark" className="mt-4 p-2">Добавить категорию</Button>
                    <CreateCategory show={categortVisible} onHide={()=>setCategoryVisible(false)}/>
                    <ListGroup className='mt-2'>
                        {game.category.map(category => 
                        <ListGroup.Item 
                        active = {category.id === game.selectedCategory.id}
                        onClick={()=>{
                            game.setSelectedCategory(category)
                            filterCategorysBy(game.selectedCategory)
                        }}
                        style={{cursor:"pointer"}} 
                        className='mt-2' 
                        key={category.id}>
                         {[category.title, <Image key={category.id} className='delete__icon' onClick={()=>deleteCategory(category.id)} src={DeleteIcon}/>]}
                        </ListGroup.Item>)} 
                    </ListGroup>
                </Container>
            </div>
        </div>
        <div className="info">
            <div className="info_name">
                <div>{tokenStore.token.user.username}</div>
                <div>Настройки</div>
            </div>
            <div className="level">
                <div>Уровень: {tokenStore.token.user.rating}</div>
            </div>
        <Container>
            <Row className="mt-1">
                <Col md={9}>
                {(game.selectedCategory.lenght > 0) 
                ? <></>
                : <CategoriesGames/>
                }
                </Col>
            </Row>
        </Container>
        </div>
    </div>
    )
})

export default Personal;