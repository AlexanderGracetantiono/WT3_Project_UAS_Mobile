import { APIList } from '../APIConfig'
import fetchNoCache from '../libraries/fetchNoCache'

export const PeminjamanManagement = {
    // getListBook: (update) => {
    //     return fetchNoCache(update, APIList.API_GET_BUKU, 'GET')
    // },
    pinjamBukuWithId: (post_data, update) => {
        return fetchNoCache(update, APIList.API_PINJAM_BUKU, 'POST',post_data)
    },
    kembalikanBukuWithId: (post_data, update) => {
        return fetchNoCache(update, APIList.API_KEMBALIKAN_BUKU, 'POST',post_data)
    },
    // getListBookByKategori: (API_VAL, update) => {
    //     let API_VALUE = APIList.API_GET_BUKU_BY_KATEGORI + API_VAL
    //     return fetchNoCache(update, API_VALUE, 'GET')
    // },
    // getListRestaurant: (update) => {
    //     return fetchNoCache(update, APIList.API_GET_RESTAURANT, 'GET')
    // },
}
