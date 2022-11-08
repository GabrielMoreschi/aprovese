import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import '../assets/style/skillbar.css'
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Statistics() {
  const [hits, setHits] = useState('0');
  const [failures, setFailures] = useState('0');

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('hits').then(h => {
        if (h !== null) {
          setHits(h);
        }
      });
      AsyncStorage.getItem('failures').then(f => {
        if (f !== null) {
          setFailures(f);
        }
      });
    }, [])
  );

  React.useEffect(() => {
    AsyncStorage.getItem('hits').then(h => {
      if (h !== null) {
        setHits(h);
      }
    });
    AsyncStorage.getItem('failures').then(f => {
      if (f !== null) {
        setFailures(f);
      }
    });
  });
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ['Erros', 'Acertos'],
    datasets: [
      {
        label: 'Estatísticas',
        data: [failures, hits],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <View>
      <View style={styles.getStartedContainer}>
      <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          <div className="skillBar">
           <div className="level" style={{width:((Math.sqrt(parseInt(hits))*5)%1)*100+'%'}}>
           Level: {Math.floor(Math.sqrt(parseInt(hits))*5)} ({Math.round((((Math.sqrt(parseInt(hits))*5)%1)*100)*100)/100}%)
            </div>
          </div>
  
        </Text>
        <Text
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          <Doughnut data={data} />
        </Text>
      </View>
    </View>
  );
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
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
});
