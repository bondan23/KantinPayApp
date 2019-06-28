// tslint:disable:arrow-parens
import React, { Component } from 'react'
import { AsyncStorage, ToastAndroid, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { NavigationScreenProps } from 'react-navigation'
import { requestLogin } from '../../../helpers/Request'

type Props = NavigationScreenProps

interface State {
  isLoading: boolean
  emailText: string
  passwordText: string
}

export default class LoginScreen extends Component<Props, State> {
  public static navigationOptions = ({ navigation }: Props) => ({
    title: 'Login',
    headerRight: (
      <Button
        // tslint:disable-next-line: jsx-no-lambda
        onPress={() => navigation.navigate('Register')}
        title="Daftar"
        type={'clear'}
      />
    ),
  })

  constructor(props: Props) {
    super(props)
    this.state = {
      isLoading: false,
      emailText: '',
      passwordText: '',
    }
  }

  public render() {
    return (
      <View style={{ flex: 1 }}>
        <Input
          placeholder="Email"
          inputStyle={{ textAlign: 'center' }}
          onChangeText={this.handleEmailText}
        />
        <Input
          placeholder="Password"
          inputStyle={{ textAlign: 'center' }}
          secureTextEntry={true}
          onChangeText={this.handlePasswordText}
        />
        <View style={{ alignItems: 'center', flex: 1, marginTop: 10 }}>
          <Button
            title="Login"
            loading={this.state.isLoading}
            containerStyle={{ width: 100 }}
            onPress={this.handleLogin}
            disabled={
              this.state.emailText.trim() === '' && this.state.passwordText === ''
            }
          />
        </View>
      </View>
    )
  }

  private handleLogin = () => {
    this.setState({ isLoading: true })
    requestLogin(this.state.emailText.toLowerCase().trim(), this.state.passwordText)
      .then(v => {
        const token = v.data.token
        this.setState({ isLoading: false })

        AsyncStorage.setItem('userToken', token, () => {
          this.props.navigation.navigate('App')
        })
      })
      .catch(e => {
        ToastAndroid.show("Email atau Password Salah", ToastAndroid.SHORT)
        this.setState({ isLoading: false })
      })
  }

  private handleEmailText = (emailText: string) => this.setState({ emailText })
  private handlePasswordText = (passwordText: string) =>
    this.setState({ passwordText })
}
