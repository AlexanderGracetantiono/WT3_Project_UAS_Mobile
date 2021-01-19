const BASE_URL_LOCAL = 'http://192.168.0.8:3000/' 

const BASE_URL = BASE_URL_LOCAL


const APIRoot = {
    ROOT_BUKU_MASTER: `${BASE_URL}buku`,
}

// API List
export const APIList = {
    //Book Master
    API_GET_BUKU: `${APIRoot.ROOT_BUKU_MASTER}`,
    API_GET_BUKU_BY_JUDUL: `${APIRoot.ROOT_BUKU_MASTER}/judul/`,
    API_GET_BUKU_BY_KATEGORI: `${APIRoot.ROOT_BUKU_MASTER}/kategori/`,
    
}