import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

class tokenDataStore {
    token = this.resetToken();

    resetToken() {
        return '';
    }

    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'tokenDataStore',
            properties: ['token'],
            storage: sessionStorage,
        });
    }

    addtoken(token) 
    {
        this.token = token;
    }
}

export const tokenStore = new tokenDataStore();