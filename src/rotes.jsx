import {CHANNELS_ROUT, LOGIN_ROUT} from "@/utils/consts.js";
import Login from "@/features/Login/Login.jsx";
import Channel from "@/features/Channel/Index.jsx";

export const publicRoute = [
    {
        path: LOGIN_ROUT,
        element: <Login/>,
    }
]

export const privateRoute = [
    {
        path: CHANNELS_ROUT,
        element: <Channel/>,
    }
]