import React, {Component} from 'react';
import {View, Text, FlatList, Dimensions, ScrollView} from 'react-native';
import Header from '../components/Header';

import Calender from '../components/Calender';

const {height, width} = Dimensions.get('window');

import {
  Agenda,
  AgendaItemsMap,
  AgendaProps,
  AgendaThemeStyle,
  CalendarList,
  ExpandableCalendar,
  Calendar
} from 'react-native-calendars';
import moment from 'moment';

const months=moment.months()

const Calender_Height = height - 70;
const Calender_Width = width - 70;

class Screen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCalendarView:true,
      onSelectDate:''
    };
    this.toggleView = this.toggleView.bind(this)
  }

  toggleView(){
    const {isCalendarView}=this.state
    this.setState({isCalendarView:!isCalendarView})
  }
  render() {
    const {isCalendarView}=this.state
    return (
      <View style={{flex:1}}>    
        <Header isToggle={this.toggleView} isWeekShow={true} Headertext="Calendar" />
        <View>
          {!isCalendarView?
          <Calendar 
            style={{height:350}}
            hideArrows={true}
            hideExtraDays={true}
            markedDates={{
              [this.state.onSelectDate]: {selected: true, selectedColor: 'black'},
            }}
            onDayPress={(day)=>{
            this.setState({onSelectDate:day.dateString})
            setTimeout(() => {
              this.props.navigation.navigate("Screen3",{SelectedDay:day})
              this.setState({onSelectDate:''})
            }, 10);
            }
            
            }
            />:
            <CalendarList
            onDayPress={(day)=>{
             this.props.navigation.navigate("Screen3", {SelectedDay:day})
            }}
            />}
        </View>
      </View>
    );
  }
}

export default Screen2;
