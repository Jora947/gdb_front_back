import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { ListGroup} from "react-bootstrap";
import { Context } from "..";

const TypeGames = observer(()=>{
    
    const {game} = useContext(Context);
    if (!game.genres) {
        return null
    }
    
    return(
        <ListGroup className="">
            <ListGroup.Item style={{fontWeight: "bold"}}>Новые релизы</ListGroup.Item>
            <ListGroup.Item>Последние 30 дней</ListGroup.Item>
            <ListGroup.Item>Эта неделя</ListGroup.Item>
            <ListGroup.Item>Следующая неделя</ListGroup.Item>
            <ListGroup.Item style={{fontWeight: "bold"}}>Лучшие</ListGroup.Item>
            <ListGroup.Item>В этом году</ListGroup.Item>
            <ListGroup.Item>Популярные в 2022</ListGroup.Item>
            <ListGroup.Item>За всё время</ListGroup.Item>
            <ListGroup.Item style={{fontWeight: "bold"}}>Жанры</ListGroup.Item>
            { (game.genres).map((genre) => 
                <ListGroup.Item 
                style={{cursor:"pointer"}}  
                active = {genre.id === game.selectedGenre.id}
                onClick={()=>game.setSelectedGenre(genre)}
                key={genre.id}>
                {genre.title}
                </ListGroup.Item>
            )} 
        </ListGroup>
    );
});

export default TypeGames;
