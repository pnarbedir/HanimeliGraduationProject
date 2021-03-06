import React, {Component} from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from 'native-base';
import {Header} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import {Alert, StyleSheet} from 'react-native';
import AciklamaEkrani from './AciklamaEkrani';
export default class ListAvatarExample extends Component {
  constructor() {
    super();
    this.state = {
      categoryInput: ' ',
    };
  }
  InsertData = (kategoriId) => {
    const {getParam} = this.props.navigation;
    const adi = getParam('adi');
    const aciklama = getParam('aciklama');
    const fiyat = getParam('fiyat');
    const baseURL = 'http://213.159.30.21/service/api/Urun/';
    fetch(baseURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        userid: 'pnarbedir_',
        //username: userid.username,
        stok: 1,
        kategoriId,
        altkategoriId: 2,
        adi,
        aciklama,
        fiyat,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        const apiRequestUrl = this.state.lastId;
        console.log(
          'RESPONSE >>> ',
          apiRequestUrl,
          JSON.stringify(data, null, 4),
        );
        console.log(JSON.parse(data.id));
        this.props.navigation.navigate('CameraAndGallery', {
          apiRequestUrl: JSON.parse(data.id),
          adi,
          aciklama,
          fiyat,
          kategoriId,
        });
        console.log('seyma' + JSON.parse(data.id));
      })
      .catch((error) => console.log(error));
  };

  navigateToPreviewScreen = () => {
    this.props.navigation.navigate('AciklamaEkrani');
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container>
        <Content style={{marginTop: 10}}>
          <Header
            style={{height: 120, marginTop: 50}}
            placement={'left'}
            leftComponent={{
              icon: 'arrow-back',
              color: 'black',
              onPress: () => navigate('AciklamaEkrani'),
            }}
            centerComponent={{
              text: 'Kategoriler',
              style: {fontSize: 20, marginTop: -2},
            }}
            containerStyle={{
              backgroundColor: 'white',
              alignItems: 'space-around',
              marginTop: -10,
            }}
          />
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../assets/ben/yemekfoto.jpg')} />
              </Left>
              <Body>
                <Text>Ev Yemekleri</Text>
                <Text note>
                  ????li K??fte, Yaprak Sarma, Ev Baklas??, B??rek, Po??a??a, Kek...
                </Text>
              </Body>
              <Right>
                <Icon
                  name={'arrow-forward'}
                  onPress={() => this.InsertData(2)}
                />
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail
                  source={require('../assets/ben/category-designs.jpg')}
                />
              </Left>
              <Body>
                <Text>Tasar??m ??r??nleri</Text>
                <Text note>
                  Makrome ??r??nler, Has??r ??antalar, Tasar??m Kolyeler, Tasar??m
                  K??peler, Tasar??m Bileklikler, ??rg??ler...
                </Text>
              </Body>
              <Right>
                <Icon
                  name={'arrow-forward'}
                  onPress={() => this.InsertData(3)}
                />
              </Right>
            </ListItem>
            <List>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={require('../assets/ben/diyet.png')} />
                </Left>
                <Body>
                  <Text>Diyet ??r??nleri</Text>
                  <Text note>
                    Yulafl?? ??r??nler, Glutensiz ??r??nler, Rafine ??ekersiz
                    ??r??nler...
                  </Text>
                </Body>
                <Right>
                  <Icon
                    name={'arrow-forward'}
                    onPress={() => this.InsertData(4)}
                  />
                </Right>
              </ListItem>
              <ListItem avatar>
                <Left>
                  <Thumbnail
                    source={require('../assets/ben/category-baby.jpg')}
                  />
                </Left>
                <Body>
                  <Text>Bebekler ????in</Text>
                  <Text note>
                    Do??al Kemik Sular??, Meyve P??releri, Bebek Kekleri...
                  </Text>
                </Body>
                <Right>
                  <Icon
                    name={'arrow-forward'}
                    onPress={() => this.InsertData(5)}
                  />
                </Right>
              </ListItem>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={require('../assets/ben/others.jpg')} />
                </Left>
                <Body>
                  <Text>Di??er</Text>
                  <Text note>Kategorilerde bulunmayan di??er ??r??nler....</Text>
                </Body>
                <Right>
                  <Icon
                    name={'arrow-forward'}
                    onPress={() => this.InsertData(6)}
                  />
                </Right>
              </ListItem>
            </List>
          </List>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({});
