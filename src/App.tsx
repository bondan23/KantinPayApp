import React, { Component } from 'react'
import { View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
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
import ScanScreen from './containers/Scan/ScanScreen'
import SettingScreen from './containers/Setting/SettingScreen'
import TopUpScreen from './containers/TopUp/TopUpScreen'
import WithdrawScreen from './containers/Withdraw/WithdrawScreen'

const HomeNavigator = createStackNavigator({
  Home: HomeScreen,
  History: HistoryScreen,
  Scan: ScanScreen,
  TopUp: TopUpScreen,
  Withdraw: WithdrawScreen,
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

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: HomeNavigator,
    Settings: SettingScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        const IconComponent = Ionicons
        let iconName
        if (routeName === 'Home') {
          iconName = `ios-home`
        } else if (routeName === 'Settings') {
          iconName = `ios-options`
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />
      },
    }),
  },
)

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
