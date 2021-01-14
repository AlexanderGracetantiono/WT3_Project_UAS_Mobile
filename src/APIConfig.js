const BASE_URL_LOCAL = 'http://192.168.0.5:3000/' 

const BASE_URL = BASE_URL_LOCAL


const APIRoot = {
    ROOT_RESTAURANT_MASTER: `${BASE_URL}restaurants/`,
}

// API List
export const APIList = {
    //Restaurant Master
    API_GET_RESTAURANT: `${APIRoot.ROOT_RESTAURANT_MASTER}`,
}