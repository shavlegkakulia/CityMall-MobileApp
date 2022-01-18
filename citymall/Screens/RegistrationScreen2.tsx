import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, Keyboard, Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../AppContext/AppContext';
import { Colors } from '../Colors/Colors';
import AppCheckBox from '../Components/CustomComponents/AppCheckBox';
import Layout from '../Components/Layouts/Layout';
import Grid from '../Styles/grid';
import ApiServices from '../Services/ApiServices';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import AuthService from '../Services/AuthService';
import { GoBack } from '../Services/NavigationServices';

import { useDimension } from '../Hooks/UseDimension';
import DatePicker from 'react-native-datepicker';
import DistrictPicker from '../Components/DistrictPicker';
import AppInput from '../Components/CustomComponents/AppInput';
import { IRegistrationProps } from './RegistrationScreen';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getItem } from '../Services/StorageService';


type RouteParamList =  {
    params: {
        data: IRegistrationProps
    }
}

const RegistrationScreen2: React.FC = (props: any) => {

    const { isDarkTheme, userPhoneNumber, setDetails } = useContext(AppContext);
    const { height } = useDimension();
    
    // const routeObj = useRoute<RouteProp<RouteParamList, 'params'>>();
    
    // console.log(routeObj.params)

    const [step, setStep] = useState<number>(0);
    const [hasError, setHasError] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<string[] | []>([]);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [verifyEmailLoading, setVerifyEmailLoading] = useState<boolean>(false);
    const [dateOfBirth, setDateOfBirth] = useState<string>('');
    const [birthDateError, setBirthDateError] = useState<boolean>(false);
    const [district, setDistrict] = useState<string>('');
    const [districts, setDistricts] = useState<any>([]);
    const [selectedDistrict, setSelectedDistrict] = useState<string>();
    const [districtError, setDistrictError] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [verifyEmail, setVerifyEmail] = useState<boolean>(false);
    const [emailVerificationCode, setEmailVerificationCode] = useState<string>('');
    const [verifyEmailError, setVerifyEmailError] = useState<boolean>(false);
    const [isValidMailOtp, setIsValidMailOtp] = useState<boolean>(false);
    const [agreedTerms, setAgreedTerms] = useState<any>({
        value: false,
        error: false,
    });
    const [generalError, setGeneralError] = useState<string>('');

    useEffect(() => {
        GetDistricts();
        
    }, []);

    useEffect(() => {
        if (errorMessages.length === 0) {
            setHasError(false);
        };
    }, [errorMessages]);

    const validateInputs = (actionType: string, inputName: string) => {
        if (actionType === 'add') {
            let errorArray = [...errorMessages];
            let index = errorArray.findIndex((e: string) => e === inputName);
            if (index >= 0) {
                return;
            } else {
                errorArray.push(inputName);
                setErrorMessages(errorArray);
            };
        } else {
            let errorArray = errorMessages.filter(e => e !== inputName);
            setErrorMessages(errorArray);
        }
    };

    // useEffect(() => {
    //     if (email.length === 0) {
    //         setEmailError('');
    //     } else {
    //         let regex = /\S+@\S+\.\S+/;
    //         if (regex.test(email)) {
    //             setEmailError('');
    //         } else {
    //             setEmailError('არასწორი მეილის ფორმატი');
    //         };
    //     };
    // }, [email]);

    
    useEffect(() => {
        if (verifyEmail) {
            handleSendMailOtp();
        };
    }, [verifyEmail]);

    useEffect(() => {
        if (emailVerificationCode.length < 6) {
            setIsValidMailOtp(false);
        }
    }, [emailVerificationCode]);

    const GetDistricts = () => {
        ApiServices.GetDistricts()
            .then(res => {
                setDistricts(res.data)
            })
            .catch(e => {
                console.log(JSON.parse(JSON.stringify(e.response)).data);
            })
    };

    const handleDistrictSelect = (item: string) => {
        setSelectedDistrict(item);
        setDistrictError('');
    };

    console.log('errorMessages', errorMessages);
    const handleStep = () => {
       
    };

    const toggleSwitch = () => {
        setEmailVerificationCode('');
        setVerifyEmailError(false);
        setIsValidMailOtp(false);
        setVerifyEmail(!verifyEmail);
    };

    const handleSendMailOtp = () => {
        setButtonLoading(true);
        let data = {
            mail: email
        };
        ApiServices.SendMailOtp(data)
            .then(res => {
                setButtonLoading(false);
            })
            .catch(e => {
                setButtonLoading(false);
                console.log(JSON.parse(JSON.stringify(e.response)).data.error);
            });
    };

    const handleCheckMailOtp = () => {
        setVerifyEmailLoading(true);
        setVerifyEmailError(false);
        let data = {
            email: email,
            otp: emailVerificationCode
        };

        ApiServices.CheckMailOtp(data)
            .then(res => {
                if (res.status === 200)
                    setVerifyEmailLoading(false);
                setVerifyEmailError(false);
                setIsValidMailOtp(true);
            })
            .catch(e => {
                setVerifyEmailLoading(false);
                setVerifyEmailError(true);
                setIsValidMailOtp(false);
                console.log(JSON.parse(JSON.stringify(e.response)).data);
            });
    };

    const handleAddVirtualCard = () => {
        // if (dateOfBirth === '') {
        //     console.log('dateOfBirth ===>', dateOfBirth)
        //     setBirthDateError(true);
        //     return;
        // } else if (selectedDistrict === '' || (selectedDistrict === 'სხვა' && district === '')) {
        //     setDistrictError('გთხოვთ შეავსოთ ველი');
        //     return;
        // } else if (!agreedTerms) {
        //     setDistrictError('');
        //     setAgreedTerms((prev: any) => {
        //         return {
        //             ...prev, error: true
        //         };
        //     });
        // };
        if (errorMessages.length > 0) {
            setHasError(true);
            return;
        };
        setGeneralError('');
        setButtonLoading(true);
        let date = dateOfBirth.split('-');
        let data = {
            personCode: 'idNumber',
            birthDate: date[2] + '-' + date[1] + '-' + date[0],
            firstName: 'name',
            lastName: 'lastname',
            phone: userPhoneNumber,
            email: email,
            address: selectedDistrict === 'სხვა' ? district : selectedDistrict,
            sex: 1,
            mailOtp: emailVerificationCode
        };

        ApiServices.AddVirtualCard(data)
            .then(async res => {
                let refreshToken = await getItem('refresh_token');
                const config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    skipRefresh: true
                }
                const refreshObj = new URLSearchParams();
                refreshObj.append('grant_type', 'refresh_token');
                refreshObj.append('client_id', 'ClientApp');
                refreshObj.append('client_secret', 'secret');
                refreshObj.append('refresh_token', refreshToken!);

                await axios.post('https://citymallidentity.payunicard.ge:8060/connect/token', refreshObj, config)
                    .then(async response => {
                        AuthService.setToken(response.data.access_token, response.data.refresh_token);
                        setButtonLoading(false);
                        setStep(2);
                    })
                    .catch(e => {
                        setButtonLoading(false);
                        console.log(JSON.parse(JSON.stringify(e.response)).data);
                    });
            })
            .catch(e => {
                setButtonLoading(false);
                let error = JSON.parse(JSON.stringify(e.response)).data.DisplayText;
                setGeneralError(error)
                console.log(JSON.parse(JSON.stringify(e.response)).data);
            });
    };

    const handleGetClientCards = () => {
        ApiServices.GetClientCards().then(res => {
            setDetails(res.data);
            props.navigation.navigate('HomeScreen')
        })
            .catch(e => {
                console.log(JSON.parse(JSON.stringify(e.response)).data);
            });
    };



    return (
        <Layout hasBackArrow={step < 2 ? true : false} onPressBack={() => {
            if (step === 0) {
                GoBack();
            } else {
                setStep(step - 1);
            }
        }}>
            <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={{ paddingHorizontal: '10%', position: 'relative', flexGrow: 1 }}>
                
                    <View style={[Grid.row_12_5, {}]}>
                        <Text style={[styles.regTitle, { color: isDarkTheme ? Colors.white : Colors.black }]}>რეგისტრაცია</Text>
                    </View> 
                
              
                    <View style={{ flex: 1 }}>

                        <DatePicker
                            style={{ width: '100%' }}
                            placeholder='დაბადების თარიღი'
                            date={dateOfBirth}
                            onDateChange={(date) => { setDateOfBirth(date); setBirthDateError(false) }}
                            format='DD-MM-YYYY'
                            showIcon={false}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateInput: {
                                    alignItems: 'flex-start',
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    paddingBottom: 12,
                                    borderBottomColor: isDarkTheme ? Colors.white : Colors.black,
                                },
                                placeholderText: {
                                    color: isDarkTheme ? Colors.white : Colors.black,
                                    fontFamily: 'HMpangram-Bold',
                                    fontSize: 14,
                                    fontWeight: '700',
                                    lineHeight: 17,
                                    paddingLeft: 5
                                },
                                dateText: {
                                    color: isDarkTheme ? Colors.white : Colors.black,
                                    fontFamily: 'HMpangram-Bold',
                                    fontSize: 14,
                                    fontWeight: '700',
                                    lineHeight: 17,
                                    paddingLeft: 5

                                }
                            }}
                        />
                        {birthDateError ?
                            <Text style={styles.errorText}>გთხოვთ შეავსოთ ველი</Text>
                            : null}
                        <View>
                            <DistrictPicker data={districts} onSelect={handleDistrictSelect} placeholder='აირჩიეთ რაიონი' />
                            {selectedDistrict === 'სხვა' && 
                            <AppInput
                                placeholder='საცხოვრებელი რაიონი'
                                value={district}
                                name = 'district'
                                hasError={hasError}
                                addValidation={validateInputs}
                                errors={errorMessages}
                                isRequired={true}
                                validationRule='phoneNumber'
                                onChangeText={(val: string) => setDistrict(val)}
                                 />
                                 }
                        </View>
                        <View style={{}}>
                            <AppInput
                                placeholder = 'ელ-ფოსტა'
                                value = {email}
                                name = 'email'
                                keyboardType='email-address'
                                hasError={hasError}
                                addValidation={validateInputs}
                                errors={errorMessages}
                                isRequired={true}
                                validationRule='email'
                                onChangeText={(val: string) => setEmail(val)}
                            />
                            <View style={styles.mailVerification}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#28AD25" }}
                                        thumbColor={Colors.white}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleSwitch}
                                        value={verifyEmail}
                                        disabled={email.length > 0 && !emailError ? false : true} />
                                    <View style={styles.mailVerificationTextWrap}>
                                        <Text style={[styles.mailVerificationText, { color: isDarkTheme ? Colors.white : Colors.black, }]}>ელ-ფოსტის ვერიფიკაცია</Text>
                                        <Text style={[styles.mailVerificationSubtext, { color: isDarkTheme ? Colors.white : Colors.black, }]}>ელ. ფოსტის მითითებისა და ვერიფიკაციის შემთხვევაში საჩუქრად დაგერიცხებათ 100 სითი ქულა         </Text>
                                    </View>
                                </View>
                                {verifyEmail ?
                                    <View style={{ position: 'relative' }}>
                                        <AppInput
                                            placeholder='ვერიფიკაციის კოდი'
                                            value={emailVerificationCode}
                                            name = 'mailOtp'
                                            hasError={hasError}
                                            addValidation={validateInputs}
                                            errors={errorMessages}
                                            isRequired={true}
                                            validationRule='required'
                                            keyboardType='number-pad'
                                            maxLength={6}
                                            onChangeText={(val: string) => setEmailVerificationCode(val)} />
                                        {verifyEmailError ?
                                            <Text style={styles.errorText}>ერთჯერადი კოდი არასწორია</Text>
                                            : null}
                                        <TouchableOpacity onPress={handleCheckMailOtp} style={{ position: 'absolute', right: 5, top: 25 }}>
                                            {verifyEmailLoading ?
                                                <ActivityIndicator animating={verifyEmailLoading} color={Colors.white} />
                                                :
                                                !isValidMailOtp ?
                                                    <Text style={{ color: isDarkTheme ? Colors.white : Colors.black }}>შეამოწმე</Text>
                                                    :
                                                    <Image source={require('../assets/images/green-checkmark.png')} style={{ width: 20, height: 14 }} />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    : null}
                            </View>
                        </View>
                        <View >
                            <View style={styles.inputWithLabel}>
                                <AppCheckBox checked={agreedTerms.value} onChange={() => { setAgreedTerms({ value: !agreedTerms.value, error: false }); Keyboard.dismiss() }} />
                                <Text style={[styles.labelText, { color: isDarkTheme ? Colors.white : Colors.black, }]}>ვეთანხმები წესებს და პირობებს</Text>
                                {agreedTerms.error ?
                                    <Text style={styles.errorText}>გთხოვთ დაეთანხმოთ წესებსა და პირობებს</Text>
                                    : null}
                            </View>
                        </View>
                        {generalError !== '' ?
                            <Text style={styles.errorText}>
                                {generalError}
                            </Text> : null}
                    </View> 
                {step === 2 ?
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Image source={require('../assets/images/success-mark.png')} style={{ width: 64, height: 64, marginBottom: 20 }} />
                        <Text style={[styles.registerSuccess, { color: isDarkTheme ? Colors.white : Colors.black, }]}>რეგისტაცია წარმატებით დასრულდა</Text>
                    </View> : null}
                <View style={[Grid.row_12_5, { marginBottom: 20 }]}>
                   
                            <TouchableOpacity style={styles.authBtn} onPress={handleAddVirtualCard} disabled={buttonLoading}>
                                {buttonLoading ?
                                    <ActivityIndicator animating={buttonLoading} color='#dadde1' />
                                    :
                                    <Text style={[styles.btnText, { color: isDarkTheme ? Colors.white : Colors.black, }]}>დადასტურება</Text>
                                }
                            </TouchableOpacity>
                            {/* :
                            <TouchableOpacity style={styles.authBtn} onPress={handleGetClientCards}>
                                <Text style={[styles.btnText, { color: isDarkTheme ? Colors.white : Colors.black, }]}>დახურვა</Text>
                            </TouchableOpacity>
                     */}
                </View>
            </ScrollView>
        </Layout>
    );
};

