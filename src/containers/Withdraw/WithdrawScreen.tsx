import React, { Component } from 'react'
import { Text, ToastAndroid, View, } from 'react-native'
import { Button, Input, Text as CustomText } from 'react-native-elements'
import { NavigationScreenProps } from 'react-navigation'
import { requestWithdraw } from '../../helpers/Request'

type Props = NavigationScreenProps

interface State {
  amountToSend: number
  isLoading: boolean
}

export default class TopUpScreen extends Component<Props, State> {
  public static navigationOptions = {
    title: 'Withdraw',
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      amountToSend: 0,
      isLoading: false,
    }
  }

  public render() {
    return (
      <View style={{ flex: 1, marginHorizontal: 16 }}>
        <CustomText h4={true} h4Style={{ marginTop: 8 }}>
          Request Withdraw Saldo
        </CustomText>
        <View style={{ flex: 1 }}>
          <View style={{ marginVertical: 8 }}>
            <Text style={{ marginLeft: 8, marginVertical: 4 }}>
              Total Saldo Sekarang :{' '}
              {this.currencyFormat(this.props.navigation.getParam('balance'))}
            </Text>
            <Text style={{ marginLeft: 8, marginVertical: 4 }}>
              Masukan saldo yang akan di tarik
            </Text>
            <Input
              onChangeText={this.handleChangeText}
              keyboardType={'decimal-pad'}
              placeholder={'Rp....'}
            />
          </View>
          <View style={{ alignItems: 'center'}}>
            <Button
              title="Request"
              containerStyle={{ width: 100 }}
              onPress={this.handleRequestBalance}
              loading={this.state.isLoading}
              disabled={this.state.isLoading}
            />
          </View>
        </View>
      </View>
    )
  }

  private handleRequestBalance = () => {
    this.setState({ isLoading: true }, () => {
      requestWithdraw(this.state.amountToSend)
        // tslint:disable-next-line: arrow-parens
        .then(value => {
          ToastAndroid.show(value.message, ToastAndroid.SHORT)
          this.setState({ isLoading: false }, this.props.navigation.pop)
        })
        .catch((err) => {
          ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT)
          this.setState({ isLoading: false })
        })
    })
  }

  private handleChangeText = (balance: string) => {
    const amountToSend = parseInt(balance, 10)
    this.setState({ amountToSend })
  }

  private currencyFormat(balance: number) {
    return 'Rp.' + balance.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }
}
