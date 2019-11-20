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
  ImageBackground,
  Modal,
} from 'react-native';

import {NativeModules} from 'react-native';
const RNSnowplowTracker = NativeModules.RNSnowplowTracker;

const screenView = () => {
  console.log('screenview')
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

const itemImpression = ({id}) => {
  console.log('impression', id)
};

const itemEngage = ({type, id}) => {
  console.log('engage', type, id)
};

const Item = ({id, title, teaser, body, onClose}) => {
  // screenview on listing view
  // impression on item teaser render with item entity
  // click leads to engage event with type expand with item entity
  // screenview on actual view with item entity
  // engage click leads to 'engage/like/share' engage event again with item
  // close leads to screenview on the main page
  const [modalVisible, setModalVisible] = useState(false);
  const onShow = () => screenView(id);

  useEffect(() => {
    itemImpression({id});
  }, [id]);

  return (
    <View>
      <Text>{title}</Text>
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

const items = [
  {id: 1, title: 'item 33', teaser: 'teaser one', body: 'body one'},
  {id: 2, title: 'item one', teaser: 'teaser one', body: 'body one'},
  {id: 3, title: 'item one', teaser: 'teaser one', body: 'body one'},
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
