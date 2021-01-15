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
import { RestaurantManagement } from "../../models/RestaurantManagement";
import { wait } from "../../GlobalFunction";
import { Actions } from "react-native-router-flux";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
export default (props) => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setisLoading] = useState(false)
    useEffect(() => {
        setUserName("")
        setPassword("")
        setisLoading(false)
    }, [])
    const redirectDetailRestaurant = (item) => () => {
        Actions.detailScreen({ item: item })
    }
    const handleLogin = () => {
        setisLoading(true)
        wait(200)
            .then(() => {
                Actions.home()
                setisLoading(false)
            })
    }
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={Images.ILLUST_LOGIN} style={styles.illustLoginStyle} />
            </View>
            <View style={styles.loginContainer}>
                <CustomTextInput
                    inputTextOnly={true}
                    label={"Username"}
                    placeholder={"Masukan username"}
                    value={userName}
                    onChangeText={setUserName}
                />
                <CustomTextInput
                    inputTextOnly={true}
                    placeholder={"Masukan password"}
                    passwordText={"Lihat password"}
                    autoCompleteType="password"
                    isPassword={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <CustomButton
                    style={{ marginTop: 20 }}
                    isLoading={isLoading}
                    onPress={handleLogin}
                    label={"Login"}
                />
            </View>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.GRAY_LOGIN_BG,
        alignItems: 'center'
    },
    itemTitleText: {
        fontFamily: Fonts.INTER_SEMI_BOLD,
        fontSize: 12,
        color: Colors.BLUE_DARK,
        textAlign: 'center'
    },
    logoContainer: {
        width: '100%',
        height: '60%',
    },
    illustLoginStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    loginContainer: {
        width: '90%',
        paddingHorizontal: Metrics.SAFE_AREA
    }
})