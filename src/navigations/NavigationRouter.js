import React, { Component } from 'react'
import { Scene, Router, Actions, Stack, Drawer } from 'react-native-router-flux'
import {
    Easing,
    Alert,
    BackHandler,
    StyleSheet,
} from 'react-native';
// screens identified by the router
import HomeScreen from '../container/HomeScreen/HomeScreen'
import LoginScreen from '../container/LoginScreen/LoginScreen'
import DrawerContent from '../components/DrawerContent'
import DetailItemScreen from '../container/DetailItemScreen/DetailItemScreen'
import AccountScreen from '../container/AccountScreen/AccountScreen'
import SplashScreen from '../container/SplashScreen/SplashScreen'
import { Colors } from '../GlobalConfig';

class NavigationRouter extends Component {
    showExitAlert() {
        Alert.alert(
            'Keluar Aplikasi',
            'Apakah Anda yakin untuk keluar aplikasi?',
            [
                {
                    text: 'Tidak',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Ya', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false },
        );
    }

    handleback = () => {
        let screen = Actions.currentScene;
        switch (screen) {
            case 'home':
                this.showExitAlert()
                // BackHandler.exitApp()
                return true;
            case 'login':
                this.showExitAlert()
                // BackHandler.exitApp()
                return true;
            case 'splash':
                BackHandler.exitApp()
                return true;
            default:
                Actions.pop()
                return true;
        }
    }

    render() {
        const MyTransitionSpec = ({
            duration: 250,
            easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
            // timing: Animated.timing,
        });
        const transitionConfig = () => ({
            transitionSpec: MyTransitionSpec,
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;
                const width = layout.initWidth;

                // right to left by replacing bottom scene
                return {
                    transform: [{
                        translateX: position.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [width, 0, -width],
                        }),
                    }]
                };
            }
        });

        return (
            <Router
                navigationBarStyle={{ backgroundColor: Colors.BLUE_DARK }}
                backAndroidHandler={this.handleback}>
                <Drawer
                    hideNavBar
                    key="drawerMenu"
                    drawerWidth={300}
                    drawerLockMode='unlocked'
                    contentComponent={DrawerContent}>
                    <Stack
                        transitionConfig={transitionConfig}
                        key='root'>
                        <Scene
                            initial
                            key='splash'
                            hideNavBar
                            component={SplashScreen} />
                        <Scene
                            key='login'
                            hideNavBar
                            component={LoginScreen} />
                        <Scene
                            key='home'
                            hideNavBar
                            component={HomeScreen} />
                        <Scene
                            key='detailScreen'
                            hideNavBar
                            component={DetailItemScreen} />
                        <Scene
                            // initial
                            key='accountScreen'
                            hideNavBar
                            component={AccountScreen} />
                    </Stack>
                </Drawer>
            </Router>
        )
    }
}

const styles = StyleSheet.create({

})

export default NavigationRouter