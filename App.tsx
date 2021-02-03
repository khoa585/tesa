// import React from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet
// } from 'react-native';
// import Navigation from './src/navigations';

// const App = () => {

//   return (
//     <>
//       <StatusBar backgroundColor='#DBDFEF' />
//       <SafeAreaView style={styles.container}>
//         <Navigation></Navigation>
//       </SafeAreaView>
//     </>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   }
// })
import React, { Component, createRef } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  Easing
} from 'react-native';

let CurrentSlide = 0;
let IntervalTime = 4000;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      link: [
        'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
        'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
        'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
        'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
        'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
        'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
        'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
        'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
        'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
        'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
        'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
        'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
        'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
        'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
        'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
        'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
        'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
        'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
        'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
      ],
      count: 0
    }
    this.scrollX = 0;
  
    
    this.offset = new Animated.Value(0);
    this.scrollTo = this.scrollTo.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    // Listener to call the scrollToOffset function
    this.offset.addListener(this.scrollTo);

  
  }

  _scroller() {
    toValue = this.scrollX + 100; // Scroll 10 pixels in each loop
    this.animation = Animated.timing(
      this.offset,
      {
        toValue: toValue,
        duration: 1000, // A loop takes a second
        easing: Easing.linear,
        useNativeDriver: false
      }
    );
    this.animation.start(() => this._scroller()); //Repeats itself when done
  }

  scrollTo(e) {
    if (this.carousel && this.state.count === 0) {
      this.carousel.scrollToOffset({ offset: e.value });
    }
  }

  handleScroll(event) {
    // Save the x (horizontal) value each time a scroll occurs
    this.scrollX = event.nativeEvent.contentOffset.x;
    if (event.nativeEvent.contentOffset.x > 300) {
      this.scrollX = 0
      this.setState({
        count: 1
      })

    
    }
 
  }

  componentDidMount() {
    this._scroller();
  }
  _renderItem({ item, index }) {
    return <Image source={{ uri: item }} style={styles.sliderItems} />;
  }

  // TODO _keyExtractor()
  _keyExtractor(item, index) {
    // console.log(item);
    return index.toString();
  }


  render() {

    return (
      <View style={{ marginTop: 10, marginBottom: 10, flex: 1 }}>

        <FlatList
          style={{
            flex: 1,
            // TODO Remove extera global padding
            // marginLeft: -size.padding,
            // marginRight: -size.padding,
          }}
          data={this.state.link}
          keyExtractor={this._keyExtractor.bind(this)}
          renderItem={this._renderItem.bind(this)}
          horizontal={true}
          flatListRef={React.createRef()}
          ref={el => this.carousel = el}
          onScroll={this.handleScroll}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sliderItems: {

    height: 200,
    width: 200,
  },
});