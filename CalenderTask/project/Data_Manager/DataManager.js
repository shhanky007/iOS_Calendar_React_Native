import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Context } from './context';
import App from '../../App';

export default class DataManager extends Component {
  state = {
    todo: [],
    updateTodo: item => {this._updateTodo(item);},
    deleteTodo: item => {this._deleteTodo(item);},
    updateSelectedTask: item => {this._updateSelectedTask(item);},
    deleteSelectedTask: item => {this._deleteSelectedTask(item);},
  };

  _deleteSelectedTask = async item => {
    const previousTodo = [...this.state.todo];
    const newTodo = previousTodo.map(data => {
      if (item.date === data.date) {
        const previousTodoList = [...data.todoList];
        const newTodoList = previousTodoList.filter(list => {
          if (list.key === item.todo.key) {
            return false;
          }
          return true;
        });

        data.todoList = newTodoList;
        return data;
      }
      return data;
    });
    const checkForEmpty = newTodo.filter(data => {
      if (data.todoList.length === 0) {
        return false;
      }
      return true;
    });
    try {
      await AsyncStorage.setItem('TODO', JSON.stringify(checkForEmpty));
      this.setState({
        todo: checkForEmpty,
      });
    } catch (error) {
      // Error saving data
    }
  };

  _updateSelectedTask = async item => {
    const previousTodo = [...this.state.todo];
    const newTodo = previousTodo.map(data => {
      if (item.date === data.date) {
        const previousTodoList = [...data.todoList];
        const newTodoList = previousTodoList.map(list => {
          if (list.key === item.todo.key) {
            return item.todo;
          }
          return list;
        });
        data.todoList = newTodoList;
        return data;
      }
      return data;
    });
    try {
      await AsyncStorage.setItem('TODO', JSON.stringify(newTodo));
      this.setState({
        todo: newTodo,
      });
    } catch (error) {
      // Error saving data
    }
  };

  async componentDidMount() {
    try {
      const todo = await AsyncStorage.getItem('TODO');
      if (todo !== null) {
        this.setState({
          todo: JSON.parse(todo),
        });
      }
    } catch (error) {
      // Error saving data
    }
  }

  // item={
  //     date:"something",
  //     todoList:[]
  // }

  _updateTodo = async item => {
      const datePresent = this.state.todo.find(data => {
          if (data.date === item.date) {
            console.log('reached in Data Management')
            return true;
        }
    });
    
    if (datePresent) {
        const updatedTodo = this.state.todo.map(data => {
        if (datePresent.date === data.date) {
            data.todoList = [...data.todoList, ...item.todoList]; //concating the data to store with same dates
            console.log('reached in Data Management data',data)
            return data;
        }
        console.log('reached in Data Management other uodated data',data)
        return data;
    });
    
    try {
        await AsyncStorage.setItem('TODO', JSON.stringify(updatedTodo));
        
        console.log('reached in Data Management other uodated data',updatedTodo)
        this.setState({
            todo: updatedTodo,
        });
    } catch (error) {
        console.log('reached in Data Management error',error)
        // Error saving data
      }
    } else {
      const newTodo = [...this.state.todo, item];

      try {
        await AsyncStorage.setItem('TODO', JSON.stringify(newTodo));
        this.setState({
          todo: newTodo,
        });
      } catch (error) {
        // Error saving data
      }
    }
  };

  _deleteTodo = () => {};

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}