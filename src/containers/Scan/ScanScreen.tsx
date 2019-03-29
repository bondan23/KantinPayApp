import React, { Component } from 'react'

import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import QRCodeScanner from 'react-native-qrcode-scanner'

import { RNCamera } from 'react-native-camera'
import { NavigationScreenProps } from 'react-navigation'

type Props = NavigationScreenProps

export default class ScanScreen extends Component<Props> {
  public onSuccess = v => {
    console.log('====================================')
    console.log(JSON.parse(v.data))
    console.log('====================================')
    this.props.navigation.pop()
  }

  public render() {
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
