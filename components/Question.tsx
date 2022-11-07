import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from '../assets/questions/data/testQuestions.json'
import '../assets/style/button.css'

var value = data

export default function Question({ path }: { path: string }) {
  //const [num, setNum] = useState(0);
  //const value = data//JSON.stringify(data)
  const [hits, setHits] = useState('0');
  let question = randomQuestion()
  const handleClick = handleAnswer();
  const checkAnswer = (event: React.MouseEvent<HTMLElement>) => {
    let button = event.target as HTMLButtonElement;
    if (button.value == question.answer) {
      console.log("ACERTOO MIRASVI")
      AsyncStorage.getItem('hits').then((hits) => { 
        if (hits == null) {
          AsyncStorage.setItem('hits', '0')
        }
        else {
          let newHits = parseInt(hits)+1
          AsyncStorage.setItem('hits', newHits.toString())
        }
      });
    }
  };


  if (question == false) {
    return (
      <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.questionText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Acabou
        </Text>
      </View>
    </View>
    );
  }
  else {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.categoriesText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Categorias: {question["categories"].join(', ')}
        </Text>
        <Text
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Ano: {question["year"]},
          Banca: {question["judge"]},
          Órgão: {question["organization"][0]}
        </Text>
        <Text
          style={styles.questionText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {question["question"]}
        </Text>
        {Object.entries(question["options"]).map((e:any,i) => {
          return (
          <Text
            key={i}
            style={styles.questionText}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)">
            <TouchableOpacity onPress={handleClick}>
              <button onClick={checkAnswer} className="buttonA" value={e[0]}>{e[1]['text']}</button>
            </TouchableOpacity>
          </Text>);
        })}
        <Text
          style={styles.questionText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
        </Text>
      </View>
    </View>
  );
}
}

function randomQuestion(): any {
  if (value.length == 0) {
    return false
  }
  let randomNum = Math.floor(Math.random() * value.length);
  let cachedValue = value[randomNum];
  value.splice(randomNum,1);
  if (checkValidQuestion(cachedValue) == true) {
    return cachedValue;
  }
  return randomQuestion()
}

function checkValidQuestion(question:any) {
  let isValid = true
  if (question["answer"] == null) {
    return false
  }
  if (question["images"].length > 0) {
    return false
  }
  Object.values(question["options"]).forEach((o:any) => {
    if (o.images.length > 0) {
      isValid = false;
      return
    }
  });
  return isValid
}

function handleAnswer() {
  const [refresh, setRefresh] = React.useState(0)
  return () => setRefresh(refresh => refresh + 1);
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


