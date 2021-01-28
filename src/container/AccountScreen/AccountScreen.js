import React, { useEffect, useRef, useState } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { Colors, Fonts, Metrics, Images, StorageKeys } from '../../GlobalConfig';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-community/async-storage';
import { BookManagement } from "../../models/BookManagement";
import CustomButton from "../../components/CustomButton";
import { wait } from "../../GlobalFunction";
import CustomFullLoading from "../../components/CustomFullLoading";
import { UserManagement } from "../../models/UserManagement";
export default (props) => {
    const [isLoading, setisLoading] = useState(false)
    const [userData, setUserData] = useState({})
    const [detailUser, setDetailUser] = useState({})
    const [isLoadingScreen, setIsLoadingScreen] = useState(false)
    const [bookDetail, setBookDetail] = useState(null)
    useEffect(() => {
        setIsLoadingScreen(true)
        setisLoading(false)
        setBookDetail(null)
        AsyncStorage.getItem(StorageKeys.userData, (err, res) => {
            let get_data_user = JSON.parse(res)
            setDetailUser(get_data_user.detailUser)
            setUserData(get_data_user)
            handleGetUser(get_data_user.id)
        })
    }, [])
    const handleGetUser = (user_id) => {
        setisLoading(true)
        UserManagement.getUserAccount(user_id, res => {
            const { status, result } = res
            let user_detail = result
            switch (status) {
                case 200:
                    let dataUser = {
                        name: user_detail.nama,
                        company: user_detail.email,
                        id: user_detail.id_account,
                        allow_pinjam: 1,
                        detailUser: user_detail
                    }
                    AsyncStorage.setItem(StorageKeys.userData, JSON.stringify(dataUser))
                    wait(200)
                        .then(() => {
                            if (user_detail.id_buku_pinjaman != null) {
                                getBookById(user_detail.id_buku_pinjaman)
                            }
                            setisLoading(false)
                        })
                    break;
                case 400:
                    wait(200)
                        .then(() => {
                            setisLoading(false)
                        })
                    break;
                default:
                    wait(200)
                        .then(() => {
                            setisLoading(false)
                        })
                    break;
            }

        })
    }
    const getBookById = (bookId = "") => {
        setIsLoadingScreen(true)
        BookManagement.getBookById(bookId, res => {
            const { status, result } = res
            switch (status) {
                case 200:
                    setBookDetail(result)
                    wait(200)
                        .then(() => {
                            setIsLoadingScreen(false)
                        })
                    break;
                case 400:
                    setBookDetail({})
                    wait(200)
                        .then(() => {
                            setIsLoadingScreen(false)
                        })
                    break;
                default:
                    setBookDetail({})
                    wait(200)
                        .then(() => {
                            setIsLoadingScreen(false)
                        })
                    break;
            }
        })
    }
    return (
        <View style={styles.container}>
            <CustomHeader
                title={"Profile"}
                isOutline={true}
                handleBackNavigation={true}
            />
            <View style={styles.profileContainer}>
                <View style={styles.userIconContainer}>
                    <FontAwesome
                        size={35}
                        name={"user"}
                        color={Colors.WHITE}
                    />
                </View>
                <View style={styles.userDetailContainer}>
                    <Text numberOfLines={1} style={[styles.userNameTextStyle, { fontSize: 16 }]}>
                        {userData ? userData.name : "Alexander Gracetantiono"}
                        {console.log("DATA: ", userData)}
                    </Text>
                    <Text numberOfLines={1} style={styles.userNameTextStyle}>
                        {detailUser ? detailUser.email : "email@gmail.com"}
                    </Text>
                </View>
            </View>
            {isLoadingScreen ?
                <CustomFullLoading /> :
                <ScrollView style={styles.contentContainer}>
                    <View style={{ width: '100%', marginBottom: 10 }}>
                        <Text numberOfLines={1} style={styles.titleFontStyle}>Detail Peminjaman</Text>
                    </View>
                    {console.log(":DATa", bookDetail)}
                    {bookDetail != null ?
                        <View style={{ flex: 1 }}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.imgBG} source={Images.ILLUST_NO_IMG} />
                                {bookDetail.cover && <Image style={styles.imgStyleDefault} source={{ uri: bookDetail.cover }} />}
                            </View>
                            <View style={styles.cardContainer}>
                                <View style={styles.titleContainer}>
                                    <Text numberOfLines={1} style={styles.titleTextStyle} >{bookDetail.judul}</Text>
                                </View>
                                <View style={styles.titleContainer}>
                                    <Text numberOfLines={1} style={styles.titleTextStyle} >ISBN : {bookDetail.isbn}</Text>
                                </View>
                                <View style={styles.titleContainer}>
                                    <Text numberOfLines={1} style={styles.titleTextStyle} >Penulis : {bookDetail.penulis}</Text>
                                </View>
                                <View style={styles.titleContainer}>
                                    <Text numberOfLines={1} style={styles.titleTextStyle} >Tahun : {bookDetail.tahun}</Text>
                                </View>
                                <View style={styles.descContainer}>
                                    <Text style={styles.titleTextStyle} >{bookDetail.ket}</Text>
                                </View>
                            </View>
                        </View> :
                        <View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' }}>
                            <Text numberOfLines={1} style={styles.titleFontStyle}>Belum melakukan peminjaman</Text>
                        </View>
                    }
                </ScrollView >
            }
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.WHITE,
        alignItems: 'center'
    },
    contentContainer: {
        width: '100%',
        height: '100%',
        marginTop: 10,
        paddingHorizontal: Metrics.SAFE_AREA
    },
    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderColor: Colors.GRAY_LIGHT,
    },
    userIconContainer: {
        height: 45,
        width: 45,
        backgroundColor: Colors.BLUE_DARK,
        borderRadius: 100,
        marginVertical: 15,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userDetailContainer: {
        width: '100%',
        alignItems: 'center'
    },
    userNameTextStyle: {
        fontSize: 14,
        fontFamily: Fonts.INTER_SEMI_BOLD,
        color: Colors.BLUE_DARK,
        letterSpacing: 0.5,
        marginBottom: 5,
    },
    titleFontStyle: {
        fontSize: 15,
        fontFamily: Fonts.INTER_BOLD,
        color: Colors.BLUE_DARK,
        letterSpacing: 0.5,
    },
    imageContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: Metrics.SAFE_AREA
    },
    imgBG: {
        width: '60%',
        height: 180,
        position: 'absolute',
        resizeMode: 'contain'
    },
    imgStyleDefault: {
        width: Metrics.SCREEN_WIDTH / 1.5,
        height: Metrics.SCREEN_WIDTH / 1.3,
        resizeMode: 'contain'
    },
    cardContainer: {
        width: '90%',
        minHeight: 100,
        backgroundColor: Colors.WHITE,
        elevation: 5,
        marginHorizontal: Metrics.SAFE_AREA,
        marginVertical: Metrics.SAFE_AREA
    },
    titleContainer: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Metrics.SAFE_AREA,
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderColor: Colors.GRAY_LIGHT
    },
    descContainer: {
        width: '100%',
        minHeight: 50,
        paddingHorizontal: Metrics.SAFE_AREA,
        borderBottomWidth: 2,
        borderColor: Colors.GRAY_LIGHT
    },
    titleTextStyle: {
        fontSize: 14,
        fontFamily: Fonts.INTER_BOLD,
        color: Colors.BLUE_DARK
    },
    ratingStyle: {
        fontSize: 14,
        fontFamily: Fonts.INTER_BOLD,
        color: Colors.WHITE,
        marginLeft: 3
    },
    starContainer: {
        backgroundColor: Colors.ORANGE,
        padding: 3,
        minWidth: 50,
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnContainer: {
        backgroundColor: 'red',
        width: '100%',
        height: 50
    }
})