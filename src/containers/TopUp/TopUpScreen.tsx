import React, { Component } from 'react'
import { Picker, ToastAndroid, View } from 'react-native'
import { Button, Text as CustomText } from 'react-native-elements'
import { NavigationScreenProps } from 'react-navigation'
import { requestTopUp } from '../../helpers/Request'

type Props = NavigationScreenProps
type SelectedValue = 10000 | 20000 | 50000 | 100000 | 200000

interface State {
  selectedValue: SelectedValue
  isLoading: boolean
}

export default class TopUpScreen extends Component<Props, State> {
  public static navigationOptions = {
    title: 'Top Up',
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      selectedValue: 10000,
      isLoading: false,
    }
  }

  public render() {
    return (
      <View style={{ flex: 1, marginHorizontal: 16 }}>
        <CustomText h4={true} h4Style={{ marginTop: 8 }}>
          Request Top Up Saldo
        </CustomText>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Picker
            selectedValue={this.state.selectedValue}
            style={{
              height: 50,
              width: 250,
              borderWidth: 10,
              borderColor: 'black',
            }}
            // tslint:disable-next-line:jsx-no-lambda
            onValueChange={(itemValue, _) =>
              this.setState({ selectedValue: itemValue })
            }
          >
            <Picker.Item label="Rp. 10.000" value="10000" />
            <Picker.Item label="Rp. 20.000" value="20000" />
            <Picker.Item label="Rp. 50.000" value="50000" />
            <Picker.Item label="Rp. 100.000" value="100000" />
            <Picker.Item label="Rp. 200.000" value="100000" />
          </Picker>
          <Button
            title="Request"
            containerStyle={{ width: 100 }}
            onPress={this.handleRequestBalance}
            loading={this.state.isLoading}
            disabled={this.state.isLoading}
          />
        </View>
      </View>
    )
  }

  private handleRequestBalance = () => {
    this.setState({ isLoading: true }, () => {
      requestTopUp(this.state.selectedValue)
        // tslint:disable-next-line: arrow-parens
        .then(value => {
          ToastAndroid.show(value.message, ToastAndroid.SHORT)
          this.setState({ isLoading: false })
        })
        .catch(() => {
          this.setState({ isLoading: false })
        })
    })
  }
}
