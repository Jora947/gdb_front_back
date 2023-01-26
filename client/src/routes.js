import Admin from "./pages/AdminPage"
import Personal from "./pages/PersonalPage"
import Games from "./pages/Games"
import Auth from "./pages/Auth"
import Game from "./pages/GamePage"
import Rewiew from "./pages/RewiewPage"
import { ADMIN_ROUTE, GAMES_ROUTE, GAME_ROUTE, LOGIN_ROUTE, PERSONAL_ROUTE, REGISTRATION_ROUTE, REWIEW_ROUTE } from "./utlis/consts"

export const authRoutes = [
    {
        path:ADMIN_ROUTE,
        Component: Admin
    },
    {
        path:PERSONAL_ROUTE,
        Component: Personal
    }
]

export const publicRoutes = [
    {
        path:GAMES_ROUTE,
        Component: Games
    },
    {
        path:LOGIN_ROUTE,
        Component: Auth
    },
    {
        path:REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path:GAME_ROUTE + "/:id",
        Component: Game
    },
    {
        path:REWIEW_ROUTE,
        Component: Rewiew
    }
]