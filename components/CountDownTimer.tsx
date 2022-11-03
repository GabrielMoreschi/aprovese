import React from 'react'
import { Text } from '../components/Themed';
import { StyleSheet } from 'react-native';

interface ICountdown {
    hours: number;
    minutes: number;
    seconds: number;
}

const CountDownTimer = ({ hours = 0, minutes = 0, seconds = 60 }: ICountdown) => {
    

    const [time, setTime] = React.useState<ICountdown>({hours, minutes, seconds});
    

    const tick = () => {
   
        if (time.hours == 0 && time.minutes == 0 && time.seconds == 0) {
            //reset();         
        } else if (time.minutes == 0 && time.seconds == 0) {
            setTime({hours: time.hours - 1, minutes: 59, seconds: 59});
        } else if (time.seconds == 0) {
            setTime({hours: time.hours, minutes: time.minutes - 1, seconds: 59});
        } else {
            setTime({hours: time.hours, minutes: time.minutes, seconds: time.seconds - 1});
        }
        return time.hours+time.minutes+time.seconds
    };


    //const reset = () => setTime({hours: time.hours, minutes: time.minutes, seconds: time.seconds});

    
    React.useEffect(() => {
        const timerId = setTimeout(() => {
            let stop = tick();
            if (stop != 0) {timerId;}
        }, 1000);
        //return () => clearInterval(timerId);
    });

    
    return (
        <Text
          style={styles.countdownText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">{time.hours.toString().padStart(2, '0')}:{time.minutes
            .toString()
            .padStart(2, '0')}:{time.seconds.toString().padStart(2, '0')}
        </Text>
    );
}

export default CountDownTimer;

const styles = StyleSheet.create({
  countdownText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
});