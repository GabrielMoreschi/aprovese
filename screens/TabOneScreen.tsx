import { StyleSheet } from 'react-native';

//import EditScreenInfo from '../components/EditScreenInfo';
import Question from '../components/Question';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import CountDownTimer from '../components/CountDownTimer';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <CountDownTimer hours={1} minutes={0} seconds={0}/>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Question path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
