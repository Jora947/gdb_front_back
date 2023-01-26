import {makeAutoObservable} from "mobx"


export default class GameList{
    constructor(){
        this._genres = []
        this._games = []
        this._filtered_games = []
        this._selectedGenre = {};
        this._same_games = []
        this._totalCount = 0
        this._category = [];
        this._selectedCategory = [];
        this._filtered_category = [];
        this._rewiew = [];
        makeAutoObservable(this)
    }

    setRewiew(rewiew){
        this._rewiew = rewiew;
    }

    setFilteredCategory(category){
        this._filtered_category = category
    }

    setSelectedCategory(category){
        this._selectedCategory = category
    }

    setCategory(category){
        this._category = category
    }

    setGenre(genre) {
        this._genres.push(genre)
    }
    setGenres(genres) {
        this._genres = genres
    }
    setGames(games) {
        this._games = games
    }
    setSelectedGenre(genres){
        // console.log(genres.title)
        this._selectedGenre = genres;
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    setFilteredGames(filtered_games) {
        this._filtered_games = filtered_games
    }
    setSameGames(same_games){
        this._same_games = same_games
    }
    
    get rewiew(){
        return this._rewiew
    }

    get selectedCategory(){
        return this._selectedCategory
    }

    get filteredCategory(){
        return this._filtered_category
    }

    get category(){
        return this._category
    }

    get genres(){
        return this._genres;
    }
    get games(){
        return this._games
    }
    get filtered_games(){
        return this._filtered_games
    }
    get selectedGenre(){
        return this._selectedGenre
    }
    get totalCount() {
        return this._totalCount
    }
    get same_games(){
        return this._same_games
    }

}