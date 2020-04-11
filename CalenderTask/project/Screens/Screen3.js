import React, {Component} from 'react';
import {View, Text} from 'react-native';

import Header from '../components/Header';
import DaysList from '../components/Day';

class Screen3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MonthValue: this.props.route.params.SelectedDay.month,
      ClickedModalPlus:false
    };
    this.handleHeaderValueChangte = this.handleHeaderValueChangte.bind(this);
    this.handlePlusClick = this.handlePlusClick.bind(this);
  }

  handleHeaderValueChangte = Num => {
    this.setState({MonthValue: Num});
  };
  handlePlusClick=()=>{
    this.setState({ClickedModalPlus:!this.state.ClickedModalPlus})
  }

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
            height:100,
            shadowOpacity: 0.5,
          }}>
          <DaysList
            SelectedDate={SelectedDay}
            MonthValue={this.handleHeaderValueChangte}
            ModelState={this.state.ClickedModalPlus}
            onPressGet={this.handlePlusClick}
          />
        </View>
      </View>
    );
  }
}

export default Screen3;
