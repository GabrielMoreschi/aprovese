import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';

import { Text, View } from './Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from '../assets/questions/data/mathQuestions.json'
//import '../assets/style/button.css'

//import StorageHits from './AsyncHits';

var value = data


export default function Question({ path }: { path: string }) {
  //const [num, setNum] = useState(0);
  //const value = data//JSON.stringify(data)
  const [hits, setHits] = useState('0');
  const [failures, setFailures] = useState('0');
  let question = randomQuestion()
  const handleClick = handleAnswer();
  const checkAnswer = (event: React.MouseEvent<HTMLElement>) => {
    let button = event.target as HTMLButtonElement;
    if (button.value == question.answer) {
      setHits((parseInt(hits)+1).toString())
    }
    else {
      setFailures((parseInt(failures)+1).toString())
    }
  }


React.useEffect(() => {
  AsyncStorage.getItem('hits').then(h => {
    if (h !== null) {
      if (hits != h) {
        AsyncStorage.setItem('hits', hits)
      }
    }
    else {
      AsyncStorage.setItem('hits', '0')
    }
  });
  AsyncStorage.getItem('failures').then(f => {
    if (f !== null) {
      if (failures != f) {
        AsyncStorage.setItem('failures', failures)
      }
    }
    else {
      AsyncStorage.setItem('failures', '0')
    }
  })
});

function refreshPage() {
  window.location.reload();
}

if (question == false) {
  return (
    
    <View>
      
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.questionText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
        <button onClick={refreshPage} className="buttonA">Reiniciar</button>
        </Text>
      </View>
    </View>
  );
}
else {
  //<HitsContext.Provider value={{hits,setHits}}></HitsContext.Provider>
  return (
    <ScrollView>
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
        {Object.entries(question["options"]).map((e: any, i) => {
          return (
            <Text
              key={i}
              style={styles.questionText}
              lightColor="rgba(0,0,0,0.8)"
              darkColor="rgba(255,255,255,0.8)">
              <TouchableOpacity onPress={handleClick}>
                <button onClick={checkAnswer} style={styles.button} value={e[0]}>{e[1]['text']}</button>
              </TouchableOpacity>
            </Text>);
        })}
        <Text
          style={styles.questionText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
        </Text>
      </View>
    </ScrollView>
  );
}
}

function randomQuestion(): any {
  if (value.length == 0) {
    return false
  }
  let randomNum = Math.floor(Math.random() * value.length);
  let cachedValue = value[randomNum];
  value.splice(randomNum, 1);
  if (checkValidQuestion(cachedValue) == true) {
    return cachedValue;
  }
  return randomQuestion()
}

function checkValidQuestion(question: any) {
  let isValid = true
  if (question["answer"] == null) {
    return false
  }
  if (question["images"].length > 0) {
    return false
  }
  Object.values(question["options"]).forEach((o: any) => {
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
  button: {
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "black",
    overflow: "hidden",
  },
});


