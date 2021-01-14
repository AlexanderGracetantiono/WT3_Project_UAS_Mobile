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
import { RestaurantManagement } from "../../models/RestaurantManagement";
import { wait } from "../../GlobalFunction";
import { Actions } from "react-native-router-flux";
export default (props) => {
    const [restaurantListData, setRestaurantListData] = useState([])
    const [isLoading, setIsLoading] = useState()
    useEffect(() => {
        getListRestaurant()
        setIsLoading(true)
    }, [])
    const getListRestaurant = () => {
        RestaurantManagement.getListRestaurant(res => {
            const { status, result } = res
            switch (status) {
                case 200:
                    console.log("DATA: ", result.data)
                    setRestaurantListData(result.data)
                    wait(200)
                        .then(() => {
                            setIsLoading(false)
                        })
                    break;
                case 400:
                    setRestaurantListData([])
                    wait(200)
                        .then(() => {
                            setIsLoading(false)
                        })
                    break;
                default:
                    setRestaurantListData([])
                    wait(200)
                        .then(() => {
                            setIsLoading(false)
                        })
                    break;
            }
        })
    }
    const redirectDetailRestaurant = (item) => () => {
        Actions.detailScreen({ item: item })
    }
    return (
        <View style={styles.container}>
            <CustomHeader
                title="Restaurant"
            />
            <FlatList
                data={restaurantListData}
                extraData={[restaurantListData]}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={redirectDetailRestaurant(item)}
                            style={styles.itemContainer}>
                            <Text numberOfLines={1} style={styles.itemTitleText}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item, index) => {
                    return String(item.id)
                }} />
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    itemContainer: {
        width: '100%',
        height: 50,
        borderBottomWidth: 1,
        borderColor: Colors.GRAY,
        justifyContent: 'center'
    },
    itemTitleText: {
        fontFamily: Fonts.INTER_SEMI_BOLD,
        fontSize: 16,
        paddingLeft: Metrics.SAFE_AREA,
        color: Colors.BLUE_DARK
    }
})