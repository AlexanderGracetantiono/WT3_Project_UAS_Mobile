import React, { useEffect, useRef, useState } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
    Image,
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
        // getListRestaurant()
        setRestaurantListData([
            {
                id: 1,
                name: "Buku 1",
                img: "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=405&h=540&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F09%2Fhpchamber.jpg"
            },
            {
                id: 2,
                name: "Buku 2 sangat panjang namanya",
                img: "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=405&h=540&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F09%2Fhpchamber.jpg"
            },
            {
                id: 3,
                name: "Buku 3",
                img: "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=405&h=540&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F09%2Fhpchamber.jpg"
            },
            {
                id: 4,
                name: "Buku 4",
                img: "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=405&h=540&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F09%2Fhpchamber.jpg"
            },
            {
                id: 5,
                name: "Buku 5",
                img: "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=405&h=540&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F09%2Fhpchamber.jpg"
            },
        ])
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
                isNavigation={true}
            />
            <FlatList
                data={restaurantListData}
                extraData={[restaurantListData]}
                horizontal={false}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapperCustomStyle}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            // onPress={redirectDetailRestaurant(item)}
                            style={styles.itemContainer}>
                            <Image style={styles.imgStyle} source={{ uri: item.img }} />
                            <Text numberOfLines={2} style={styles.itemTitleText}>{item.name}</Text>
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
        width: 150,
        height: 250,
        elevation: 10,
        backgroundColor: Colors.WHITE_LIGHT_GRAY,
    },
    imgStyle: {
        width: '100%',
        height: 220,
    },
    itemTitleText: {
        fontFamily: Fonts.INTER_SEMI_BOLD,
        fontSize: 12,
        color: Colors.BLUE_DARK,
        textAlign: 'center'
    },
    columnWrapperCustomStyle: {
        paddingHorizontal: Metrics.SAFE_AREA,
        justifyContent: 'space-between',
        paddingVertical: Metrics.SAFE_AREA
    }
})