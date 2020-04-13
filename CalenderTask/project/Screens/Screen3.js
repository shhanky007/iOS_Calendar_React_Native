import React, {Component} from 'react';
import {View, Text,Alert, StyleSheet} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import Header from '../components/Header';
import DaysList from '../components/Day';
import {constant} from '../DataManager/DataModals';

const {months,weekDays}=constant;

class Screen3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rerender:false,
      MonthValue: this.props.route.params.SelectedDay.month,
      SeleactedDay: this.props.route.params.SelectedDay,
      ClickedModalPlus: false,
      EventData:[]
    };
    this.handleHeaderValueChangte = this.handleHeaderValueChangte.bind(this);
    this.handlePlusClick = this.handlePlusClick.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  handleHeaderValueChangte = Num => {
    this.setState({MonthValue: Num});
  };

 async componentDidMount(){
  try {
    const value = await AsyncStorage.getItem("TEST")
    if(value !== null) {
      let data=JSON.parse(value)
        this.setState({EventData:data})
    }
  } catch(e) {console.log(e)}
}

saveDatatotheAsyncStore=async()=>{
if(this.state.EventData.length>0){
  try{let Data=JSON.stringify(this.state.EventData)
      await AsyncStorage.setItem("TEST",`${Data}`).then((data)=>console.log("Data has been Successfully Changed")).catch((e)=>console.log('Found the error in the Saving data',e))}
  catch(e){console.log(e)}}}

handlePlusClick = (Val) => {
  console.log('VAL',Val)
  if(Val){
    this.setState({EventData:this.state.EventData.concat(Val)},()=>{this.saveDatatotheAsyncStore()})
  }
  this.setState({ClickedModalPlus: !this.state.ClickedModalPlus});
  
};
  
 renderList=()=>{

   const {SeleactedDay,EventData}=this.state
   var selectedWeekDay = new Date( SeleactedDay.year, SeleactedDay.month, SeleactedDay.day).getDay();
   console.log('called Event',EventData)
   if(EventData.length>0){
     return(
       <FlatList 
        data={EventData}
        keyExtractor={(item)=>{item.date||item.Date.date-`${item}`}}
        renderItem={({item,index})=>{
          console.log(item)
            return(  
            <TouchableOpacity onPress={()=>Alert.alert('Event Action','What you wanna do?',
            [{text: "Delete", onPress: () => {
              EventData.splice(index,1)
              this.saveDatatotheAsyncStore()
              this.setState({rerender:!this.state.rerender})
            }},
              {text: "Cancel", onPress: () => console.log("Canceled Pressed")}])}>
              <View>
             <View>
               <Text style={Styles.Headertext}>
                   {weekDays[item.Date.WeekDays?item.Date.WeekDays:selectedWeekDay]},{months[item.Date.month?item.Date.month:SeleactedDay.month]}, {item.Date.date?item.Date.date:item.Date.day}
               </Text>
             </View>
             <View
               style={Styles.EvenDataWrapper}>
               <View
                 style={Styles.DataWrapperEvent}>
                 <Text style={{padding: 8}}>All-day</Text>
               </View>
               <View style={{flex: 0.8, padding: 8}}>
                 <Text >{item.Title}</Text>
                 <Text >{item.Note}</Text>
               </View>
             </View>
           </View>
           </TouchableOpacity>
           )
          }}/>)}
   else{return ;}
  }       

  render() {
    const {SelectedDay} = this.props.route.params;
    // SelectedDay={year: 2020, month: 4, day: 8, timestamp: 1586304000000, dateString: "2020-04-08"}
    return (
      <View>
        <Header
          ShowBackArrow={true}
          Navigation={this.props.navigation}
          Headertext={this.state.MonthValue || SelectedDay.day}
          isWeekShow={false}
          isAddButtonVisible={true}
          heightPerc={0.2}
          PlusOnPress={this.handlePlusClick}
        />
        <View
          style={Styles.DataListWrapper}>
          <DaysList
            SelectedDate={SelectedDay}
            MonthValue={this.handleHeaderValueChangte}
            ModelState={this.state.ClickedModalPlus}
            onPressGet={this.handlePlusClick}
          />
        </View>
            {this.renderList()}
        </View>
    );
  }
}

const Styles=StyleSheet.create({
  EvenDataWrapper:{
    flexDirection: 'row',
    backgroundColor: 'white',
    flex: 1,
    height: 45,
    paddingVertical: 2,
    alignItems: 'center',
  },
  Headertext:{
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 8,
  },
  DataWrapperEvent:{
    flex: 0.2,
    borderLeftColor: 'purple',
    borderRightWidth: 1,
  },
  DataWrapper:{
    position: 'absolute',
    elevation: 4,
    top: 40,
    elevation: 4,
    backgroundColor: '#f0f0f0',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    height: 100,
    shadowOpacity: 0.5,
  }
})

export default Screen3;
