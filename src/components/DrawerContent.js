import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    FlatList,
    Animated,
    TouchableOpacity
} from "react-native";
import { Colors, StorageKey, Images, Fonts, Metrics, StorageKeys } from '../GlobalConfig';
import { Actions } from 'react-native-router-flux';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-community/async-storage';
export default (props) => {
    const [menuList, setMenuList] = useState([])
    const [userData, setUserData] = useState({})
    useEffect(() => {
        setUserData({})
        setMenuList([
            {
                id: "1",
                name: "Home",
                icon: "home",
                action_id: "home",
            },
            {
                id: "2",
                name: "User Account",
                icon: "user",
                action_id: "account",
            },
            {
                id: "5",
                name: "Logout",
                icon: "sign-out",
                action_id: "logout",
            },
        ])
    }, [])
    useEffect(() => {
        AsyncStorage.getItem(StorageKeys.userData, (err, res) => {
            let get_data_user = JSON.parse(res)
            if (get_data_user != null)
                if (get_data_user.id == 0) {
                    setMenuList([
                        {
                            id: "1",
                            name: "Home",
                            icon: "home",
                            action_id: "home",
                        },
                        {
                            id: "5",
                            name: "Login",
                            icon: "sign-out",
                            action_id: "logout",
                        },
                    ])
                }
            setUserData(get_data_user)
        })
    }, [Actions.currentScene])
    const onMenuClicked = (item) => () => {
        switch (item) {
            case "home":
                if (Actions.currentScene != "home") {
                    Actions.home()
                } else {
                    Actions.drawerClose()
                }
                break;
            case "account":
                Actions.accountScreen()
                break;
            case "logout":
                AsyncStorage.removeItem(StorageKeys.userData)
                Actions.login()
                break;
            default:
                break;
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.userIconContainer}>
                    <FontAwesome
                        size={35}
                        name={"user"}
                        color={Colors.BLUE_DARK_LIGHT}
                    />
                </View>
                <View style={styles.userDetailContainer}>
                    <Text numberOfLines={1} style={styles.userNameTextStyle}>
                        {userData ? userData.name : "Alexander Grace."}
                    </Text>
                    <Text numberOfLines={1} style={styles.userCompanyNameStyle}>
                        {userData ? userData.company : "Univ. Kwik Kian Gie"}
                    </Text>
                </View>
            </View>
            <FlatList
                data={menuList}
                extraData={[menuList]}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={onMenuClicked(item.action_id)}
                            style={styles.drawerContentContainer}>
                            <FontAwesome
                                size={30}
                                name={item.icon}
                                color={Colors.BLUE_DARK_LIGHT}
                            />
                            <Text numberOfLines={1} style={styles.drawerMenuTitleText}>{item.name}</Text>
                            <FontAwesome
                                size={20}
                                name={"chevron-right"}
                                color={Colors.BLUE_DARK_LIGHT}
                            />
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item, index) => {
                    return String(item.id)
                }}
            />
            <View style={{ flex: 1 }} />
            <View style={styles.footerBottomContainer}>
                <Text style={styles.footerTextStyle}>Version 1.0</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE_LIGHT_GRAY,
    },
    headerContainer: {
        width: '100%',
        height: 180,
        paddingTop: 10,
        backgroundColor: Colors.BLUE_DARK,
        justifyContent: "center",
        paddingHorizontal: Metrics.SAFE_AREA
    },
    userIconContainer: {
        height: 45,
        width: 45,
        backgroundColor: Colors.WHITE_LIGHT_GRAY,
        borderRadius: 100,
        marginVertical: 15,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemImageStyle: {
        width: '100%',
        height: '100%'
    },
    userDetailContainer: {
        width: '100%',
        height: 50,

    },
    userNameTextStyle: {
        fontSize: 14,
        fontFamily: Fonts.INTER_SEMI_BOLD,
        color: Colors.GRAY_LIGHT,
        letterSpacing: 0.5,
        marginBottom: 5,
    },
    drawerMenuTitleText: {
        fontSize: 16,
        fontFamily: Fonts.INTER_SEMI_BOLD,
        color: Colors.BLUE_DARK,
        letterSpacing: 0.5,
        flex: 1,
        marginLeft: 10,
    },
    userCompanyNameStyle: {
        fontSize: 12,
        fontFamily: Fonts.INTER_SEMI_BOLD,
        color: Colors.GRAY,
        letterSpacing: 0.5
    },
    headerLogoStyle: {
        flex: 1,
        width: "100%",
        height: "auto",
        resizeMode: "contain",
        // backgroundColor:'red'
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: Metrics.SAFE_AREA
    },
    drawerContentContainer: {
        paddingHorizontal: Metrics.SAFE_AREA,
        width: '100%',
        backgroundColor: Colors.WHITE_LIGHT_GRAY,
        height: 50,
        marginTop: 5,
        borderBottomColor: Colors.GRAY_LIGHT,
        borderBottomWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    footerBottomContainer: {
        width: '100%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerTextStyle: {
        fontFamily: Fonts.INTER_SEMI_BOLD,
        color: Colors.GRAY,
        fontSize: 12,
    }
})