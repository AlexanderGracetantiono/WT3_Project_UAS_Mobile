import { APIList } from '../APIConfig'
import fetchNoCache from '../libraries/fetchNoCache'

export const BookManagement = {
    getListBook: (update) => {
        return fetchNoCache(update, APIList.API_GET_BUKU, 'GET')
    },
    getListBookBySearch: (API_VAL, update) => {
        let API_VALUE = APIList.API_GET_BUKU_BY_JUDUL + API_VAL
        return fetchNoCache(update, API_VALUE, 'GET')
    },
    getListBookByKategori: (API_VAL, update) => {
        let API_VALUE = APIList.API_GET_BUKU_BY_KATEGORI + API_VAL
        return fetchNoCache(update, API_VALUE, 'GET')
    },
    // getListRestaurant: (update) => {
    //     return fetchNoCache(update, APIList.API_GET_RESTAURANT, 'GET')
    // },
}
