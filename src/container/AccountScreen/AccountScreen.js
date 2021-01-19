import React, { useEffect, useRef, useState } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { Colors, Fonts, Metrics, Images } from '../../GlobalConfig';
import FontAwesome from "react-native-vector-icons/FontAwesome";
export default (props) => {
    const [isLoading, setisLoading] = useState(false)
    useEffect(() => {
        setisLoading(false)
    }, [])

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
                    <Text numberOfLines={1} style={styles.userNameTextStyle}>Alexander Gracetantiono</Text>
                </View>
            </View>
            <View style={styles.contentContainer}>

            </View>
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
    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderColor: Colors.GRAY_LIGHT
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
})