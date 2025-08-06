import React, { useEffect } from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { createTable, openDatabase } from './src/DataBase/db';
import Snackbar from 'react-native-snackbar'
import { MyTabs } from './src/Navigation/Tabs';
import notifee, { EventType } from '@notifee/react-native';

const App = () => {

  useEffect(() => {
    initializeDatabase();
    
  }, []);


  const initializeDatabase = async () => {
    await notifee.openAlarmPermissionSettings();
    await notifee.requestPermission()
    try {
      const db = await openDatabase();
      await createTable();

    } catch (error) {
      Snackbar.show({
        text: 'Error al inicializar la base de datos',
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: 'Cerrar',
          textColor: '#0B60B0',
          onPress: () => {
            Snackbar.dismiss();
          },
        },
      });
    }
  };

  return (
    <NavigationContainer>
        <StatusBar backgroundColor='black'/>
        <MyTabs/>
    </NavigationContainer>
  )
}

export default App