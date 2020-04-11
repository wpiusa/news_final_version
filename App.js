import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import Colors from './Colors';
import HomePage from './src/Pages/HomePage';
import NewsPage from './src/Pages/NewsPage';
import CategoryPage from './src/Pages/CategoryPage';
import DetailsPage from './src/Pages/DetailsPage';

const HomeStack = createStackNavigator({
  Home: HomePage,
  Details: DetailsPage
});

const CategoryStack = createStackNavigator({
  Category: CategoryPage,
  News: NewsPage,
  Details: DetailsPage
});

export default createAppContainer(createBottomTabNavigator(
  {
    Home: HomeStack,
    Category: CategoryStack,
  }, {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-today`;
        } else if (routeName === 'Category') {
          iconName = `ios-apps`;
        } 
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: Colors.activeTabTextIcon,
      inactiveTintColor: Colors.inactiveTabTextIcon,
      activeBackgroundColor: Colors.activeTabBackground,
      inactiveBackgroundColor: Colors.inactiveTabBackground
    }
  }
));