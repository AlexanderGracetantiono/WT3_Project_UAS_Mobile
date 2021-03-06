import { Dimensions, Platform } from "react-native"

export const SafeAreaPadding = {
    contentHorizontalPadding: 15,
    contentVerticalPadding: 15,
}
export const Colors = {
    BLUE_DARK: "#14274e",
    BLUE_DARK_LIGHT: "#394867",
    WHITE_LIGHT_GRAY: "#f1f6f9",

    RED_DARK: "#5e0003",
    RED: '#910005',
    GREEN: '#3A8048',
    BLACK: '#000000',
    GRAY: '#a7a9ab',
    GRAY_LIGHT: '#efefef',
    WHITE: '#ffffff',
    BLUE: '#0691ce',
    ORANGE:'#ffbb1c',
    GRAY_LOGIN_BG:'#f1f1f1ff',

}

export const Metrics = Object.freeze({
    SAFE_AREA: 16,
    SCREEN_WIDTH: Dimensions.get('window').width,
    SCREEN_HEIGHT: Dimensions.get('window').height,
    NAVBAR_HEIGHT: 56
})
export const Fonts = {
    APEX_BOLD: 'ApexNew-Bold',
    APEX_REGULAR: 'ApexNew-Book',
    APEX_MEDIUM: 'ApexNew-Medium',
    MINION_REGULAR: 'MinionPro-Regular',
    INTER_BOLD: "Inter-Bold",
    INTER_LIGHT: "Inter-Light",
    INTER_MEDIUM: "Inter-Medium",
    INTER_REGULAR: "Inter-Regular",
    INTER_SEMI_BOLD: "Inter-SemiBold",
}
export const StorageKeys = {
    userData: 'user_data',
}
export const Images = {
    ILLUST_LOGIN: require("./assets/img/illust_book_jpg.jpg"),
    ILLUST_NO_IMG: require("./assets/img/illust_no_product_image.png"),
    LOGO_APP: require("./assets/img/book_logo.png"),
}