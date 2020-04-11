import React, {Component} from 'react';
import {View, Text, SectionList} from 'react-native';

import Header from '../components/Header';
import DaysList from '../components/Day';
import {FlatList, ScrollView} from 'react-native-gesture-handler';

const DummyData = [
  {
    day: 'Sun',
    month: 'Apr',
    date: '12',
    data: {
      eventValue: 'Ester',
    },
  },
  {
    day: 'Mon',
    month: 'Apr',
    date: '13',
    data: {
      eventValue: 'Yoga Day',
    },
  },
  {
    day: 'Tue',
    month: 'Apr',
    date: '14',
    data: {
      eventValue: 'Jayanti',
    },
  },
  {
    day: 'Friday',
    month: 'June',
    date: '23',
    data: {
      eventValue: 'Shikara',
    },
  },
  {
    day: 'Sun',
    month: 'July',
    date: '25',
    data: {
      eventValue: 'Test data',
    },
  },
  {
    day: 'Wed',
    month: 'Aug',
    date: '15',
    data: {
      eventValue: 'Independence Day',
    },
  },
  {
    day: 'Sun',
    month: 'Apr',
    date: '12',
    data: {
      eventValue: 'Ester',
    },
  },
  {
    day: 'Mon',
    month: 'Apr',
    date: '13',
    data: {
      eventValue: 'Yoga Day',
    },
  },
  {
    day: 'Tue',
    month: 'Apr',
    date: '14',
    data: {
      eventValue: 'Jayanti',
    },
  },
  {
    day: 'Friday',
    month: 'June',
    date: '23',
    data: {
      eventValue: 'Shikara',
    },
  },
  {
    day: 'Sun',
    month: 'July',
    date: '25',
    data: {
      eventValue: 'Test data',
    },
  },
  {
    day: 'Wed',
    month: 'Aug',
    date: '15',
    data: {
      eventValue: 'Independence Day',
    },
  },
];

class Screen3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MonthValue: this.props.route.params.SelectedDay.month,
      ClickedModalPlus: false,
    };
    this.handleHeaderValueChangte = this.handleHeaderValueChangte.bind(this);
    this.handlePlusClick = this.handlePlusClick.bind(this);
  }

  handleHeaderValueChangte = Num => {
    this.setState({MonthValue: Num});
  };
  handlePlusClick = () => {
    this.setState({ClickedModalPlus: !this.state.ClickedModalPlus});
  };

  render() {
    const {SelectedDay} = this.props.route.params;
    // console.log('Month Value', this.state.MonthValue);
    // SelectedDay={year: 2020, month: 4, day: 8, timestamp: 1586304000000, dateString: "2020-04-08"}
    // console.log(SelectedDay);
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
          // Children={<DaysList
          //   SelectedDate={SelectedDay}
          //   MonthValue={(Num)=>{this.setState({MonthValue:Num})}}
          // />}
        />
        <View
          style={{
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
          }}>
          <DaysList
            SelectedDate={SelectedDay}
            MonthValue={this.handleHeaderValueChangte}
            ModelState={this.state.ClickedModalPlus}
            onPressGet={this.handlePlusClick}
          />
        </View>
        <View style={{top: 80}}>
          <ScrollView style={{}}>
            {DummyData.map(item => {
              return (
                <View>
                  <View>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        paddingLeft: 8,
                      }}>
                      {item.day},{(item.month)} {item.date}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'white',
                      flex: 1,
                      height: 45,
                      paddingVertical: 2,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flex: 0.2,
                        borderLeftColor: 'purple',
                        borderRightWidth: 1,
                      }}>
                      <Text style={{padding: 8}}>All-day</Text>
                    </View>
                    <Text style={{flex: 0.8, padding: 8}}>
                      {item.data.eventValue}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Screen3;
