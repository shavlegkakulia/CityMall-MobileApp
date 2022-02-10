import React from 'react';
import { Text, View } from 'react-native';
import MapToggleInfo from '../Components/ToggleDropdown/MapToggleInfo';


export interface ToggleList{
    id: number,
    name: string,
    icon: string,
    content: JSX.Element,
    routeName?: string
}

export default [
    {
        id: 1,
        name: 'ლოკაცია',
        icon:  require('../assets/images/arrow-sm.png'),
        content: <></>,
        routeName: 'GoogleMap'
    },
    {
        id: 2,
        name: 'რუქა',
        icon:  require('../assets/images/arrow-sm.png'),
        content: MapToggleInfo
       
      
    }
]