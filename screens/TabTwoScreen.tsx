import { StyleSheet } from 'react-native';

import Statistics from '../components/Statistics';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Statistics />
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
