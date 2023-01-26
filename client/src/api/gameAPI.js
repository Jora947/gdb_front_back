import {$authHost, $host} from "./index";
import axios from "axios"


// export default class GenreService {
//     static async getGenre(genre_id) {
//         const response = await axios.get(`http://127.0.0.1:8000/api/v1/genre/${genre_id}`)
//         return response
//     }
// }

export const createGenre = async (title) => {
    const data = {title: title}
    const {response} = await axios.post('http://127.0.0.1:8000/api/v1/genre',data)
    return response
}

export const getGenre = async (genre_id) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/genre/${genre_id}`)
    return response
}

export const getAllGenres = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/genre/all/`)
    return response
}

export const createGame = async () => {
    const {data} = await axios.post('http://127.0.0.1:8000/api/v1/game')
    return data
}

export const getOneGame = async (game_id) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/game/${game_id}`)
    return response
}

export const getAllGame = async (genreId,) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/game/all/`, {params:{genreId}})
    return response
}

export const getImageGame = async (game_id) => {
    const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/game/${game_id}/main_img`, 
        {responseType: 'arraybuffer'}
    )
    return response
}

export const getAllImageGame = async (game_id) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/game/${game_id}/images`)
    return response
}

export const createCategory = async (title,user_id) => {
    const data = {title: title, user: user_id}
    const response = await axios.post(`http://127.0.0.1:8000/api/v1/category`,data)
    return response
}

export const getAllCategory = async (user_id) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/category/all/${user_id}`)
    return response
}

export const deleteCategory = async (category_id) => {
    const response = await axios.delete(`http://127.0.0.1:8000/api/v1/category/${category_id}`)
    return response
}

export const addGameToCategory = async (category_id, game_id) => {
    const data = {game: game_id}
    console.log(data)
    const response = await axios.put(
        `http://127.0.0.1:8000/api/v1/category/${category_id}/games`,
        data
    )
    return response
}

export const getAllRewiew = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/review/all/`)
    return response
}

