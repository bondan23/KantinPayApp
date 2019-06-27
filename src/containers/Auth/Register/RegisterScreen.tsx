import React, { Component } from 'react'
import { AsyncStorage, Picker, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { NavigationScreenProps } from 'react-navigation'
import { requestRegister } from '../../../helpers/Request'

type Props = NavigationScreenProps

interface State {
  isLoading: boolean
  emailText: string
  nameText: string
  passwordText: string
  confirmPasswordText: string
  selectedValue: 2 | 3
}

export default class RegisterScreen extends Component<Props, State> {
  public static navigationOptions = {
    title: 'Register',
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      isLoading: false,
      emailText: '',
      nameText: '',
      passwordText: '',
      confirmPasswordText: '',
      selectedValue: 2,
    }
  }

  public render() {
    return (
      <View style={{ flex: 1 }}>
        <Input
          placeholder="Name"
          inputStyle={{ textAlign: 'center' }}
          onChangeText={this.handleNameText}
        />
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
        <Input
          placeholder="Confirm Password"
          inputStyle={{ textAlign: 'center' }}
          secureTextEntry={true}
          onChangeText={this.handleConfirmPasswordText}
        />
        <Text style={{ textAlign: 'center', marginVertical: 4 }}>
          {' '}
          Daftar Sebagai{' '}
        </Text>
        <Picker
          selectedValue={this.state.selectedValue}
          style={{
            height: 50,
            borderWidth: 10,
            borderColor: 'black',
            alignItems: 'center',
          }}
          // tslint:disable-next-line:jsx-no-lambda
          onValueChange={(itemValue, _) =>
            this.setState({ selectedValue: itemValue })
          }
        >
          <Picker.Item label="Buyer" value="2" />
          <Picker.Item label="Seller" value="3" />
        </Picker>
        <View style={{ alignItems: 'center', flex: 1, marginTop: 10 }}>
          <Button
            title="Daftar"
            loading={this.state.isLoading}
            containerStyle={{ width: 100 }}
            onPress={this.handleRegister}
          />
        </View>
      </View>
    )
  }
  
  private handleRegister = () => {
    this.setState({ isLoading: true })
    requestRegister(
      this.state.nameText,
      this.state.emailText.toLowerCase().trim(),
      this.state.passwordText,
      this.state.selectedValue,
    )
      .then(v => {
        const token = v.data.token
        this.setState({ isLoading: false })

        AsyncStorage.setItem('userToken', token, () => {
          this.props.navigation.navigate('App')
        })
      })
      .catch(e => {
        this.setState({ isLoading: false })
      })
  }
  private handleEmailText = (emailText: string) => this.setState({ emailText })
  private handleNameText = (nameText: string) => this.setState({ nameText })
  private handlePasswordText = (passwordText: string) =>
    this.setState({ passwordText })
  private handleConfirmPasswordText = (confirmPasswordText: string) =>
    this.setState({ confirmPasswordText })
}
