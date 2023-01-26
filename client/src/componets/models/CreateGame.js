import React, { useContext, useState } from 'react'
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import { Context } from '../..'


const CreateGame = ({show, onHide}) => {
  const {game} = useContext(Context)  
  const [info, setInfo] = useState([])
  const addInfo = () =>{
    setInfo([...info,{title:'', description:"", number: Date.now()}])
  }
  const removeInfo = (number) =>{
    setInfo(info.filter(i => i.number !== number))
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
        Добавить игру
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <Dropdown>
                <Dropdown.Toggle>
                    Выберите жанр
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {game.genres.map(genre =>
                        <Dropdown.Item key = {genre.id}>{genre.title}</Dropdown.Item>
                    )}
                </Dropdown.Menu>
                <Form.Control
                    className='mt-3'
                    placeholder='Введите названия игры'
                />
                <Form.Control
                    className='mt-3'
                    type = "file"
                />
                <hr/>
            </Dropdown>
            <Button onClick={addInfo} variant='outline-dark'>Добавить новое свойство</Button>
            {info.map(i =>
                <Row className='mt-4' key ={i.number}>
                    <Col md={4}>
                        <Form.Control 
                            placeholder='Введите название'
                        />
                    </Col>
                    <Col md={4}>
                        <Form.Control
                            placeholder='Введите описание'
                        />
                    </Col>
                    <Col md ={4}>
                        <Button onClick={()=> removeInfo(i.number)} variant='outline-danger' >Удалить</Button>
                    </Col>
                </Row>
            )}
        </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant = "outline-danger" onClick={onHide}>Закрыть</Button>
      <Button variant = "outline-success" onClick={onHide}>Добавить</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default CreateGame