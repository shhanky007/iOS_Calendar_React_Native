import * as React from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  TextInput,
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
  weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednessday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
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
      selectedItem: null,
      isModalVisible: this.props.onPressGet,
    };
    this.MonthIndex = null;
    this.SelectedItemIndex = 0;
    this.DefaultSelectedDate = null;
    this.isDefaultEnabled = false;
    this.CalenderDataFiltered = [];
    this.SelItemValue = {};
    this.getIndexotheScroll = this.getIndexotheScroll.bind(this);
    // this.getfilteredData = this.getfilteredData.bind(this);
    this.DataProvider = this.DataProvider.bind(this);
    this.onItemPress = this.onItemPress.bind(this);
    this.getItemLayout = this.getItemLayout.bind(this);
    this.renderItem = this.renderItem.bind(this);
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
    //console.log("year,month,day,firstDay,firstDayfirstmonth,maxDays",WholeYr,year,month,day,firstDay,firstDayfirstmonth,maxDays,yrCalMonthwise)
    return WholeYr;
  };

  getIndexotheScroll = val => {
    let index = Math.floor((val.nativeEvent.contentOffset.x * 7.4) / width) + 4;
    if (index) {
      let monthVal = this.state.CalenderData[index].month;
      //console.log('Month Value', index, index + 4);
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

  getItemLayout = (data, index) => ({
    length: width / 7.4,
    offset: (width / 7.4) * index,
    index,
  });

  getIndexofSelectedItem = () => {
    let totalNumofDays = 0;
    let month = this.state.SelectedDate.month;
    let day = this.state.SelectedDate.day;
    this.nDays.slice(0, month - 1).map(item => {
      totalNumofDays += item;
    });
    this.SelectedItemIndex = totalNumofDays + day;
  };

  onItemPress = item => {
    this.setState({selectedItem: item});
  };

  renderItem = ({item}) => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const marked = false;
    let highlight = false;
    if (this.DefaultSelectedDate === item && this.state.selectedItem == null) {
      highlight = true;
      this.isDefaultEnabled = true;
      this.SelItemValue = item;
    } else {
      highlight = this.state.selectedItem === item;
    }
    return (
      <View>
        <View style={Styles.itemContainer}>
          <View
            style={{
              justifyContent: 'space-evenly',
              alignSelf: 'center',
              paddingRight: 0,
            }}>
            <Text style={{}}>{days[item.WeekDays]}</Text>
          </View>
          <TouchableOpacity
            underlayColor="#008b8b"
            style={Styles.itemWrapButton}
            onPress={() => this.onItemPress(item)}>
            <View
              style={[
                Styles.itemView, //itemView itemDateText itemBottomDot itemWrapButton itemContainer
                {backgroundColor: highlight ? '#000' : 'transparent'},
              ]}>
              <Text
                style={[
                  Styles.itemDateText,
                  {
                    color: highlight ? '#fff' : 'rgba(0,0,0,0.9)',
                    fontWeight: highlight ? '700' : '400',
                  },
                ]}>
                {item.date}
              </Text>

              {marked && (
                <View
                  style={[
                    Styles.itemBottomDot,
                    {backgroundColor: highlight === item ? 'white' : '#6D88E6'},
                  ]}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  modalVisible = () => {
    this.setState({isModalVisible: false});
  };
  onModalOpen = () => {
    this.setState({isModalVisible: this.props.onPressGet});
  };

  componentDidUpdate() {
    // this.setState({isModalVisible:true})
  }
  render() {
    const {
      onItemPress,
      solar,
      marked,
      highlight,
      onPressGet,
      ModelState,
    } = this.props;
    const {SelectedDate, Highlight, selectedItem, CalenderData} = this.state;
    // console.log('SelectedDate', selectedItem);

    // SelectedDay={year: 2020, month: 4, day: 8, timestamp: 1586304000000, dateString: "2020-04-08"}
    if (!this.isDefaultEnabled) {
      this.DefaultSelectedDate = this.state.CalenderData[
        this.SelectedItemIndex - 1
      ];
    }

    return (
      <View style={{top: -8}}>
        <FlatList
          getItemLayout={this.getItemLayout}
          initialScrollIndex={this.SelectedItemIndex - 3}
          onScroll={this.getIndexotheScroll}
          showsHorizontalScrollIndicator={false}
          style={{margin: 15}}
          horizontal
          data={CalenderData}
          keyExtractor={item => {
            String(
              `${item.month}` + '-' + `${item.WeekDays}` + '-' + item.date,
            );
          }}
          renderItem={this.renderItem}
        />
        <View style={{alignSelf: 'center', position: 'absolute', top: 80}}>
          <Text style={{fontSize: 16, fontWeight: '500'}}>
            {selectedItem ? selectedItem.date : SelectedDate.day}-
            {selectedItem
              ? this.months[selectedItem.month]
              : this.months[SelectedDate.month - 1]}
            -{SelectedDate.year}
          </Text>
        </View>
        <Modal
          visible={ModelState}
          animationType="slide"
          transparent={true}
          onDismiss={() => {
            alert('Modal has been closed onDismiss.');
          }}
          onRequestClose={() => {
            onPressGet();
          }}>
          <View style={Styles.centeredView}>
            <View style={Styles.modalView}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignContent: 'stretch',
                  borderBottomColor: 'gray',
                  borderBottomWidth: 0.2,
                  elevation: 0.5,
                  backgroundColor:"white",
                  // shadowColor:"#c0c0c0",
                  // shadowOffset:{
                  //   height:2,width:0
                  // },
                  // shadowOpacity:0.8,
                  alignItems: 'center',
                  height: 45,
                }}>
                <View style={{marginLeft: 10}}>
                  <TouchableOpacity onPress={() => onPressGet()}>
                    <Text style={{color: 'rgba(242,55,5,1)', fontSize: 16}}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={{fontSize: 16, fontWeight: '700'}}>
                    New Event
                  </Text>
                </View>
                <View style={{marginRight: 10}}>
                  <TouchableOpacity disabled={true}>
                    <Text style={{color: 'rgba(242,55,5,1)', fontSize: 16}}>
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
                <View style={{paddingHorizontal: 15, marginTop:20,backgroundColor:'white'}}>
                <TextInput
                  placeholder="Title"
                  style={{
                    fontSize:16,
                    borderBottomColor: 'gray',
                    borderBottomWidth: 0.2,
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderTopWidth: 0,
                  }}
                />
                <TextInput 
                  placeholder="Location" 
                  style={{
                    fontSize:16,
                    borderBottomColor: 'gray',
                    borderBottomWidth: 0.2,
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderTopWidth: 0,
                  }}
                  />
              </View>
            </View>
          </View>
        </Modal>
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
    height: 70,
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(100,100,100,0.1)',
  },
  centeredView: {
    position: 'absolute',
    flex: 1,
    alignContent: 'center',
    opacity: 1,
  },
  modalView: {
    // margin: 5,
    backgroundColor: '#f5f5f5',
    // borderRadius: 20,
    padding: 0,
    shadowColor: '#000',
    height: height,
    width: width,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default CalenderStrip;
