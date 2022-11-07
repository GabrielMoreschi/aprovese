import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {useState} from 'react';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from '../assets/questions/data/testQuestions.json'
import '../assets/style/button.css'

export default function Question({ path }: { path: string }) {
  //const [num, setNum] = useState(0);
  const value = data//JSON.stringify(data)
  let qNum = randomNumberInRange(1, 5)
  console.log(Object.entries(value[qNum]["options"]).map(e => e[0]+e[1]['text']))
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
        <Text
          style={styles.questionText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          <h1 className="buttonA">Teste</h1>
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
  
/*   <!-- HTML !-->
<button class="button-84" role="button">Button 84</button>
.button-84 {
  align-items: center;
  background-color: initial;
  background-image: linear-gradient(#464d55, #25292e);
  border-radius: 8px;
  border-width: 0;
  box-shadow: 0 10px 20px rgba(0, 0, 0, .1),0 3px 6px rgba(0, 0, 0, .05);
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  font-family: expo-brand-demi,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 18px;
  height: 52px;
  justify-content: center;
  line-height: 1;
  margin: 0;
  outline: none;
  overflow: hidden;
  padding: 0 32px;
  text-align: center;
  text-decoration: none;
  transform: translate3d(0, 0, 0);
  transition: all 150ms;
  vertical-align: baseline;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-84:hover {
  box-shadow: rgba(0, 1, 0, .2) 0 2px 8px;
  opacity: .85;
}

.button-84:active {
  outline: 0;
}

.button-84:focus {
  box-shadow: rgba(0, 0, 0, .5) 0 0 0 3px;
}

@media (max-width: 420px) {
  .button-84 {
    height: 48px;
  }
} */
});


