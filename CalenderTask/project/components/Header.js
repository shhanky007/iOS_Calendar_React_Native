import React, {Component, Children} from 'react';
import {View, Text, StatusBar, StyleSheet, Dimensions} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

const {width, height} = Dimensions.get('window');
const Months=[
  'Calendar',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const Weeks=[ 'S','M','T','W','T','F','S']
const orange = 'rgba(242,55,5,1)';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCalendar: true,
    };
    this.toggleCalenderICon=this.toggleCalenderICon.bind(this)
  }

  toggleCalenderICon(){
    const {isCalendar}=this.state
    this.setState({isCalendar:!isCalendar})
  }
  render() {
    const {ShowBackArrow, isWeekShow, isToggle,Navigation,Headertext,PlusOnPress,isSearchVisible,isAddButtonVisible } = this.props;
    const HeaderValue=Months[Headertext];
    const {isCalendar} = this.state;
    return (
      <View style={Styles.MainContainer}>
        <View style={Styles.HeaderConatainer}>
          <View style={Styles.HeaderSubContainer}>
            {ShowBackArrow ? (
              <TouchableOpacity style={{flexDirection:"row"}}onPress={()=>Navigation.goBack()}>
                <Ionicons
                  name="ios-arrow-back"
                  color={orange}
                  size={40}
                  style={Styles.BackArrow}
                  />
                  <Text style={Styles.HeaderText}>{HeaderValue}</Text>
              </TouchableOpacity>
            ) : <View style={[Styles.BackArrow,{height:40,width:14}]}></View>}
            {(Headertext&&!ShowBackArrow)?<Text style={Styles.HeaderText}>{Headertext}</Text>:null}
          </View>

          <View style={Styles.HeaderSubContainer2}>
            {isCalendar ? (
              <TouchableOpacity
                onPress={() =>{isToggle(),this.toggleCalenderICon()}  
                }>
                <AntDesign
                  name="calendar"
                  color={orange}
                  size={30}
                  style={Styles.CalendarStyle}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={()=>{
                  isToggle()
                  this.toggleCalenderICon()}
                }>
                <MaterialCommunityIcons
                  name="calendar-week"
                  color={orange}
                  size={30}
                  style={Styles.CalendarWeekStyle}
                />
              </TouchableOpacity>
            )}
{ isSearchVisible?          
           <TouchableOpacity onPress={()=>{try{AsyncStorage.clear()}catch(e){}}}>
              <AntDesign
                name="search1"
                color={orange}
                size={30}
                style={Styles.BackArrow}
              />
            </TouchableOpacity>:null
              }
{ isAddButtonVisible?              
            <TouchableOpacity  onPress={() =>{PlusOnPress()}} >
              <AntDesign
                name="plus"
                color={orange}
                size={30}
                style={Styles.AddStyle}
              />
            </TouchableOpacity>:null}
          </View>
        </View>
        {isWeekShow?
        <View style={Styles.WeekStyle}>
         {Weeks.map((item,index)=>{
           return <Text key={`${item}-`+index}>{item}</Text>
         })}
        </View>:null}
{/* 
         <View style={{position:"absolute",top:25}}>
           {Children}
         </View> */}

      </View>
    );
  }
}
const Styles = StyleSheet.create({
  MainContainer: {
    height: height * 0.10,
    elevation: 4,
    backgroundColor: '#f0f0f0',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
  },
  HeaderConatainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  HeaderSubContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    height:42,
    marginTop:2
  },
  BackArrow: {
    marginLeft: 8,
    alignSelf: 'center',
  },
  HeaderText: {
    color: orange,
    marginHorizontal: 10,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '400',
  },
  HeaderSubContainer2: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    height: 42,
    marginTop:5

  },
  CalendarStyle: {
    marginHorizontal: 12,
    alignSelf: 'center',
  },
  CalendarWeekStyle: {
    marginHorizontal: 12,
    alignSelf: 'center',
  },
  AddStyle: {
    marginHorizontal: 12,
    alignSelf: 'center',
  },
  WeekStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal:15
  },
});

export default Header;
