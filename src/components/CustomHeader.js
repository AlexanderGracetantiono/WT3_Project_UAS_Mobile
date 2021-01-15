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
        handleBackNavigation
    } = props
    useEffect(() => {
        
    }, [])
    const actionOpenDrawer = () => {
        Actions.drawerOpen()
    }
    return (
        <View style={[
            styles.container,
            isOutline ? { backgroundColor: Colors.WHITE_LIGHT_GRAY } : null
        ]}>
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
                handleBackNavigation ?
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
            <View style={styles.titleContainer}>
                <Text style={[
                    styles.titleStyle,
                    isOutline ? { color: Colors.BLUE_DARK } : null
                ]}>
                    {title}
                </Text>
            </View>
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
        fontFamily: Fonts.INTER_BOLD,
        fontSize: 16,
        color: Colors.WHITE_LIGHT_GRAY
    }


})