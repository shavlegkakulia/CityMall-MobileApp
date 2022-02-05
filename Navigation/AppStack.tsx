import React, { useContext, useEffect } from 'react';
import { AppContext } from '../AppContext/AppContext';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../Services/NavigationServices';
import HomeScreen from '../Screens/HomeScreen';
import AuthScreen from '../Screens/AuthScreen';
import RegistrationScreen from '../Screens/RegistrationScreen';
import UserCardWithBarcode from '../Screens/UserCardWithBarcode';
import ShopDetailsScreen from '../Screens/ShopDetailsScreen';
import OrderGiftCardScreen from '../Screens/OrderGiftCardScreen';
import StatusInfoScreen from '../Screens/ProfileScreen/StatusInfoScreen';
import { useState } from 'react';
import RegistrationScreen2 from '../Screens/RegistrationScreen2';
import { ScreenTwo } from '../Screens/Registration';
import AuthService from '../Services/AuthService';
import { Text } from 'react-native';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import OffersScreen from '../Screens/OffersScreen/OffersScreen';
import SingleOfferScreen from '../Screens/OffersScreen/SingleOfferScreen';
import VouchersInfo from '../Components/Vouchers/VouchersInfo';
import BuyVouchers from '../Components/Vouchers/BuyVouchers';
import Stores from '../Screens/Stores/Stores';
import SelectedVouchers from '../Components/Vouchers/SelectedVouchers';
import VouchersDone from '../Components/Vouchers/VouchersDone';
import Parameters from '../Components/Parameters/Parameters';
import ProfileInfo from '../Components/Parameters/ProfileInfo';
import EmailChanged from '../Components/Parameters/EmailChanged';
import AboutUs from '../Screens/AboutUs/AboutUs';
import Loiality from '../Screens/Loiality/Loiality';
import RegistrationScreen3 from '../Screens/RegistrationScreen3';
import ContactUs from '../Screens/ContactUs/ContactUs';
import PlanVisit from '../Components/PlanVisit/PlanVisit';









const Stack = createStackNavigator();

const AppStack = () => {
    const { state, setGlobalState } = useContext(AppContext);
    const { isAuthenticated } = state

    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    useEffect(() => {
        AuthService.isAuthenticated().then(data => {
            if (data) {
                setGlobalState({ isAuthenticated: true });
            } else {
                setGlobalState({ isAuthenticated: false });
            }
        }).finally(() => {
            setIsInitialized(true)
        })

    }, [])

    if (!isInitialized) return <Text>Loading ...</Text>

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName='AuthScreen'>
                {isAuthenticated === false? 
                (
                    <Stack.Screen
                    name='AuthScreen'
                    component={AuthScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                ):(
                    <>
                <Stack.Screen
                    name='HomeScreen'
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='HomeScreen2'
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='RegistrationScreen'
                    component={RegistrationScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='RegistrationScreen2'
                    component={RegistrationScreen2}
                    options={{
                        headerShown: false,
                    }}
                />
                 <Stack.Screen
                    name='RegistrationScreen3'
                    component={RegistrationScreen3}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='UserCardWithBarcode'
                    component={UserCardWithBarcode}
                    options={{
                        headerShown: false,
                    }}
                />
                
                <Stack.Screen
                    name='ShopDetailsScreen'
                    component={ShopDetailsScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='OrderGiftCardScreen'
                    component={OrderGiftCardScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='ProfileScreen'
                    component={ProfileScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='StatusInfoScreen'
                    component={StatusInfoScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='OffersScreen'
                    component={OffersScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='SingleOfferScreen'
                    component={SingleOfferScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='Stores'
                    component={Stores}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='VouchersInfo'
                    component={VouchersInfo}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='BuyVouchers'
                    component={BuyVouchers}
                    options={{
                        headerShown: false,
                    }}
                />
                 <Stack.Screen
                    name='SelectedVouchers'
                    component={SelectedVouchers}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='VouchersDone'
                    component={VouchersDone}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name='Parameters'
                    component={Parameters}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='ProfileInfo'
                    component={ProfileInfo}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='EmailChanged'
                    component={EmailChanged}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='AboutUs'
                    component={AboutUs}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='Loiality'
                    component={Loiality}
                    options={{
                        headerShown: false,
                    }}
                />
                 <Stack.Screen
                    name='ContactUs'
                    component={ContactUs}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='PlanVisit'
                    component={PlanVisit}
                    options={{
                        headerShown: false,
                    }}
                />



                </>)}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppStack;
