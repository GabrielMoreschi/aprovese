import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {useState} from 'react';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from '../assets/questions/data/newQuestions.json'

export default function Question({ path }: { path: string }) {
  //const [num, setNum] = useState(0);
  const value = data//JSON.stringify(data)
  let qNum = randomNumberInRange(1, 5)
  return (
    <View>
      <View style={styles.getStartedContainer}>
      <Text
          style={styles.categoriesText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Categorias: {value[qNum]["categories"].join(', ')}
        </Text>
        <Text
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Ano: {value[qNum]["year"]},
          Banca: {value[qNum]["judge"]},
          Órgão: {value[qNum]["organization"][0]}
        </Text>
        <Text
          style={styles.questionText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {value[qNum]["question"]}
        </Text>
        <Text
          style={styles.questionText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {JSON.stringify(value[qNum]["options"])}
        </Text>
        <Text
          style={styles.questionText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Respota: {value[qNum]["answer"]}
        </Text>
      </View>
      

      <View style={styles.helpContainer}>
        <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
            Tap here if your app doesn't automatically update after making changes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function randomNumberInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  categoriesText: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 17,
    lineHeight: 24,
    marginTop: 12,
    textAlign: 'justify',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
