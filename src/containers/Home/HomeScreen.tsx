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

export enum Role {
  User = 2,
  Seller = 3,
  Unknown = 4,
}

interface AccountData {
  balance: number
  name: string
  email: string
  role: Role
}

interface State {
  initiaLoading: boolean
  isRefreshing: boolean
  accountData: AccountData
}

class HomeScreen extends React.PureComponent<Props, State> {
  public static navigationOptions = {
    title: 'Beranda',
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
        role: Role.Unknown,
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
          {this.drawBadge()}
        </View>

        <CustomText h4={true} h4Style={{ marginTop: 8, marginLeft: 16 }}>
          Informasi STT PLN
        </CustomText>

        <View style={{ height: 158, marginBottom: 16 }}>
          <FlatList
            data={[
              { title: 'Informasi 1', key: 1 },
              { title: 'Informasi 2', key: 2 },
              { title: 'Informasi 3', key: 3 },
            ]}
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

  private drawBadge = () => {
    if (this.state.accountData.role === Role.Seller) {
      return (
        <View
          style={{
            height: 60,
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            activeOpacity={0.9}
            onPress={() =>
              this.props.navigation.navigate('Withdraw', {
                balance: this.state.accountData.balance,
              })
            }
          >
            <Icon
              name={'dollar'}
              type="font-awesome"
              size={32}
              containerStyle={{
                width: 32,
                height: 32,
              }}
            />
            <Text style={{ fontSize: 10 }}>Withdraw</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 0.5,
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
            <Text style={{ fontSize: 10 }}>Riwayat</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
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
            name={'plus'}
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
          <Text style={{ fontSize: 10 }}>Riwayat</Text>
        </TouchableOpacity>
      </View>
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
        const data = value.data
        const accountData: AccountData = {
          ...data,
          role: data.role_id === 2 ? Role.User : Role.Seller,
        }

        this.setState({
          isRefreshing: false,
          initiaLoading: false,
          accountData,
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

  private renderItem = ({item}) => {
    return (
      <View
        style={{
          width: 250,
          height: 150,
          backgroundColor: 'white',
          marginRight: 8,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text style={{ color: 'black' }}>{item.title}</Text>
      </View>
    )
  }
}

export default HomeScreen
