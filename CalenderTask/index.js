/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// const AppContainer=()=>{
//     return(
//         <DataManager>
//             <App/>
//         </DataManager>
//     )
// }

AppRegistry.registerComponent(appName, () => App);
