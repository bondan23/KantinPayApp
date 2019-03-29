import React from 'react'
import {
  FlatList,
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

import { NavigationScreenProps } from 'react-navigation'
import { getDetail } from '../../helpers/Request'

type Props = NavigationScreenProps

class HomeScreen extends React.Component<Props> {
  public static navigationOptions = {
    title: 'Home',
  }

  public componentDidMount() {
    getDetail()
      .then((v) => {
        console.log('====================================')
        console.log(v)
        console.log('====================================')
      })
      .catch((err) => {
        console.log('====================================')
        console.log(err)
        console.log('====================================')
      })
  }

  public render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#00d4f2',
          // paddingHorizontal: 16,
        }}
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
            title="BEP"
            // containerStyle={{ marginTop: 16, marginHorizontal: 2 }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginLeft: 8,
            }}
          >
            <Text>Bondan Eko Prasetyo</Text>
            <Text>$bondan23</Text>
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
              <Text>Rp.100.000</Text>
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
                flex: 0.25,
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

            <View
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
            </View>

            <View
              style={{
                flex: 0.25,
                alignItems: 'center',
                justifyContent: 'center',
              }}
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
              <Text style={{ fontSize: 10 }}>Top up</Text>
            </View>

            <TouchableOpacity
              style={{
                flex: 0.25,
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
