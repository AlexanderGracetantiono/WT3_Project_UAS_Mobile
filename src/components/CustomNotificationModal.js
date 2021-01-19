import React, { useState, useEffect } from 'react';
import {
    Animated,
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';

import { Fonts, Colors, Metrics } from '../GlobalConfig';
import Modal from 'react-native-modal';
import FontAwesome from "react-native-vector-icons/FontAwesome";
/**
 * add noStatusBar props if no status bar / translucent
 * add noHeader props if no header
 */
export default ((props, ref) => {
    const {
        isShowModal,
        handleCloseModal,
        handleSubmitModal
    } = props
    const [showNotif, setShowNotif] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [genreList, setGenreList] = useState([])
    const [genreSelected, setGenreSelected] = useState({})

    useEffect(() => {
        setIsLoading(false)
        setGenreSelected({
            id: 6,
            name: 'All'
        })
        setGenreList([
            {
                id: 1,
                name: 'Novel'
            },
            {
                id: 2,
                name: 'Komik'
            },
            {
                id: 3,
                name: 'Action'
            },
            {
                id: 4,
                name: 'Mystery'
            },
            {
                id: 5,
                name: 'Drama'
            },
            {
                id: 6,
                name: 'All'
            },
        ])
    }, [])
    const genreSelectedAction = (genre = null) => () => {
        console.log(genre)
        setGenreSelected(genre)
    }
    const ShowModalFunction = (
        actionFunction = null
    ) => {
        setShowNotif(true)
    }

    const modalNotif = (
        <View style={[styles.notifModalContainer]}>
            <View style={styles.notifModalHeader}>
                <Text style={styles.notifModalHeaderTitle}>Select Kategori</Text>
            </View>
            <View style={styles.contentContainer}>
                <FlatList
                    data={genreList}
                    extraData={[genreList]}
                    contentContainerStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={genreSelectedAction(item)}
                                style={[
                                    styles.itemContainer,
                                    item.id == genreSelected.id && { backgroundColor: Colors.BLUE_DARK }
                                ]}>
                                <Text numberOfLines={1}
                                    style={[
                                        styles.itemTitleText,
                                        item.id == genreSelected.id && { color: Colors.WHITE }
                                    ]}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item, index) => {
                        return String(item.id)
                    }} />
            </View>
            <TouchableOpacity
                onPress={handleSubmitModal(genreSelected)}
                style={[styles.buttonContainer, { right: Metrics.SAFE_AREA }]}>
                <Text style={[styles.notifModalHeaderTitle]}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleCloseModal}
                style={[styles.buttonContainer, { left: Metrics.SAFE_AREA, backgroundColor: Colors.RED_DARK, width: 55 }]}>
                <Text style={[styles.notifModalHeaderTitle]}>Cancel</Text>
            </TouchableOpacity>
        </View>)
    return (
        <Modal
            avoidKeyboard={Platform.OS === "ios" ? true : false}
            children={modalNotif}
            animationIn={'slideInDown'}
            animationOut={'slideOutUp'}
            style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
            isVisible={isShowModal} />
    );
})

const styles = StyleSheet.create({
    notifModalContainer: {
        height: Metrics.SCREEN_HEIGHT - 200,
        width: Metrics.SCREEN_WIDTH - 100,
        alignItems: 'center',
        backgroundColor: Colors.WHITE_LIGHT_GRAY,
        borderRadius: 10,
        overflow: 'hidden'
    },
    notifModalHeader: {
        height: 50,
        width: '100%',
        backgroundColor: Colors.BLUE_DARK,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notifModalHeaderTitle: {
        fontFamily: Fonts.INTER_SEMI_BOLD,
        fontSize: 16,
        color: Colors.WHITE
    },
    itemTitleText: {
        fontFamily: Fonts.INTER_REGULAR,
        fontSize: 14,
        color: Colors.BLUE_DARK
    },
    contentContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        paddingHorizontal: Metrics.SAFE_AREA
    },
    columnWrapperCustomStyle: {

    },
    itemContainer: {
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderRadius: 5,
        margin: 5,
        backgroundColor: Colors.GRAY_LIGHT
    },
    buttonContainer: {
        width: 45,
        height: 30,
        position: 'absolute',
        bottom: Metrics.SAFE_AREA,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.BLUE_DARK
    }
});