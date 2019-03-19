import React, { Component } from 'react'
import { AsyncStorage, Text, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

type Props = NavigationScreenProps

export default class LoadingScreen extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.bootstrapAsync()
  }

  public render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <Text> Loading </Text>
      </View>
    )
  }

  private bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken')

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'App')
  }
}
