import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createCategory } from '../../api/gameAPI';
import { tokenStore } from '../../gdb/Token';




const CreateCategory = ({show, onHide}) => {
  const [value, setValue] = useState("");
  const addType = () =>{
      createCategory(value, tokenStore.token.user.id).then(data => {
          setValue('')
          onHide()
      })
  console.log(value)
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
        Добавить категорию
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <Form.Control
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={"Введите название категории"}
            />
        </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant = "outline-danger" onClick={onHide}>Закрыть</Button>
      <Button variant = "outline-success" onClick={addType}>Добавить</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default CreateCategory