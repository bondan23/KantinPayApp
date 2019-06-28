import React, { Component } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { getHistory } from '../../helpers/Request'

import { NavigationScreenProps } from 'react-navigation'

type Props = NavigationScreenProps

interface HistoryData {
  amount: number
  name: string
  receiver: string
  type: 'Top Up' | 'Transfer' | 'Withdraw'
}

interface State {
  initialLoading: boolean
  isRefreshing: boolean
  history: HistoryData[]
}

export default class HistoryScreen extends Component<Props, State> {
  public static navigationOptions = {
    title: 'Riwayat',
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      initialLoading: true,
      isRefreshing: false,
      history: [],
    }
  }

  public componentWillMount() {
    this.fetchData()
  }

  public render() {
    if (this.state.initialLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator animating={true} />
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ marginVertical: 4 }}
          data={this.state.history}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          refreshing={this.state.isRefreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    )
  }

  private handleRefresh = () => this.fetchData(true)

  private renderItem = ({ item }: { item: HistoryData }) => {
    if (item.type === 'Top Up' || item.type === 'Withdraw') {
      return (
        <View
          style={{
            height: 50,
            marginHorizontal: 8,
            borderWidth: 1,
            borderColor: 'black',
            marginVertical: 4,
            justifyContent: 'center',
            padding: 8,
          }}
        >
          <Text>
            Sukses {item.type} sebesar {this.currencyFormat(item.amount)}
          </Text>
        </View>
      )
    }

    return (
      <View
        style={{
          height: 50,
          marginHorizontal: 8,
          borderWidth: 1,
          borderColor: 'black',
          marginVertical: 4,
          justifyContent: 'center',
          padding: 8,
        }}
      >
        <Text>
          {item.name} {item.type} ke {item.receiver}{' '}
          sebesar{'\n'}
          {this.currencyFormat(item.amount)}
        </Text>
      </View>
    )
  }

  private keyExtractor = (_: any, index: number) => `${index}`

  private currencyFormat(balance: number) {
    return 'Rp.' + balance.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  private fetchData = (isRefresh: boolean = false) => {
    if (isRefresh) {
      this.setState({
        isRefreshing: true,
      })
    }

    // tslint:disable-next-line:arrow-parens
    getHistory().then(value => {
      this.setState({
        isRefreshing: false,
        initialLoading: false,
        history: value.data,
      })
    })
  }
}
