/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import DataManager from './project/Data_Manager/DataManager';

// const AppContainer=()=>{
//     return(
//         <DataManager>
//             <App/>
//         </DataManager>
//     )
// }

AppRegistry.registerComponent(appName, () => App);
