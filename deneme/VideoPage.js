import React, {Component} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import LottieView from 'lottie-react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import hilal from './hilal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'red',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  safeAreaView: {
    margin: 22,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: -50,
  },
  lottieView: {
    height: 300,
  },
});

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      images: null,
    };
  }

  pickSingleWithCamera(cropping, mediaType = 'photo') {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then((image) => {
        console.log('received image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch((e) => alert(e));
  }

  pickSingle(cropit, circular = false, mediaType) {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then((image) => {
        console.log('received image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  renderVideo(video) {
    console.log('rendering video');
    return (
      <View style={{height: 300, width: 300}}>
        <Video
          source={{uri: video.uri, type: video.mime}}
          style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
          rate={1}
          paused={false}
          volume={1}
          muted={false}
          resizeMode={'cover'}
          onError={(e) => console.log(e)}
          onLoad={(load) => console.log(load)}
          repeat={false}
        />
      </View>
    );
  }

  renderImage(image) {
    return (
      <Image
        style={{width: 300, height: 300, resizeMode: 'contain'}}
        source={image}
      />
    );
  }

  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return this.renderVideo(image);
    }

    return this.renderImage(image);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.image ? this.renderAsset(this.state.image) : null}
          {this.state.images
            ? this.state.images.map((i) => (
                <View key={i.uri}>{this.renderAsset(i)}</View>
              ))
            : null}
        </ScrollView>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeAreaView}>
          <Text style={styles.title}>Beraberken Daha Güçlüyüz💪🏻</Text>
          <Text style={styles.subtitle}>
            Bizimle hikayenizi, deneyimlerinizi paylaşabilirsiniz.
          </Text>
          <LottieView
            style={styles.lottieView}
            source={require('../animations/1919-share-the-love.json')}
            autoPlay
            loop
          />
        </SafeAreaView>
        <TouchableOpacity
          onPress={
            () => this.props.navigation.navigate('FunStoryAdd')
            //this.pickSingleWithCamera(false, (mediaType = 'video'))
          }
          style={styles.button}>
          <Text style={styles.text}>
            Yazmak İstiyorum Diyenleri Böyle Alalım!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            this.pickSingleWithCamera(false, (mediaType = 'video'))
          }
          style={styles.button}>
          <Text style={styles.text}>Video Çekmek İstiyorum!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.pickSingle(false)}>
          <Text style={styles.text}>Video Yüklemek İstiyorum!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
