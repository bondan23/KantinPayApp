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
  nameError? : string
  emailError? : string
  passwordError? : string
  cPasswordError? : string
}

export default class RegisterScreen extends Component<Props, State> {
  public static navigationOptions = {
    title: 'Daftar',
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
          placeholder="Nama"
          inputStyle={{ textAlign: 'center' }}
          onChangeText={this.handleNameText}
          errorMessage={this.state.nameError}
        />
        <Input
          placeholder="Email"
          inputStyle={{ textAlign: 'center' }}
          onChangeText={this.handleEmailText}
          errorMessage={this.state.emailError}
        />
        <Input
          placeholder="Password"
          inputStyle={{ textAlign: 'center' }}
          secureTextEntry={true}
          onChangeText={this.handlePasswordText}
          errorMessage={this.state.passwordError}
        />
        <Input
          placeholder="Konfirmasi Password"
          inputStyle={{ textAlign: 'center' }}
          secureTextEntry={true}
          onChangeText={this.handleConfirmPasswordText}
          errorMessage={this.state.cPasswordError}
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
          onValueChange={(itemValue, _) => {
            this.setState({ selectedValue: itemValue })
          }}
        >
          <Picker.Item label="Pembeli" value="2" />
          <Picker.Item label="Penjual" value="3" />
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
      this.state.confirmPasswordText,
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
        const error = e.response.data.error
        let state = {
          nameError: undefined,
          emailError: undefined,
          passwordError: undefined,
          cPasswordError: undefined,
          isLoading: false
        }

        if (error.name) {
          state = {
            ...state,
            nameError: error.name.toString(),
          }
        }

        if(error.email){
          state = {
            ...state,
            emailError: error.email.toString()
          }
        }

        if(error.password){
          state = {
            ...state,
            passwordError: error.password.toString()
          }
        }

        if(error.c_password){
          state = {
            ...state,
            cPasswordError: error.c_password.toString()
          }
        }

        this.setState(state)
      })
  }
  private handleEmailText = (emailText: string) => this.setState({ emailText })
  private handleNameText = (nameText: string) => this.setState({ nameText })
  private handlePasswordText = (passwordText: string) =>
    this.setState({ passwordText })
  private handleConfirmPasswordText = (confirmPasswordText: string) =>
    this.setState({ confirmPasswordText })
}
