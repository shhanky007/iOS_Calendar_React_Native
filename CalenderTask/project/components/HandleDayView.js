import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');
weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

class HandleDayView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highlight:false,
    };
    this.handleOnPressf=this.handleOnPress.bind(this);
  }
  
  handleOnPress=(item)=>{
    const {highlight} = this.state;
    this.setState({highlight:!highlight})
  }

  render() {
    const {onItemPress, item, marked} = this.props;
    const {highlight} = this.state;
    // console.log(item.item)
    return (
      <View>
        <View style={Styles.itemContainer}>
            <View style={{justifyContent:"space-evenly",alignSelf:"center",paddingRight:0}}>
                <Text style={{}}>{weekDays[item.item.WeekDays]}</Text>
            </View>
          <TouchableOpacity
            underlayColor="#008b8b"
            style={Styles.itemWrapButton}
            onPress={()=>this.handleOnPressf(item,onItemPress)}>
            <View
              style={[
                Styles.itemView, //itemView itemDateText itemBottomDot itemWrapButton itemContainer
                {backgroundColor: highlight ? '#000' : 'transparent'},
              ]}>
              <Text
                style={[
                  Styles.itemDateText,
                  {color: highlight ? '#fff' : 'rgba(0,0,0,0.9)',
                  fontWeight: highlight ? "700" : "400",
                },
                ]}>
                {item.item.date}
              </Text>

              {marked && (
                <View
                  style={[
                    Styles.itemBottomDot,
                    {backgroundColor: highlight ? 'white' : '#6D88E6'},
                  ]}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  DaysContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
    padding: 3,
    backgroundColor: '#42C',
  },
  Days: {
    flex: 1,
    paddingRight: 7,
    paddingBottom: 3,
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
    textAlignVertical: 'bottom',
  },
  Marking: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: 'red',
  },
  itemView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 4,
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  itemDateText: {
    fontSize: 18,
    lineHeight: Platform.OS === 'ios' ? 19 : 30,
  },
  itemBottomDot: {
    width: 4,
    height: 4,
    left: 20,
    bottom: 6,
    borderRadius: 2,
    position: 'absolute',
  },
  itemWrapButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation:3,
  },
  itemContainer: {
    width: width / 7.4,
    height: 60,
    marginBottom:5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(000,000,000,0.0)',
  },
});
export default HandleDayView;
