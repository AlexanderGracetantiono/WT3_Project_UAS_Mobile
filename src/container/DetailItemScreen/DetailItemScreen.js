import React, { useEffect, useRef, useState } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
} from "react-native";
import { Colors, Fonts, Metrics } from '../../GlobalConfig';
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
                title="Restaurant Detail"
                handleBackNavigation={true}
            />
            <View style={styles.cardContainer}>
                <View style={styles.titleContainer}>
                    <Text numberOfLines={1} style={styles.titleTextStyle} >{item ? item.name : "Restaurant Default name"}</Text>
                    <View style={styles.starContainer}>
                        <FontAwesome
                            size={16}
                            name={"star"}
                            color={Colors.WHITE}
                        />
                        <Text numberOfLines={1} style={styles.ratingStyle} >{item ? item.rating : "0"}</Text>
                    </View>
                </View>
                <View style={styles.titleContainer}>
                    <Text numberOfLines={1} style={styles.titleTextStyle} >Cuisine Type : {item?item.cuisineType:"Chinese Food"}</Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text numberOfLines={1} style={styles.titleTextStyle} >City : {item?item.city:"Jakarta"}</Text>
                </View>
            </View>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        alignItems: 'center'
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