import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
export default class UserGames{
    constructor(){
        this._user = {};
        makePersistable(this, {
            name: 'UserGames',
            name: "GameList",
            properties: ['_isAuth'],
            storage: sessionStorage,
        });
        makeAutoObservable(this)
    }
    _isAuth = false;

    setIsAuth(bool) {
        this._isAuth = bool 
    }
    setUser(user) {
        this._user = user 
    }

    get isAuth(){
        return this._isAuth;
    }
    get user(){
        return this._user;
    }
}