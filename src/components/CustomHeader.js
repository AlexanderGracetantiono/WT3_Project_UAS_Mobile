import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    TextInput,
    Keyboard
} from 'react-native'
import { Colors, Fonts, Metrics } from '../GlobalConfig'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Actions } from 'react-native-router-flux';

export default (props) => {
    const {
        title,
        isOutline,
        onBackClickAction,
        onSearchCancel
    } = props
    const [isHeaderVisible, setIsHeaderVisible] = useState(true)
    const [isSearchInputDisable, setIsSearchInputDisable] = useState(true)
    const [searchValue, setSearchValue] = useState("")
    const [animatedSearchBoxValue] = useState(new Animated.Value(0))
    useEffect(() => {
        setSearchValue("")
        setIsHeaderVisible(true)
        setIsSearchInputDisable(true)
        searchBoxHide()
        Keyboard.dismiss()
    }, [])

    const searchBoxHide = () => {
        if (onSearchCancel && searchValue != "") {
            props.onSearchCancel()
        }
        Keyboard.dismiss()
        setIsSearchInputDisable(true)
        Animated.timing(
            animatedSearchBoxValue,
            {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }
        ).start(() => {
            setSearchValue("")
            setIsHeaderVisible(true)
        })
    }
    const searchBoxExpand = () => {
        setIsHeaderVisible(false)
        setIsSearchInputDisable(false)
        Animated.timing(
            animatedSearchBoxValue,
            {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }
        ).start(() => {
            console.log("Show Search Bar")
        })
    }
    const onSearchClicked = () => {
        props.onSearchAction(searchValue)
        Keyboard.dismiss()
    }
    const animatedSearchBoxExpand = animatedSearchBoxValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });
    const animatedSearchBoxOpacity = animatedSearchBoxValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });
    const actionOpenDrawer = () => {
        Actions.drawerOpen()
    };
    return (
        <View style={[
            styles.container,
            isOutline ? { backgroundColor: Colors.WHITE_LIGHT_GRAY } : null
        ]}>
            {
                props.handleBackNavigation ?
                    <TouchableOpacity
                        style={[styles.qrIconContainer]}
                        onPress={onBackClickAction ? onBackClickAction : () => Actions.pop()}>
                        <FontAwesome
                            size={16}
                            name={"chevron-left"}
                            color={isOutline ? Colors.BLUE_DARK : Colors.WHITE}
                        />
                    </TouchableOpacity> : null
            }
            {
                props.isNavigation ?
                    <TouchableOpacity style={styles.navigationBurgerContainer} onPress={actionOpenDrawer}>
                        <FontAwesome
                            size={20}
                            name={"bars"}
                            color={Colors.WHITE}
                        />
                    </TouchableOpacity> : null
            }
            {
                isHeaderVisible ?
                    <View style={styles.titleContainer}>
                        <Text style={[
                            styles.titleStyle,
                            isOutline ? { color: Colors.BLUE_DARK } : null
                        ]}>
                            {title}
                        </Text>
                    </View> : null
            }

            {
                props.isAddCustomerAvailable ?
                    <TouchableOpacity style={[styles.qrIconContainer]} onPress={props.addCustomerAction}>
                        <FontAwesome
                            size={20}
                            name={"user-plus"}
                            color={isOutline ? Colors.BLUE_DARK : Colors.WHITE}
                        />
                    </TouchableOpacity> : null
            }
            {
                props.searchOptions ?
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Animated.View
                            style={[
                                styles.searchBoxStyle,
                                {
                                    width: animatedSearchBoxExpand,
                                    opacity: animatedSearchBoxOpacity,
                                    // paddingTop: 10,
                                    // transform: [{
                                    //     translateY: animatedSearchBoxExpand
                                    // }]
                                }
                            ]}>
                            <TextInput
                                disable={isSearchInputDisable}
                                placeholder={props.placeholderSearchBox}
                                placeholderTextColor={Colors.GRAY}
                                style={styles.searchBarInputBoxStyle}
                                value={searchValue}
                                onChangeText={setSearchValue}
                                numberOfLines={1}
                            />
                            <TouchableOpacity
                                style={styles.searchBoxSearchIconContainer} onPress={onSearchClicked}>
                                <FontAwesome
                                    size={16}
                                    name={"search"}
                                    color={Colors.BLUE_DARK}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.searchBoxCancelContainer} onPress={searchBoxHide}>
                                <Text style={styles.searchBoxTextCancel}>
                                    Batal
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                    : null
            }
            {
                props.searchOptions ?
                    isHeaderVisible ?
                        <TouchableOpacity style={styles.qrIconContainer} onPress={searchBoxExpand}>
                            <FontAwesome
                                size={16}
                                name={"search"}
                                color={isOutline ? Colors.BLUE_DARK : Colors.WHITE}
                            />
                        </TouchableOpacity>
                        : null
                    : null
            }
            {
                props.isQRAvailable ?
                    <TouchableOpacity style={styles.qrIconContainer} onPress={props.scanQRAction}>
                        <FontAwesome
                            size={20}
                            name={"barcode"}
                            color={isOutline ? Colors.BLUE_DARK : Colors.WHITE}
                        />
                    </TouchableOpacity> : null
            }
            {
                props.onFilterActionClick ?
                    <TouchableOpacity style={styles.qrIconContainer} onPress={props.onFilterActionClick}>
                        <FontAwesome
                            size={20}
                            name={"filter"}
                            color={isOutline ? Colors.BLUE_DARK : Colors.WHITE}
                        />
                    </TouchableOpacity> : null
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Metrics.NAVBAR_HEIGHT,
        backgroundColor: Colors.BLUE_DARK,
        color: Colors.WHITE_LIGHT_GRAY,
        flexDirection: 'row',
        elevation: 5,
        paddingHorizontal: Metrics.SAFE_AREA,
        alignItems: 'center'
    },
    searchBarInputBoxStyle: {
        flex: 1,
        fontSize: 12,
        fontFamily: Fonts.INTER_REGULAR,
        color: Colors.BLUE_DARK,
        paddingVertical: 5,
        paddingHorizontal: 14,
    },
    searchBoxTextCancel: {
        fontSize: 12,
        fontFamily: Fonts.INTER_REGULAR,
        color: Colors.RED_DARK,
    },
    titleContainer: {
        flex: 1
    },
    searchBoxStyle: {
        width: 10,
        height: '60%',
        backgroundColor: Colors.WHITE,
        borderWidth: 1,
        borderColor: Colors.GRAY,
        borderRadius: 6,
        flexDirection: 'row'
    },
    navigationBurgerContainer: {
        marginRight: 20,
        height: '100%',
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    qrIconContainer: {
        marginHorizontal: 5,
        height: '100%',
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 4,
    },
    searchBoxSearchIconContainer: {
        marginHorizontal: 5,
        height: '100%',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 4,
    },
    searchBoxCancelContainer: {
        height: '100%',
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 4,
    },
    titleStyle: {
        fontFamily: Fonts.INTER_MEDIUM,
        fontSize: 14,
        color: Colors.WHITE_LIGHT_GRAY
    }
})