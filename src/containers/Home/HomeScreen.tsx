// tslint:disable:jsx-no-lambda
// tslint:disable:arrow-parens
// tslint:disable:trailing-comma
import React from 'react'
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  Avatar,
  Divider,
  Icon,
  Text as CustomText,
} from 'react-native-elements'

import {
  NavigationEventSubscription,
  NavigationScreenProps,
} from 'react-navigation'
import { getDetail } from '../../helpers/Request'

type Props = NavigationScreenProps

interface AccountData {
  balance: number
  name: string
  email: string
}

interface State {
  initiaLoading: boolean
  isRefreshing: boolean
  accountData: AccountData
}

class HomeScreen extends React.PureComponent<Props, State> {
  public static navigationOptions = {
    title: 'Home',
  }

  private navSubscription?: NavigationEventSubscription

  constructor(props: Props) {
    super(props)

    this.state = {
      initiaLoading: true,
      isRefreshing: false,
      accountData: {
        balance: 0,
        name: '',
        email: '',
      },
    }
  }

  public componentDidMount() {
    this.fetchData()

    this.navSubscription = this.props.navigation.addListener('didFocus', () => {
      if (!this.state.initiaLoading) {
        this.fetchData(true)
      }
    })
  }

  public componentWillUnmount() {
    if (this.navSubscription) {
      this.navSubscription.remove()
    }
  }

  public render() {
    if (this.state.initiaLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator animating={true} />
        </View>
      )
    }

    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#00d4f2',
          // paddingHorizontal: 16,
        }}
        refreshControl={this.refreshControl()}
      >
        <View
          style={{
            height: 50,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            marginTop: 8,
            marginHorizontal: 16,
          }}
        >
          <Avatar
            rounded={true}
            size="medium"
            title="Hi"
            // containerStyle={{ marginTop: 16, marginHorizontal: 2 }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginLeft: 8,
            }}
          >
            <Text>{this.state.accountData.name}</Text>
            <Text>{this.state.accountData.email}</Text>
          </View>
        </View>

        <View
          style={{
            height: 100,
            backgroundColor: 'white',
            borderRadius: 10,
            marginTop: 8,
            marginHorizontal: 16,
          }}
        >
          <View
            style={{
              marginHorizontal: 8,
              height: 30,
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <View>
              <Text>KantinPay</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text>{this.currencyFormat(this.state.accountData.balance)}</Text>
            </View>
          </View>

          <Divider style={{ backgroundColor: 'gray', marginHorizontal: 4 }} />

          <View
            style={{
              height: 60,
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.33,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              activeOpacity={0.9}
              onPress={() => this.props.navigation.navigate('Scan')}
            >
              <Icon
                name="qrcode"
                type="font-awesome"
                size={32}
                containerStyle={{
                  width: 32,
                  height: 32,
                }}
              />
              <Text style={{ fontSize: 10 }}>Scan</Text>
            </TouchableOpacity>

            {/* <View
              style={{
                flex: 0.25,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon
                name="share"
                type="font-awesome"
                size={32}
                containerStyle={{
                  width: 32,
                  height: 32,
                }}
              />
              <Text style={{ fontSize: 10 }}>Transfer</Text>
            </View> */}

            <TouchableOpacity
              style={{
                flex: 0.33,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              activeOpacity={0.9}
              onPress={() => this.props.navigation.navigate('TopUp')}
            >
              <Icon
                name="plus"
                type="font-awesome"
                size={32}
                containerStyle={{
                  width: 32,
                  height: 32,
                }}
              />
              <Text style={{ fontSize: 10 }}>Top Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 0.33,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              activeOpacity={0.9}
              onPress={() => this.props.navigation.navigate('History')}
            >
              <Icon
                name="history"
                type="font-awesome"
                size={32}
                containerStyle={{
                  width: 32,
                  height: 32,
                }}
              />
              <Text style={{ fontSize: 10 }}>History</Text>
            </TouchableOpacity>
          </View>
        </View>

        <CustomText h4={true} h4Style={{ marginTop: 8, marginLeft: 16 }}>
          Rekomendasi Makanan
        </CustomText>

        <View style={{ height: 158 }}>
          <FlatList
            data={[
              { title: 'Ayam', key: 1 },
              { title: 'Mie Goreng', key: 2 },
              { title: 'Peler', key: 3 },
            ]}
            // ListHeaderComponent={() => <Text> Rekomendasi</Text>}
            keyExtractor={(_, index) => `${index}`}
            renderItem={this.renderItem}
            horizontal={true}
            contentContainerStyle={{
              marginTop: 8,
              paddingLeft: 16,
              height: 150,
            }}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <CustomText h4={true} h4Style={{ marginTop: 8, marginLeft: 16 }}>
          Informasi Terkini
        </CustomText>

        <View style={{ height: 158, marginBottom: 16 }}>
          <FlatList
            data={[
              { title: 'Ayam', key: 1 },
              { title: 'Mie Goreng', key: 2 },
              { title: 'Peler', key: 3 },
            ]}
            // ListHeaderComponent={() => <Text> Rekomendasi</Text>}
            keyExtractor={(_, index) => `${index}`}
            renderItem={this.renderItem}
            horizontal={true}
            contentContainerStyle={{
              marginTop: 8,
              paddingLeft: 16,
              height: 150,
            }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    )
  }

  private currencyFormat(balance: number) {
    return 'Rp.' + balance.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  private fetchData = (isRefresh: boolean = false) => {
    if (isRefresh) {
      this.setState({
        isRefreshing: true,
      })
    }

    getDetail()
      .then(value => {
        const data = value.data as AccountData

        this.setState({
          isRefreshing: false,
          initiaLoading: false,
          accountData: data,
        })
      })
      .catch(err => {
        console.log('====================================')
        console.log(err.response)
        console.log('====================================')
      })
  }

  private refreshControl = () => (
    <RefreshControl
      refreshing={this.state.isRefreshing}
      onRefresh={() => this.fetchData(true)}
    />
  )

  private renderItem = () => {
    return (
      <View
        style={{
          width: 250,
          height: 150,
          backgroundColor: 'red',
          marginRight: 8,
          borderRadius: 10,
        }}
      >
        <Text>Ayam</Text>
      </View>
    )
  }
}

export default HomeScreen
