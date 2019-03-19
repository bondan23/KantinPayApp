import React, { Component } from 'react'
import { View } from 'react-native'
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
  NavigationScreenProps,
} from 'react-navigation'
import LoginScreen from './containers/Auth/Login/LoginScreen'
import RegisterScreen from './containers/Auth/Register/RegisterScreen'
import LoadingScreen from './containers/AuthLoading/LoadingScreen'
import HistoryScreen from './containers/History/HistoryScreen'
import HomeScreen from './containers/Home/HomeScreen'
import SettingScreen from './containers/Setting/SettingScreen'

const HomeNavigator = createStackNavigator({
  Home: HomeScreen,
  History: HistoryScreen,
})

HomeNavigator.navigationOptions = (props: NavigationScreenProps) => {
  let tabBarVisible = true
  if (props.navigation.state.index > 0) {
    tabBarVisible = false
  }

  return {
    tabBarVisible,
  }
}

const AppTabNavigator = createBottomTabNavigator({
  Home: HomeNavigator,
  Settings: SettingScreen,
})

const AuthNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    initialRouteName: 'Login',
  },
)

const SwitchNavigator = createSwitchNavigator(
  {
    App: AppTabNavigator,
    AuthLoading: LoadingScreen,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  },
)

const Container = createAppContainer(SwitchNavigator)

export default class App extends Component {
  public render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Container />
      </View>
    )
  }
}
