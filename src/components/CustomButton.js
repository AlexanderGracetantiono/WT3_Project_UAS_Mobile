
import React, { PureComponent } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableNativeFeedback,
    ActivityIndicator,
    ViewPropTypes
} from 'react-native';
import { Fonts, Colors } from '../GlobalConfig';
import PropTypes from 'prop-types';

export default class CustomButton extends PureComponent {
    static propTypes = {
        containerStyle: ViewPropTypes.style,
        style: ViewPropTypes.style,
        label: PropTypes.string,
        onPress: PropTypes.func,
    }

    render() {
        const { label, onPress, customColor, outline, style,isCancel, ...props } = this.props;
        const buttonStyle = {
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            width: '100%',
            borderRadius: 5
        }
        const buttonShadowStyle = {
            backgroundColor: customColor ? customColor : outline ? Colors.WHITE_LIGHT_GRAY : Colors.BLUE_DARK,
        }
        const buttonDisabledShadowStyle = {
            backgroundColor: Colors.GRAY,
        }
        const buttonText = {
            color: outline ? Colors.BLUE_DARK : Colors.WHITE_LIGHT_GRAY,
            fontFamily: Fonts.SFCompactSemibold,
            letterSpacing: 0.5,
            fontSize:12,
        }
        if (Platform.OS == 'android') {
            return (
                <TouchableNativeFeedback disabled={props.isLoading} onPress={onPress} {...props}>
                    <View style={[
                        buttonStyle,
                        outline && { borderWidth: 1, borderColor: Colors.BLUE_DARK },
                        props.disabled || props.isLoading ? buttonDisabledShadowStyle : buttonShadowStyle,
                        style
                    ]}>
                        {props.isLoading ?
                            <ActivityIndicator color={Colors.WHITE_LIGHT_GRAY} size='small' /> :
                            <Text style={buttonText}>{label}</Text>}
                    </View>
                </TouchableNativeFeedback>
            )
        }
        return (
            <TouchableOpacity
                style={[
                    buttonStyle,
                    props.disabled || props.isLoading ? buttonDisabledShadowStyle : buttonShadowStyle,
                    style
                ]} disabled={props.isLoading} onPress={onPress} {...props}>
                {props.isLoading ?
                    <ActivityIndicator color={Colors.WHITE_LIGHT_GRAY} size='small' /> :
                    <Text style={buttonText}>{label}</Text>}
            </TouchableOpacity>
        )
    }
}