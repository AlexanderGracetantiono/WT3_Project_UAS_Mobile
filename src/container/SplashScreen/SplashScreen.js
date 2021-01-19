import React, { useEffect, useRef, useState } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";
import { Colors, Fonts, Metrics, Images,StorageKeys } from '../../GlobalConfig';
import AsyncStorage from '@react-native-community/async-storage';
import { wait } from "../../GlobalFunction";
import { Actions } from "react-native-router-flux";
export default (props) => {
    useEffect(() => {
        wait(2000)
        .then(() => {
            AsyncStorage.getItem(StorageKeys.userData, (err, res) => {
                console.log("RES",res)
                if (res) {
                    Actions.home()
                }
                else Actions.login()
            })
        })
    }, [])

    return (
        <View style={styles.container}>
            <Image source={Images.LOGO_APP} style={styles.illustLoginStyle} />
            <Text style={styles.desctext}>We Educate People</Text>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.GRAY_LOGIN_BG,
        alignItems: 'center',
        justifyContent: 'center'
    },
    illustLoginStyle: {
        width: Metrics.SCREEN_WIDTH / 1.7,
        height: Metrics.SCREEN_WIDTH / 1.7,
        resizeMode: 'contain'
    },
    desctext: {
        fontFamily: Fonts.INTER_SEMI_BOLD,
        fontSize: 22,
        color: Colors.BLUE_DARK,
        marginTop: 10
    }
})