export default RegistrationScreen2;

const styles = StyleSheet.create({
    regTitle: {
        textAlign: 'center',

        fontFamily: 'HMpangram-Bold',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 22,
        alignItems: 'center',
        textTransform: 'uppercase'
    },
    authBtn: {
        marginBottom: 100,
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
        fontSize: 14,
        lineHeight: 17,
        fontWeight: '800',
        fontFamily: 'HMpangram-Bold',
        textTransform: 'uppercase'
    },

    labelText: {
        fontFamily: 'HMpangram-Bold',
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 15,
        marginLeft: 7
    },

    inputWithLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },

    mailVerification: {
        width: '100%',
        marginVertical: 20
    },

    mailVerificationTextWrap: {
        width: '80%',
        marginLeft: 5
    },

    mailVerificationText: {

        fontFamily: 'HMpangram-Medium',
        fontSize: 14,
        lineHeight: 14
    },

    mailVerificationSubtext: {
        fontFamily: 'HMpangram-Medium',
        fontSize: 10,
        lineHeight: 14
    },
    registerSuccess: {

        fontFamily: 'HMpangram-Bold',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 22,
        textAlign: 'center'
    },
    errorText: {
        color: Colors.red,
        fontSize: 11,
        fontFamily: 'HMpangram-Medium'
    }
});