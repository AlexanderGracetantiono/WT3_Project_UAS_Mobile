import { APIList } from '../APIConfig'
import fetchNoCache from '../libraries/fetchNoCache'

export const UserManagement = {
    loginUser: (post_data,update) => {
        return fetchNoCache(update, APIList.API_LOGIN_USER, 'POST',post_data)
    },
    getUserAccount: (API_VAL, update) => {
        let API_VALUE = APIList.API_GET_USER + API_VAL
        return fetchNoCache(update, API_VALUE, 'GET')
    },
    // getListBookByKategori: (API_VAL, update) => {
    //     let API_VALUE = APIList.API_GET_BUKU_BY_KATEGORI + API_VAL
    //     return fetchNoCache(update, API_VALUE, 'GET')
    // },
    // getBookById: (BOOK_ID, update) => {
    //     let API_VALUE = APIList.API_GET_BUKU + BOOK_ID
    //     return fetchNoCache(update, API_VALUE, 'GET')
    // },
    // getListKategoriBook: (update) => {
    //     return fetchNoCache(update, APIList.API_GET_KATEGORI_BUKU, 'GET')
    // },
    // getListRestaurant: (update) => {
    //     return fetchNoCache(update, APIList.API_GET_RESTAURANT, 'GET')
    // },
}
