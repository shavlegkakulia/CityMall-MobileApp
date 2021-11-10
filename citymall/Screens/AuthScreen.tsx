import React, { useState, useContext, useEffect, useRef } from 'react';
import {
    View, Text, StyleSheet, Keyboard, TouchableOpacity, Pressable, ActivityIndicatorBase, ActivityIndicator, Button
} from 'react-native';
import axios from 'axios';
import { Colors } from '../Colors/Colors';
import AppInput from '../Components/CostumComponents/AppInput';
import OneTimeCode from '../Components/OneTimeCode';
import Grid from '../Styles/grid';
import AppChekBox from '../Components/CostumComponents/AppChekBox';
import Layout from '../Components/Layouts/Layout';
import { AppContext } from '../AppContext/AppContext';
import AuthService from '../Services/AuthService';
import { setItem, getItem } from '../Services/StorageService';




 




const AuthScreen: React.FC = (props) => {

    const styles = StyleSheet.create({
        authContainer: {
            paddingHorizontal: 30,
            justifyContent: 'space-between'
        },

        authTitle: {
            textAlign: 'center',
            color: Colors.white,
            fontFamily: 'Pangram-Bold',
            fontSize: 18,
            fontWeight: '700',
            lineHeight: 22,
            alignItems: 'center'
        },
        agreeTermsText: {
            color: Colors.white,
            marginLeft: 10,
            fontSize: 14,
            fontWeight: '500',
            fontFamily: 'Pangram-Regular'
        },

        authBtn: {
            alignSelf: 'center',
            width: 325,
            height: '100%',
            maxHeight: 66,
            backgroundColor: Colors.darkGrey,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: Colors.black,
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
        },

        btnText: {
            color: Colors.white,
            fontSize: 14,
            lineHeight: 17,
            fontWeight: '800',
        }

    });

    const { setIsAuth, isDarkTheme, setPhoneNumber } = useContext(AppContext);

    const [step, setStep] = useState<number>(0);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [userPhoneNumber, setUserPhoneNumber] = useState<string>('995');
    const [otp, setOtp] = useState<string>('');
    const [otpError, setOtpError] = useState<boolean>(false);
    const [agreedTerms, setAgreedTerms] = useState<boolean>(false);
    const [agreedTermsError, setAgreedTermsError] = useState<boolean>(false);


    const getOtpValue = (value: string) => {
        setOtp(value);
    };

    const toggleAgreedTerms = () => {
        if(!otpError && otp !== '') {
            Keyboard.dismiss();
        };
        setAgreedTerms(!agreedTerms);
        setAgreedTermsError(false);
    };

    const signIn = async (type: string) => {
        let data;
        setButtonLoading(true);
        if(type === 'new' || type === 'resend') {
            setOtp('');
            data = {
                username: userPhoneNumber,
                otp: ''
            };
        } else {
            if (step === 1 && !agreedTerms) {
                setAgreedTermsError(true);
                return;
            };
            data = {
                username: userPhoneNumber,
                otp: otp
            };
        };
       
        AuthService.SignIn(data).then(res => {
            AuthService.setToken(res.data.access_token, res.data.refresh_token);
            setButtonLoading(false);
            setPhoneNumber(userPhoneNumber);
            setIsAuth(true);
            
        }).catch(e => {
            console.log('catch e =====>', JSON.parse(JSON.stringify(e.response)).data.error);
            let error = JSON.parse(JSON.stringify(e.response)).data.error;
            setButtonLoading(false);
            if (error === 'require_otp') {
                setStep(1);
            } else if (error === 'inalid_otp') {
                setOtpError(true);
                return;
            };
        });
    };

    return (
        <Layout>
            <View style={[Grid.col_12, { paddingHorizontal: '10%' }]}>
                <View style={[Grid.col_3, { justifyContent: 'center' }]}>
                    <Text style={styles.authTitle}>პირველადი ავტორიზაცია</Text>
                </View>
                <View style={[Grid.col_6, { justifyContent: 'space-around' }]}>
                    <AppInput
                        style={{ color: isDarkTheme ? Colors.white : Colors.black }}
                        keyboardType='numeric'
                        value={userPhoneNumber}
                        onChangeText={(val: string) => setUserPhoneNumber(val)} />
                    <View style={[Grid.row_8, { marginTop: 60, justifyContent: 'space-around' }]}>
                        {step === 1 ?
                            <>
                                <OneTimeCode getValue={getOtpValue} resend={() => signIn('resend')} hasError={otpError}  />
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    <AppChekBox
                                        checked={agreedTerms}
                                        onChange={toggleAgreedTerms}
                                        hasError={agreedTermsError} />
                                    <Text style={styles.agreeTermsText}>ვეთანხმები წესებს და პირობებს</Text>
                                </View>
                            </> : null}
                    </View>
                </View>
                <View style={[Grid.col_3, { justifyContent: 'flex-end' }]}>
                    <TouchableOpacity style={styles.authBtn} onPress={() => signIn(step === 0? 'new' : 'signIn')} disabled={buttonLoading}>
                        {buttonLoading ?
                            <ActivityIndicator animating={buttonLoading} color='#dadde1' />
                            :
                            <Text style={styles.btnText}>{step === 0 ? 'კოდის მიღება' : 'ავტორიზაცია'}</Text>
                        }


                    </TouchableOpacity>
                </View>
            </View>
        </Layout>
    );
};

export default AuthScreen;