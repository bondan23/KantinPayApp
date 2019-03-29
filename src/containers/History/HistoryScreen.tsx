import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { getHistory } from '../../helpers/Request'

import { NavigationScreenProps } from 'react-navigation'

type Props = NavigationScreenProps

interface State {
  isLoading: boolean
}

export default class HistoryScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isLoading: true,
    }
  }

  public componentWillMount() {
    // tslint:disable-next-line:arrow-parens
    getHistory().then(value => {
      console.log('====================================')
      console.log(value)
      console.log('====================================')
    })
  }

  public render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}
