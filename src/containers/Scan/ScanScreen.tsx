// tslint:disable:arrow-parens
import React, { Component } from 'react'
import { Button, Input } from 'react-native-elements'

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import QRCodeScanner from 'react-native-qrcode-scanner'

import { RNCamera } from 'react-native-camera'
import { NavigationScreenProps } from 'react-navigation'
import { getDetail, sendBalance } from '../../helpers/Request'

type Props = NavigationScreenProps

interface State {
  showQRScanner: boolean
  accountData: AccountData
  amountToSend: number
  isLoading: boolean
}

interface AccountData {
  id: number
  email: string
  name: string
}

export default class ScanScreen extends Component<Props, State> {
  public static navigationOptions = {
    title: 'Transfer',
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      showQRScanner: true,
      accountData: {
        id: 0,
        email: '',
        name: '',
      },
      amountToSend: 0,
      isLoading: false,
    }
  }

  public render() {
    if (this.state.showQRScanner) {
      return (
        <QRCodeScanner
          onRead={this.onSuccess}
          showMarker={true}
          cameraProps={{
            autoFocus: RNCamera.Constants.AutoFocus.on,
          }}
          // customMarker={
          //   <View style={{ backgroundColor: 'red', width: 100, height: 100 }} />
          // }
        />
      )
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: 'center', marginTop: 8 }}>
          <Text>Data Penerima</Text>
          <Text style={{ fontWeight: 'bold' }}>
            {this.state.accountData.name}
          </Text>
          <Text style={{ fontWeight: 'bold' }}>
            {this.state.accountData.email}
          </Text>
        </View>

        <View style={{ marginTop: 8 }}>
          <Text style={{ marginLeft: 8 }}>Jumlah uang yang akan di kirim:</Text>
          <Input
            onChangeText={this.handleChangeText}
            keyboardType={'decimal-pad'}
            // containerStyle={{ marginTop: 0, backgroundColor: 'red' }}
          />
        </View>
        <View style={{ alignItems: 'center', flex: 1, marginTop: 10 }}>
          <Button
            title="Send"
            containerStyle={{ width: 100 }}
            onPress={this.handleSendBalance}
            loading={this.state.isLoading}
            disabled={this.state.isLoading}
          />
        </View>
      </View>
    )
  }

  private onSuccess = (v: any) => {
    const email = v.data
    getDetail(email).then(value => {
      this.setState({ accountData: value.data, showQRScanner: false })
    })
  }

  private handleSendBalance = () =>
    this.setState({ isLoading: true }, () =>
      sendBalance(this.state.accountData.id, this.state.amountToSend).then(
        () => {
          console.log('====================================')
          console.log('SUCCESS')
          console.log('====================================')
          this.setState({ isLoading: false }, this.props.navigation.pop)
        },
      ),
    )

  private handleChangeText = (balance: string) => {
    const amountToSend = parseInt(balance, 10)
    this.setState({ amountToSend })
  }

  private renderTopContent = () => {
    return (
      <Text style={styles.centerText}>
        Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
        your computer and scan the QR code.
      </Text>
    )
  }

  private renderBottomContent = () => {
    return (
      <TouchableOpacity style={styles.buttonTouchable}>
        <Text style={styles.buttonText}>OK. Got it!</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
})
