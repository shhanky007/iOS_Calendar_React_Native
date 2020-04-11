import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

class modalView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('Test Test',this.props)
    const {
      CloseModal,
      SelectedDate,
      inputState,
      inputOnChange,
      HandleSaveNote,
    } = this.props;
    return (
      <View style={Style.Container}>
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={CloseModal}>
          <Text>Close</Text>
        </TouchableOpacity>
        <Text style={Style.ModleDateShow}>Note for : {SelectedDate}</Text>
        <TextInput
          style={Style.TextInputStyle}
          placeholder="What you want to do ?"
          placeholderTextColor="#fff"
          value={inputState}
          onChangeText={inputOnChange}
        />

        <TouchableOpacity style={Style.SubBtnStyle} onPress={HandleSaveNote}>
          <Text style={Style.SubBtnText}>Save Note</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const Style = StyleSheet.create({
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

export default modalView;
