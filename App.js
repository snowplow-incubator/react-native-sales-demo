/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  Modal,
} from 'react-native';

import {NativeModules} from 'react-native';
const RNSnowplowTracker = NativeModules.RNSnowplowTracker;

const screenView = () => {
  console.log('screenview');
  RNSnowplowTracker.trackScreenViewEvent(
    'Name',
    null,
    null,
    null,
    null,
    null,
    null,
    [],
  );
};

const itemImpression = ({id, name}) => {
  RNSnowplowTracker.trackSelfDescribingEvent(
    {
      schema: 'iglu:com.snowplow/impression/jsonschema/1-0-0',
      data: {},
    },
    [
      {
        schema: 'iglu:com.demostore/product_entity/jsonschema/1-0-0',
        data: {product_id: id, color: name, name, price: 1},
      },
    ],
  );
};

const itemEngage = ({type, id}) => {
  console.log('engage', type, id);
};

const Item = ({id, title, teaser, body, image, onClose}) => {
  // screenview on listing view
  // impression on item teaser render with item entity
  // click leads to engage event with type expand with item entity
  // screenview on actual view with item entity
  // engage click leads to 'engage/like/share' engage event again with item
  // close leads to screenview on the main page
  const [modalVisible, setModalVisible] = useState(false);
  const onShow = () => screenView(id);

  useEffect(() => {
    itemImpression({id, name: title});
  }, [id, title]);

  return (
    <View>
      <Text>{title}</Text>
      <Image source={image} />
      <Text>{teaser}</Text>
      <Button
        title={'View item'}
        onPress={() => {
          setModalVisible(true);
          itemEngage({type: 'expand', id});
        }}>
        View item
      </Button>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onShow={onShow}
        onDismiss={onClose}>
        <View>
          <Text>{title}</Text>
          <Image source={image} />
          <Text>{body}</Text>
          <Button title={'Like'} onPress={() => itemEngage({type: 'Like', id})}>
            Like
          </Button>
          <Button title={'Close'} onPress={() => setModalVisible(false)}>
            Close
          </Button>
        </View>
      </Modal>
    </View>
  );
};

const imageOne = require('./img/1.png');
const imageTwo = require('./img/3.png');
const imageThree = require('./img/shirtgreen.png');
const items = [
  {
    id: 1,
    title: 'iten one',
    teaser: 'teaser one',
    body: 'body one',
    image: imageOne,
  },
  {
    id: 2,
    title: 'item two',
    teaser: 'teaser two',
    body: 'body one',
    image: imageTwo,
  },
  {
    id: 3,
    title: 'item three',
    teaser: 'teaser three',
    body: 'body three',
    image: imageThree,
  },
];

const App: () => React$Node = () => {
  RNSnowplowTracker.initialize(
    'demo.snowplowanalytics.com',
    'post',
    'http',
    'namespace',
    'app-id.13',
    {autoScreenView: false},
  );

  useEffect(() => {
    screenView();
  }, []);

  return (
    <>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text>Hero Area</Text>
          <Text>Listing area</Text>
          <View>
            {items.map(i => (
              <Item {...i} onClose={() => screenView()} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
