import { APIList } from '../APIConfig'
import fetchNoCache from '../libraries/fetchNoCache'

export const RestaurantManagement = {
    getListRestaurant: (update) => {
        return fetchNoCache(update, APIList.API_GET_RESTAURANT, 'GET')
    },
}
