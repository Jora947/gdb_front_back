import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, ListGroup, Modal, Row } from 'react-bootstrap'
import { Context } from '../..';
import { getAllCategory, addGameToCategory } from '../../api/gameAPI';
import { tokenStore } from '../../gdb/Token';
import { useFetch } from '../../hooks/useFetch';




const CreateGenre = observer(({show, onHide, currentGame}) => {
    const {game} = useContext(Context) 
    const [fetchCategors, isCategoryLoading, CategorysErrors] = useFetch(async () => {
        const response = await getAllCategory(tokenStore.token.user.id)
        game.setCategory(response.data)
    })

    const [fetchGameToCategory, isGameToCategoryLoading, GameToCategoryErrors] = useFetch(async () => {
        const response = await addGameToCategory(game.selectedCategory.id, currentGame.id)
        console.log(response)
    })

    useEffect(()=>{
        fetchCategors()
    },[]) 
    const [value, setValue] = useState("");
    const addGame = () =>{
        fetchGameToCategory()
        onHide(true)
    }
    return (
        <Modal
        show = {show}
        onHide = {onHide}
        size="lg"
        centered
    >

    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Добавить игру в категорию
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form>
        <ListGroup className="">
            {game.category.map(category =>
                <ListGroup.Item 
                active = {category.id === game.selectedCategory.id}
                onClick={()=>game.setSelectedCategory(category)} 
                style={{cursor:"pointer"}} 
                key = {category.id}>
                {category.title}
                </ListGroup.Item>
            )}
        </ListGroup>
        </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant = "outline-danger" onClick={onHide}>Закрыть</Button>
      <Button variant = "outline-success" onClick={addGame}>Добавить</Button>
    </Modal.Footer>
  </Modal>
  )
})

export default CreateGenre