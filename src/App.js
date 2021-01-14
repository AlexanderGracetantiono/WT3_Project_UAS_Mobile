import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';

import NavigationRouter from './navigations/NavigationRouter'
import { Colors } from './GlobalConfig';


export default class App extends Component {
	render() {
		return (
				<View style={{ flex: 1 }}>
					<StatusBar backgroundColor={Colors.BLUE_DARK} barStyle='light-content' />
					<NavigationRouter />
				</View>
		);
	}
}
