import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { Colors } from '../GlobalConfig'

export default (props) => {
    const { loadingColor = Colors.BLUE_DARK, loadingSize = 'large' } = props
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={loadingSize} color={loadingColor} />
        </View>
    )
}
