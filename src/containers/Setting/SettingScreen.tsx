// tslint:disable:arrow-parens
import React, { Component } from 'react'
import { AsyncStorage, View } from 'react-native'
import { Button } from 'react-native-elements'
import { NavigationScreenProps } from 'react-navigation'
import { requestLogout } from '../../helpers/Request'

type Props = NavigationScreenProps
interface State {
  isLoading: boolean
}
export default class SettingScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { isLoading: false }
  }
  public render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={this.handleLogout}
          title={'Logout'}
          loading={this.state.isLoading}
        />
      </View>
    )
  }

  private handleLogout = () =>
    this.setState({ isLoading: true }, () =>
      requestLogout()
        .then(() => {
          this.setState({ isLoading: false })
          AsyncStorage.clear(() => this.props.navigation.navigate('Auth'))
        })
        .catch(() => {
          AsyncStorage.clear(() => this.props.navigation.navigate('Auth'))
          this.setState({ isLoading: false })
        }),
    )
}
