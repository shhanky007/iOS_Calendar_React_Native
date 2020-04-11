import React from 'react';
import { View, Text,Dimensions, StyleSheet} from 'react-native';


const width = Dimensions.get('window').width;
const WeekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
Weeks= ({ weekStartsOn }) => {
  const weekStartsfrom = weekStartsOn % 7;
  const weekTranformed = [...Weeks.slice(weekStartsfrom),  ...Weeks.slice(0, weekStartsfrom),];
  return (
    <View style={Styles.container}>
      {weekTranformed.map(day =>
        <View style={Styles.WeekContainer} key={day}>
          <Text style={Styles.WeeksNameText}>{day}</Text>
        </View>
      )}
    </View>
  );
}

const Styles=StyleSheet.create({
    container:{
        width,
        height: 30,
        flexDirection: 'row',
      },
    WeekContainer:{
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      WeeksNameText:{
        color: 'gray',
        fontSize: 12,
      }

})
export default Weeks;