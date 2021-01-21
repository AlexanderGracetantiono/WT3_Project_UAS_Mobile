import React, { useEffect, useRef, useState } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";
import { Colors, Fonts, Metrics, Images } from '../../GlobalConfig';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomHeader from "../../components/CustomHeader";
import CustomFullLoading from "../../components/CustomFullLoading";
import { BookManagement } from "../../models/BookManagement";
import { wait } from "../../GlobalFunction";
import { Actions } from "react-native-router-flux";
import CustomNotificationModal from "../../components/CustomNotificationModal";

import { LogBox } from 'react-native';
export default (props) => {
    const [bookListData, setBookListData] = useState([])
    const [genreList, setGenreList] = useState([])
    const [isLoading, setIsLoading] = useState()
    const [isSelectCatModalShow, setIsSelectCatModalShow] = useState(false)
    useEffect(() => {
        LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
        LogBox.ignoreAllLogs();//Ignore all log notifications

        setIsSelectCatModalShow(false)
        setIsLoading(true)
        setBookListData([])
        setGenreList([])
        getListKategori()
    }, [])
    const getListBook = () => {
        setIsLoading(true)
        BookManagement.getListBook(res => {
            const { status, result } = res
            switch (status) {
                case 200:
                    setBookListData(result.data)
                    wait(200)
                        .then(() => {
                            setIsLoading(false)
                        })
                    break;
                case 400:
                    setBookListData([])
                    wait(200)
                        .then(() => {
                            setIsLoading(false)
                        })
                    break;
                default:
                    setBookListData([])
                    wait(200)
                        .then(() => {
                            setIsLoading(false)
                        })
                    break;
            }
        })
    }
    const getListBookByValue = (searchValue = "") => {
        setIsLoading(true)
        BookManagement.getListBookBySearch(searchValue, res => {
            const { status, result } = res
            switch (status) {
                case 200:
                    setBookListData(result)
                    wait(200)
                        .then(() => {
                            setIsLoading(false)
                        })
                    break;
                case 400:
                    setBookListData([])
                    wait(200)
                        .then(() => {
                            setIsLoading(false)
                        })
                    break;
                default:
                    setBookListData([])
                    wait(200)
                        .then(() => {
                            setIsLoading(false)
                        })
                    break;
            }
        })
    }
    const getListBookByKategori = (kategori = "") => {
        setIsLoading(true)
        console.log("KAT:",kategori)
        BookManagement.getListBookByKategori(kategori, res => {
            const { status, result } = res
            switch (status) {
                case 200:
                    setBookListData(result)
                    wait(200)
                        .then(() => {
                            setIsLoading(false)
                        })
                    break;
                case 400:
                    setBookListData([])
                    wait(200)
                        .then(() => {
                            setIsLoading(false)
                        })
                    break;
                default:
                    setBookListData([])
                    wait(200)
                        .then(() => {
                            setIsLoading(false)
                        })
                    break;
            }
        })
    }
    const getListKategori = () => {
        setIsLoading(false)
        BookManagement.getListKategoriBook(res => {
            const { status, result } = res
            switch (status) {
                case 200:
                    var listData = [...result];
                    listData.push({
                        kd_kategoribuku: listData.length+2,
                        nm_kategoribuku: "All",
                    })
                    console.log("GENREL ", listData)
                    setGenreList(listData)
                    wait(200)
                        .then(() => {
                            getListBook()
                        })
                    break;
                case 400:
                    setGenreList([])
                    break;
                default:
                    setGenreList([])
                    break;
            }
        })
    }
    const redirectDetailBook = (item) => () => {
        Actions.detailScreen({ item: item })
    }
    //Search Bar
    const searchItemByValue = (value) => {
        getListBookByValue(value)
    }
    const searchItemCancelAction = () => {
        getListBook()
    }
    //MODAL GET KATEGORI
    const handleCloseModal = () => {
        setIsSelectCatModalShow(false)
    }
    const handleSubmitModal = (value) => () => {
        setIsSelectCatModalShow(false)
        if (value.nm_kategoribuku == "All") {
            getListBook()
        } else {
            getListBookByKategori(value.nm_kategoribuku)
        }
    }
    const handleOpenModal = () => {
        setIsSelectCatModalShow(true)
    }

    return (
        <View style={styles.container}>
            <CustomNotificationModal
                handleSubmitModal={handleSubmitModal}
                handleCloseModal={handleCloseModal}
                dataList={genreList}
                isShowModal={isSelectCatModalShow} />
            <CustomHeader
                title="Book"
                isNavigation={true}
                searchOptions={true}
                onFilterActionClick={handleOpenModal}

                onSearchAction={searchItemByValue}
                onSearchCancel={searchItemCancelAction}
                placeholderSearchBox={"Cari buku, e.g. 'Komi San'"}
            />
            {
                isLoading ?
                    <CustomFullLoading /> :
                    <FlatList
                        data={bookListData}
                        extraData={[bookListData]}
                        horizontal={false}
                        numColumns={2}
                        columnWrapperStyle={styles.columnWrapperCustomStyle}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={redirectDetailBook(item)}
                                    style={styles.itemContainer}>
                                    <Image style={styles.imgStyleDefault} source={Images.ILLUST_NO_IMG} />
                                    <Image style={styles.imgStyle} source={{ uri: item.cover }} />
                                    <Text numberOfLines={2} style={styles.itemTitleText}>{item.judul}</Text>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item, index) => {
                            return String(item.kd_buku)
                        }} />
            }
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    itemContainer: {
        width: 150,
        height: 250,
        elevation: 10,
        backgroundColor: Colors.WHITE_LIGHT_GRAY,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgStyle: {
        width: '100%',
        height: 220,
    },
    imgStyleDefault: {
        width: '70%',
        height: 200,
        position: 'absolute',
        resizeMode: 'contain'
    },
    itemTitleText: {
        fontFamily: Fonts.INTER_SEMI_BOLD,
        fontSize: 12,
        color: Colors.BLUE_DARK,
        textAlign: 'center'
    },
    columnWrapperCustomStyle: {
        paddingHorizontal: Metrics.SAFE_AREA,
        justifyContent: 'space-between',
        paddingVertical: Metrics.SAFE_AREA
    }
})