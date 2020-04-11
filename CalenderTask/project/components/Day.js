import * as React from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import HandleDayView from './HandleDayView';
import {weekdays} from 'moment';
const {height, width} = Dimensions.get('window');

class CalenderStrip extends React.Component {
  months = [
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
  ];
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  nDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  constructor(props) {
    super(props);
    this.state = {
      activeDate: new Date(),
      SelectedDate: this.props.SelectedDate,
      CalenderData: [],
      YrCalenderData: [],
      MarkingData: [],
      Highlight: false,
    };
    this.MonthIndex = null;
    this.SelectedItemIndex = 0;
    this.CalenderDataFiltered = [];
    this.getIndexotheScroll = this.getIndexotheScroll.bind(this);
    // this.getfilteredData = this.getfilteredData.bind(this);
    this.DataProvider = this.DataProvider.bind(this);
    this.onItemPress = this.onItemPress.bind(this);
    this.getItemLayout = this.getItemLayout.bind(this);
//    this.scrollToItem = this.scrollToItem.bind(this);
  }

  componentDidMount() {
    this.DataProvider();
    this.getIndexofSelectedItem();

  }

  DataProvider = () => {
    const {SelectedDate} = this.state;
    var year = SelectedDate.year;
    var month = SelectedDate.month;
    var day = SelectedDate.day;
    var firstDay = new Date(year, month, 1).getDay();
    var firstDayfirstmonth = new Date(year, 1, 1).getDay();
    var maxDays = this.nDays[month];
    if (month == 1) {
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }
    const yrCalMonthwise = [];
    var WholeYr = [];
    var Weekdays = firstDayfirstmonth;
    for (var j = 0; j < 12; j++) {
      yrCalMonthwise[j] = [];
      for (var i = 0; i < this.nDays[j]; i++) {
        yrCalMonthwise[j][i] = {};
        yrCalMonthwise[j][i]['month'] = j;
        yrCalMonthwise[j][i]['WeekDays'] = Weekdays % 7; //Math.abs(7-i)%7
        yrCalMonthwise[j][i]['date'] = i + 1;
        Weekdays++;
      }
    }
    yrCalMonthwise.map(item => {
      item.map(date => {
        WholeYr.push(date);
      });
    });
    this.setState(
      {CalenderData: WholeYr, YrCalenderData: WholeYr.slice(0, 50)},
      // () => {
      //   this.scrollToIndex();
      // },
    );
    console.log("year,month,day,firstDay,firstDayfirstmonth,maxDays",WholeYr,year,month,day,firstDay,firstDayfirstmonth,maxDays,yrCalMonthwise)
    return WholeYr;
  };



  getIndexotheScroll = val => {
    let index = Math.floor((val.nativeEvent.contentOffset.x * 7.4) / width) + 4;
    if (index) {
      let monthVal = this.state.CalenderData[index].month;
      console.log('Month Value', index, index + 4);
      this.CalenderDataFiltered = this.state.CalenderData.slice(
        index,
        index + 30,
      );
      this.ItemIndex = index;
      if (monthVal - this.MonthIndex !== 0) {
        // console.log('Diffrencer check', this.MonthIndex - monthVal);
        this.MonthIndex = monthVal;
        this.props.MonthValue(monthVal + 1);
      }
    }
  };

  getItemLayout = (data, index) => ({length: width/7.4, offset: (width/7.4 * index), index});
  // console.log(data,index)

  scrollToIndex = () => {
    console.log('scroll to go');
    let randomIndex = 100;
    this.flatListRef.scrollToIndex({animated: true, index: randomIndex});
  };

  // scrollToItem = () => {
  //   let randomIndex = 100;
  //   this.flatListRef.scrollToIndex({animated: true, index: '' + randomIndex});
  // };
  getIndexofSelectedItem=()=>{
    let totalNumofDays=0
    let month=this.state.SelectedDate.month 
    let day=this.state.SelectedDate.day
    this.nDays.slice(0,month-1).map((item)=>{
      totalNumofDays+=item;
    })
    this.SelectedItemIndex=totalNumofDays+day
  }

  onItemPress = item => {
    console.log('onSelected Item', item);
    if (item.item.date) this.setState({Highlight: !this.state.Highlight});
  };
  render() {
    const {onItemPress, solar, marked, highlight} = this.props;
    const {SelectedDate, Highlight, CalenderData} = this.state;
    // SelectedDay={year: 2020, month: 4, day: 8, timestamp: 1586304000000, dateString: "2020-04-08"}

    return (
      <View>
        <FlatList
          maxToRenderPerBatch={1}
          windowSize={15}
          removeClippedSubviews={true}
          initialNumToRender={8}
          ref={ref => {
            this.flatListRef = ref;
          }}
          getItemLayout={this.getItemLayout}
          initialScrollIndex={this.SelectedItemIndex-3}
          onScroll={this.getIndexotheScroll}
          showsHorizontalScrollIndicator={false}
          style={{margin: 15}}
          horizontal
          data={CalenderData}
        
          keyExtractor={item => String(item.index)}
          renderItem={item => {
            return (
              <View style={{flex: 1}}>
                <HandleDayView
                  item={item}
                  onItemPress={() => this.onItemPress(item)}
                  highlight={this.state.Highlight}
                  // marked={}
                />
              </View>
            );
          }}
        />
        <View style={{alignSelf: 'center', position: 'absolute', bottom: -8}}>
          <Text>{SelectedDate.dateString}</Text>
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
  },
  itemContainer: {
    width: width / 7.4,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(100,100,100,0.1)',
  },
});
export default CalenderStrip;
