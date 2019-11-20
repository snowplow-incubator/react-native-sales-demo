/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const screenView = () => {
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

const Item = () => {
  // screenview on listing view
  // impression on item teaser render with item entity
  // click leads to engage event with type expand with item entity
  // screenview on actual view with item entity
  // engage click leads to 'engage/like/share' engage event again with item
  // close leads to screenview on the main page
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Text>item title</Text>
      <Text>item teaser</Text>
      <Button title={'View item'} onPress={() => setModalVisible(true)}>
        View item
      </Button>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View>
          <Text>In a modal</Text>
          <Button title={'Engage'} onPress={() => setModalVisible(false)}>
            Engage
          </Button>
          <Button title={'Close'} onPress={() => setModalVisible(false)}>
            View item
          </Button>
        </View>
      </Modal>
    </View>
  );
};

const App: () => React$Node = () => {
  RNSnowplowTracker.initialize(
    'ec2-52-56-222-161.eu-west-2.compute.amazonaws.com',
    'post',
    'http',
    'namespace',
    'app-id.13',
    {autoScreenView: false},
  );
  return (
    <>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text>Hero Area</Text>
          <Text>Listing area</Text>
          <View>
            <Item />
            <Item />
            <Item />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
