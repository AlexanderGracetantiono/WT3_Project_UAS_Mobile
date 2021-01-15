import React, { PureComponent } from 'react';
import { View, TextInput, Animated, Text, TouchableOpacity, Platform } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { Colors, Metrics, Fonts } from '../GlobalConfig';

export default class CustomTextInput extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
            showPassword: false
        };
    }

    componentDidUpdate() {

    }

    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });

    togglePassword = () => this.setState({ showPassword: !this.state.showPassword })

    render() {
        const { ...props } = this.props;
        const inputBoxContainerStyle = {
            backgroundColor: Colors.WHITE_LIGHT_GRAY,
            height: this.props.multiline ? 100 : 45,
            width: '100%',
            flexDirection: 'row',
            borderWidth: 1.5,
            borderRadius: 10,
        };
        const inputBoxContainerInputOnlyStyle = {
            height: 30,
            width: '100%',
            flexDirection: 'row',
            borderWidth: 1.5,
            borderRadius: 5,
            borderColor: Colors.GRAY,
        };
        const inputBoxContainerBottomStyle = {
            height: this.props.multiline ? 100 : 45,
            width: '100%',
            flexDirection: 'row',
            borderBottomWidth: 1.5,
        };
        const helperStyle = {
            fontSize: 10,
            fontFamily: Fonts.INTER_REGULAR
        };
        const maxLengthStyle = {
            fontSize: 10,
            fontFamily: Fonts.INTER_REGULAR,
            textAlign: 'right',
            width: 70
        };
        const helperContainerStyle = {
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: Metrics.SAFE_AREA
        };
        const formTitleStyle = {
            color: Colors.BLUE_DARK,
            fontSize: 12,
            fontFamily: Fonts.INTER_MEDIUM,
            marginBottom: 10
        };
        const showPasswordLabel = {
            color: Colors.BLUE_DARK,
            fontSize: 12,
            fontFamily: Fonts.INTER_REGULAR,
        };
        const inputBoxStyle = {
            flex: 1,
            fontSize: 12,
            fontFamily: Fonts.INTER_REGULAR,
            color: Colors.BLUE_DARK,
            paddingVertical: 5,
            paddingHorizontal: 14,
        };
        return (
            <View style={{ width: '100%' }}>
                {
                    props.inputTextOnly ? null :
                        <Text style={formTitleStyle}>
                            {props.label ? props.label : ""}
                        </Text>
                }
                {
                        <View style={[props.isPassword ? { marginBottom: 5 } : { marginBottom: 15 }, this.props.bottomOnly ? inputBoxContainerBottomStyle : inputBoxContainerStyle,
                        this.state.isFocused ? this.props.bottomOnly ?
                            { borderBottomColor: Colors.RED } :
                            { borderColor: Colors.RED } :
                            props.value ?
                                this.props.bottomOnly ?
                                    { borderBottomColor: Colors.GRAY } :
                                    { borderColor: Colors.GRAY } :
                                this.props.bottomOnly ?
                                    { borderBottomColor: Colors.GRAY } :
                                    { borderColor: Colors.GRAY, zIndex: 2 }]}>
                            <TextInput
                                {...props}
                                secureTextEntry={props.isPassword && !this.state.showPassword}
                                placeholder={props.placeholder ? props.placeholder : ""}
                                placeholderTextColor={Colors.GRAY}
                                autoCapitalize={"none"}
                                // selectionColor={Colors.RED}
                                style={[inputBoxStyle, this.props.multiline && { textAlignVertical: 'top' }]}
                                // onFocus={this.handleFocus}
                                // onBlur={this.handleBlur}
                                // blurOnSubmit={this.props.multiline ? false : true}
                                numberOfLines={3}
                            />
                            {
                                props.editButtonText ?
                                    <TouchableOpacity
                                        onPress={props.onEditButtonAction ? props.onEditButtonAction : () => console.log("Edit Not Work")}
                                        style={{ width: 45, height: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 4 }}>
                                        <Text style={showPasswordLabel}>
                                            {props.editButtonText ? props.editButtonText : "Ubah"}
                                        </Text>
                                    </TouchableOpacity> : null
                            }
                        </View>

                }
                {
                    props.isPassword ?
                        <View style={{
                            width: '100%',
                            // height: 45,
                            flexDirection: 'row',
                            zIndex: 3,
                            // backgroundColor: 'red',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity
                                onPress={this.togglePassword}
                                style={{
                                    borderWidth: 2,
                                    borderColor: Colors.BLACK,
                                    width: 20, height: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: 10
                                }}>
                                {
                                    this.state.showPassword ?
                                        <FontAwesome
                                            size={14}
                                            name={'check'}
                                            color={Colors.BLACK}
                                        /> : null
                                }

                            </TouchableOpacity>
                            <Text style={showPasswordLabel}>
                                {props.passwordText ? props.passwordText : "Tampilkan sandi"}
                            </Text>
                        </View> : null
                }
                <View style={[helperContainerStyle, Platform.OS == 'ios' && { marginTop: 2 }]}>
                    {props.helperText ? <Text style={helperStyle}>{props.helperText}</Text> : <View />}
                    {props.maxLength ? <Text style={maxLengthStyle}>{props.value ? props.value.length : '0'} / {props.maxLength}</Text> : <View />}
                </View>
            </View>
        );
    }
}