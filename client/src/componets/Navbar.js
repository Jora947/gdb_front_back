import React, { useContext, useState } from "react";
import Container from 'react-bootstrap/Container';
import { Context } from "..";
import '../navbar.css';
import {observer} from "mobx-react-lite"
import {Button, Nav} from "react-bootstrap"
import { Link} from "react-router-dom";
import { GAMES_ROUTE, REWIEW_ROUTE, PERSONAL_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE } from "../utlis/consts";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { tokenStore } from "../gdb/Token";


const NavBar = observer(() =>{
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [isShown, setIsShown] = useState(false);
    return(
        <Navbar collapseOnSelect expand="lg"  variant="dark" className='navbar'>
      <Container >
        <Navbar.Toggle/>
        <Navbar.Collapse >
          <Nav className="me-auto">
            <Link to={GAMES_ROUTE} style={{textDecoration: 'none', color: "white"}}>Главная</Link>
            <Link to={REWIEW_ROUTE} className='ms-5' style={{textDecoration: 'none', color: "white"}}>Ревью</Link>
          </Nav>
          <Nav className='profie'>
          {user.isAuth ? <>
            {/* <img
              alt=""
            //   src={logo}
              width="41"
              height="41"
              className="d-inline-block align-top"
            />{' '} */}
             <Button variant="outline-light" 
             onMouseEnter={() => setIsShown(true)} 
             onMouseLeave={() => setIsShown(false)} 
             onClick={()=> navigate(PERSONAL_ROUTE)} className='ms-4 me-4' >{tokenStore.token.user.username}
             </Button>
             <Button variant="outline-light" onClick={()=> user.setIsAuth(false)} className="logout__button">Выйти</Button>
             <Button variant="outline-light" 
             onClick={()=> navigate(ADMIN_ROUTE)}>Админ панель
             </Button>
             </>
            : <Button 
            onClick={()=>  navigate(LOGIN_ROUTE)} variant="outline-light" 
            className='ms-4 me-4'  style={{textDecoration: 'none', color: "white"}}>Войдите
            </Button>
          }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
});

export default NavBar;