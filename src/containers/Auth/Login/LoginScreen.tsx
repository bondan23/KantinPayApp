import React, { Component } from 'react'
import { View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { NavigationScreenProps } from 'react-navigation'

type Props = NavigationScreenProps

export default class LoginScreen extends Component<Props> {
  public static navigationOptions = {
    title: 'Login',
  }

  public handleLogin = () => {
    this.props.navigation.navigate('App')
  }

  public render() {
    return (
      <View style={{ flex: 1 }}>
        <Input placeholder="Email" inputStyle={{ textAlign: 'center' }} />
        <Input placeholder="Password" inputStyle={{ textAlign: 'center' }} />
        <View style={{ alignItems: 'center', flex: 1, marginTop: 10 }}>
          <Button
            title="Login"
            containerStyle={{ width: 100 }}
            onPress={this.handleLogin}
          />
        </View>
      </View>
    )
  }
}
