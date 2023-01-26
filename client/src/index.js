import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserGames from './gdb/UserGames';
import GameList from './gdb/GameList';


export const Context = createContext(null)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserGames(),
        game: new GameList()
    }}>
            <App/>
    </Context.Provider>,
);

