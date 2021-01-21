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
import { Colors, Fonts, Images, Metrics, StorageKeys } from '../../GlobalConfig';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomHeader from "../../components/CustomHeader";
import { wait } from "../../GlobalFunction";
import CustomButton from "../../components/CustomButton";
import { PeminjamanManagement } from "../../models/PeminjamanManagement";
import AsyncStorage from '@react-native-community/async-storage';
import { BookManagement } from "../../models/BookManagement";
import CustomFullLoading from "../../components/CustomFullLoading";
export default (props) => {
    const {
        item
    } = props
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingScreen, setIsLoadingScreen] = useState(false)
    const [userData, setUserData] = useState({})
    const [bookDetail, setBookDetail] = useState({})
    useEffect(() => {
        setUserData({})
        setBookDetail({})
        setIsLoading(false)
        setIsLoadingScreen(true)
        AsyncStorage.getItem(StorageKeys.userData, (err, res) => {
            let get_data_user = JSON.parse(res)
            setUserData(get_data_user)
        })
        getBookById(item.kd_buku)
    }, [])
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
    const handleRequestPeminjaman = () => {
        setIsLoading(true)
        const formdata = {
            'user_id': userData.id,
            'book_id': item.kd_buku
        }
        PeminjamanManagement.pinjamBukuWithId(formdata, res => {
            const { status, result } = res
            switch (status) {
                case 200:
                    wait(200)
                        .then(() => {
                            setIsLoading(false)
                            getBookById(item.kd_buku)
                        })
                    break;
                case 400:
                    wait(200)
                        .then(() => {
                            setIsLoading(false)
                        })
                    break;
                default:
                    wait(200)
                        .then(() => {
                            setIsLoading(false)
                        })
                    break;
            }

        })
    }
    const handleRequestPengembalian = () => {
        setIsLoading(true)
        const formdata = {
            'user_id': userData.id,
            'book_id': item.kd_buku
        }
        PeminjamanManagement.kembalikanBukuWithId(formdata, res => {
            const { status, result } = res
            switch (status) {
                case 200:
                    wait(200)
                        .then(() => {
                            setIsLoading(false)
                            getBookById(item.kd_buku)
                        })
                    break;
                case 400:
                    wait(200)
                        .then(() => {
                            setIsLoading(false)
                        })
                    break;
                default:
                    wait(200)
                        .then(() => {
                            setIsLoading(false)
                        })
                    break;
            }

        })
    }
    return (
        <View style={styles.container}>
            <CustomHeader
                title="Book Detail"
                handleBackNavigation={true}
            />
            {isLoadingScreen ?
                <CustomFullLoading /> :
                <ScrollView style={{ flex: 1 }}>
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
                    <View style={styles.btnContainer}>
                        {bookDetail.status_buku == 1 ?
                            userData.id == bookDetail.id_peminjam ?
                                <CustomButton
                                    style={{ borderRadius: 0, height: '100%', backgroundColor: Colors.RED_DARK }}
                                    isLoading={isLoading}
                                    onPress={handleRequestPengembalian}
                                    label={"Kembalikan Buku"}
                                />
                                :
                                <CustomButton
                                    isDisabled={true}
                                    style={{ borderRadius: 0, height: '100%' }}
                                    isLoading={isLoading}
                                    label={"Tidak Tersedia"}
                                />
                            :
                            <CustomButton
                                style={{ borderRadius: 0, height: '100%' }}
                                isLoading={isLoading}
                                onPress={handleRequestPeminjaman}
                                label={"Request Peminjaman"}
                            />
                        }
                    </View>
                </ScrollView >
            }
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE
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