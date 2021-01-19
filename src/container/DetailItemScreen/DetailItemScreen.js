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
import { Colors, Fonts, Images, Metrics } from '../../GlobalConfig';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomHeader from "../../components/CustomHeader";
import { wait } from "../../GlobalFunction";
export default (props) => {
    const {
        item
    } = props
    const [isLoading, setIsLoading] = useState()
    useEffect(() => {
        setIsLoading(true)
        console.log("ITEM: ", item)
    }, [])
    return (
        <View style={styles.container}>
            <CustomHeader
                title="Book Detail"
                handleBackNavigation={true}
            />
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.imageContainer}>
                    <Image style={styles.imgBG} source={Images.ILLUST_NO_IMG} />
                    {item.cover&&<Image style={styles.imgStyleDefault} source={{ uri: item.cover }}/>}
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.titleContainer}>
                        <Text numberOfLines={1} style={styles.titleTextStyle} >{item.judul}</Text>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text numberOfLines={1} style={styles.titleTextStyle} >ISBN : {item.isbn}</Text>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text numberOfLines={1} style={styles.titleTextStyle} >Penulis : {item.penulis}</Text>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text numberOfLines={1} style={styles.titleTextStyle} >Tahun : {item.tahun}</Text>
                    </View>
                    <View style={styles.descContainer}>
                        <Text style={styles.titleTextStyle} >{item.ket}</Text>
                    </View>
                </View>
            </ScrollView >
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
    }
})