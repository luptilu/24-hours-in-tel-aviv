import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Icon } from 'react-native-elements';
import GetStarted from '../screens/GetStarted';
import Map from '../screens/Map';
import Places from '../screens/Places';
import React from 'react';

export default TabNavigator(
	{
		GetStarted: { screen: GetStarted },
		Map: { screen: Map },
		Places : {screen : Places},
	},
	{
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
              const { routeName } = navigation.state;
              let iconName;
              switch (routeName) {
                case 'GetStarted':
                    iconName = 'heart';
                    break;
                case 'Map':
                    iconName = 'map';
                    break;
                case 'Places':
                    iconName = 'list-alt';
                    break;
              }

      
              return <Icon 
                name={iconName} 
                size={25}
                type='font-awesome'
                color={'#EB8D72'}/>;
            },
        }),
		initialRouteName: 'GetStarted',
		order: ['GetStarted', 'Map', 'Places'],
		swipeEnabled : true,
		tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom'
    }
    
);

