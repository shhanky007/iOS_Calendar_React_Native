import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

//import ModalView from './project/components/modalView';
import ListItems from './project/components/ListItems';

import {Context} from './project/Data_Manager/context';
import {Calendar, Agenda} from 'react-native-calendars';

const {width, height} = Dimensions.get('window');

// const styles = StyleSheet.create({
//   taskListContent: {
//     height: 100,
//     width: 327,
//     alignSelf: 'center',
//     borderRadius: 10,
//     shadowColor: '#2E66E7',
//     backgroundColor: '#ffffff',
//     marginTop: 10,
//     marginBottom: 10,
//     shadowOffset: {
//       width: 3,
//       height: 3,
//     },
//     shadowRadius: 5,
//     shadowOpacity: 0.2,
//     elevation: 3,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   viewTask: {
//     position: 'absolute',
//     bottom: 40,
//     right: 17,
//     height: 60,
//     width: 60,
//     backgroundColor: '#2E66E7',
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#2E66E7',
//     shadowOffset: {
//       width: 0,
//       height: 5,
//     },
//     shadowRadius: 30,
//     shadowOpacity: 0.5,
//     elevation: 5,
//     zIndex: 999,
//   },
//   deleteButton: {
//     backgroundColor: '#ff6347',
//     width: 100,
//     height: 38,
//     alignSelf: 'center',
//     marginTop: 40,
//     borderRadius: 5,
//     justifyContent: 'center',
//   },
//   updateButton: {
//     backgroundColor: '#2E66E7',
//     width: 100,
//     height: 38,
//     alignSelf: 'center',
//     marginTop: 40,
//     borderRadius: 5,
//     justifyContent: 'center',
//     marginRight: 20,
//   },
//   sepeerator: {
//     height: 0.5,
//     width: '100%',
//     backgroundColor: '#979797',
//     alignSelf: 'center',
//     marginVertical: 20,
//   },
//   notesContent: {
//     height: 0.5,
//     width: '100%',
//     backgroundColor: '#979797',
//     alignSelf: 'center',
//     marginVertical: 20,
//   },
//   learn: {
//     height: 23,
//     width: 51,
//     backgroundColor: '#F8D557',
//     justifyContent: 'center',
//     borderRadius: 5,
//   },
//   design: {
//     height: 23,
//     width: 59,
//     backgroundColor: '#62CCFB',
//     justifyContent: 'center',
//     borderRadius: 5,
//     marginRight: 7,
//   },
//   readBook: {
//     height: 23,
//     width: 83,
//     backgroundColor: '#4CD565',
//     justifyContent: 'center',
//     borderRadius: 5,
//     marginRight: 7,
//   },
//   title: {
//     height: 25,
//     borderColor: '#5DD976',
//     borderLeftWidth: 1,
//     paddingLeft: 8,
//     fontSize: 19,
//   },
//   taskContainer: {
//     height: 475,
//     width: 327,
//     alignSelf: 'center',
//     borderRadius: 20,
//     shadowColor: '#2E66E7',
//     backgroundColor: '#ffffff',
//     shadowOffset: {
//       width: 3,
//       height: 3,
//     },
//     shadowRadius: 20,
//     shadowOpacity: 0.2,
//     elevation: 5,
//     padding: 22,
//   },
// });

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: '',
      isModalVisible: false,
      Notes: '',
      SelectedDate: '',
      todoList: [],
      markedDate: null,
      filteredData:[],
    };
  }

  generateID = () => {
    return (
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  };

  ShowCurrentDate = () => {
    const {SelectedDate, currentDate} = this.state;
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    if (date < 10) {
      var NewDate = '0' + date;
    } else {
      var NewDate = date;
    }
    if (month < 10) {
      var Month = '0' + month;
    } else {
      var Month = month;
    }
    let CurrentDate = `${year + '-' + Month + '-' + NewDate}`;
    //  console.log('Current date',currentDate, typeof(currentDate))
      this.setState({currentDate: CurrentDate});
  };

  componentDidMount() {
    this.ShowCurrentDate();
  }
  componentDidUpdate(){
    console.log(this.state)
  }

  rednerMarkedDates = () => {
    if (this.state.todoList.length > 0) {
      let data = {};
      this.state.todoList.map(item => {
        var date = String(item.date);
        data[date] = {marked: true, selectedColor: '#0079cc'};
      });
      return data;
    }
  };


  showData = Seldate => {
    let Test = this.state.todoList.filter(data => {
      return data.date == Seldate;
    });
    this.setState({filteredData: Test});
  };
  handleDaypress = day => {
    let date=String(day.dateString)
    console.log('check date',date)
    this.setState({SelectedDate:date})

  };


  handleModleBtnPress = () => {
    const {
      SelectedDate,
      Notes,
      currentDate,
      todoList,
    } = this.state;

    let data = {date: SelectedDate||currentDate, todoList: Notes};
    let todoListItem = [];
    todoListItem.push(data);

    this.setState({
      isModalVisible: false,
      Notes: '',
      todoList: todoList.concat(todoListItem),
    });
   };

  render() {
    const {
      currentDate,
      isModalVisible,
      Notes,
      SelectedDate,
      todoList,
      markedDate,
      filteredData,
    } = this.state;

    return (
      <Context.Consumer>
        {value => (
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <View>
              <Calendar
                style={{height: 360}}
                minDate={'2019-05-10'}
                maxDate={'2021-04-19'}
                markedDates={{
                  ...this.rednerMarkedDates(),
                  [SelectedDate]:{selected:true , selectedColor:"blue"},
                }}
                onDayPress={day => this.handleDaypress(day)}
                monthFormat={'MMMM, yyyy'}
                firstDay={1}
                hideExtraDays
                onPressArrowLeft={substractMonth => substractMonth()}
                onPressArrowRight={addMonth => addMonth()}
              />
              <TouchableOpacity
                style={Styles.FlotingBtn}
                onPress={() => this.setState({isModalVisible: true})}>
                <Text style={Styles.FloatingBtnText}>+</Text>
              </TouchableOpacity>
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}>
              <View style={Styles.Container}>
                <TouchableOpacity  style={{alignSelf: 'flex-end'}} onPress={()=>this.setState({isModalVisible:false})}>
                  <Text>Close</Text>
                </TouchableOpacity>
                <Text style={Styles.ModleDateShow}>
                  Note for : {SelectedDate||currentDate}
                </Text>
                <TextInput
                  style={Styles.TextInputStyle}
                  placeholder="What you want to do ?"
                  placeholderTextColor="#fff"
                  value={Notes}
                  onChangeText={text=>this.setState({Notes:text})}
                />
                {Notes?
                <TouchableOpacity
                  style={Styles.SubBtnStyle}
                  onPress={()=>this.handleModleBtnPress()}>
                  <Text style={Styles.SubBtnText}>Save Note</Text>
                </TouchableOpacity>:null}
              </View>
            </Modal>

            <View style={Styles.DataContainer}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  padding: 5,
                  backgroundColor: 'gray',
                  alignSelf: 'stretch',
                }}>
                {todoList.map(item => {
                  return <ListItems item={item} key={this.generateID()}/>;
                })}
              </ScrollView>
            </View>
          </View>
        )}
      </Context.Consumer>
    );
  }
}

const Styles = StyleSheet.create({
  FlotingBtn: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    opacity: 1,
    elevation: 5,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    right: 15,
    top: 11,
  },
  FloatingBtnText: {
    fontSize: 25,
    fontWeight: '900',
    color: 'white',
    paddingBottom: 6,
  },
  DataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container: {
    backgroundColor: '#0079cc',
    padding: 15,
    margin: 20,
    flex: 1,
    borderRadius: 5,
    elevation: 2,
  },
  ModleDateShow: {
    marginTop: 25,
    marginVertical: 15,
    fontSize: 18,
    color: 'white',
  },
  TextInputStyle: {
    // borderRadius:15,
    borderBottomColor: '#fff',
    borderLeftColor: '#0079cc',
    borderRightColor: '#0079cc',
    borderTopColor: '#0079cc',
    borderWidth: 2,
    paddingLeft: 10,
    fontSize: 18,
  },
  SubBtnStyle: {
    backgroundColor: '#0000A0',
    borderRadius: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 200,
    marginTop: 25,
  },
  SubBtnText: {
    textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default App;
