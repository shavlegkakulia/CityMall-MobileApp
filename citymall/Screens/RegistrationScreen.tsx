import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, Keyboard, Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../AppContext/AppContext';
import { Colors } from '../Colors/Colors';
import AppChekBox from '../Components/CostumComponents/AppChekBox';
import AppInput from '../Components/CostumComponents/AppInput';
import DatePicker from 'react-native-datepicker';
import Layout from '../Components/Layouts/Layout';
import Grid from '../Styles/grid';
import ApiServices from '../Services/ApiServices';
import { ScrollView } from 'react-native-gesture-handler';
import { setItem, getItem } from '../Services/StorageService';
import axios from 'axios';
import AuthService from '../Services/AuthService';
import { GoBack } from '../Services/NavigationServices';

const RegistrationScreen: React.FC = (props: any) => {

    const { isDarkTheme, userPhoneNumber, setDetails } = useContext(AppContext);

    const styles = StyleSheet.create({
        regTitle: {
            textAlign: 'center',
            color: isDarkTheme ? Colors.white : Colors.black,
            fontFamily: 'Pangram-Bold',
            fontSize: 18,
            fontWeight: '700',
            lineHeight: 22,
            alignItems: 'center'
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
            color: isDarkTheme ? Colors.white : Colors.black,
            fontSize: 14,
            lineHeight: 17,
            fontWeight: '800',
        },
        labelText: {
            color: isDarkTheme ? Colors.white : Colors.black,
            fontFamily: 'Pangram-Bold',
            fontSize: 14,
            fontWeight: '700',
            lineHeight: 17,
            marginLeft: 7
        },
        inputWithLabel: {
            flexDirection: 'row',
            alignItems: 'center'

        },
        genderCheck: {
            marginTop: '10%',
            borderBottomColor: isDarkTheme ? Colors.white : Colors.black,
            borderBottomWidth: 1
        },
        mailVerification: {
            width: '100%',
            marginVertical: 20
        },
        mailVerificationTextWrap: {
            paddingRight: '10%'
        },
        mailVerificationText: {
            color: isDarkTheme ? Colors.white : Colors.black,
            fontFamily: 'Pangram-Regular',
            fontSize: 14,
            lineHeight: 14
        },
        mailVerificationSubtext: {
            color: isDarkTheme ? Colors.white : Colors.black,
            fontFamily: 'Pangram-Regular',
            fontSize: 10,
            lineHeight: 14
        },
        registerSuccess: {
            color: isDarkTheme ? Colors.white : Colors.black,
            fontFamily: 'Pangram-Bold',
            fontSize: 18,
            fontWeight: '700',
            lineHeight: 22,
            textAlign: 'center'
        },
        errorText: {
            color: Colors.red,
            fontSize: 11,
            fontFamily: 'Pangram-Regular'
        }
    });



    const [step, setStep] = useState<number>(0);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [verifyEmailLoading, setVerifyEmailLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [nameError, setNameError] = useState<boolean>(false);
    const [lastname, setLastname] = useState<string>('');
    const [lastnameError, setLastnameError] = useState<boolean>(false);
    const [idNumber, setIdNumber] = useState<string>('');
    const [idNumberError, setIdNumberError] = useState<boolean>(false);
    const [isForeignResident, setIsForeignResident] = useState<boolean>(false);
    const [gender, setGender] = useState<any>({
        male: false,
        female: false,
        error: false,
    });
    const [dateOfBirth, setDateOfBirth] = useState<string>('');
    const [birthDateError, setBirthDateError] = useState<boolean>(false);
    const [district, setDistrict] = useState<string>('');
    const [districtError, setDistrictError] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [verifyEmail, setVerifyEmail] = useState<boolean>(false);
    const [emailVerificationCode, setEmailVerificationCode] = useState<string>('');
    const [verifyEmailError, setVerifyEmailError] = useState<boolean>(false);
    const [isValidMailOtp, setIsValidMailOtp] = useState<boolean>(false);
    const [agreedTerms, setAgreedTerms] = useState<any>({
        value: false,
        error: false,
    });


    useEffect(() => {

    }, [isForeignResident, idNumber]);

    useEffect(() => {
        if (email.length === 0) {
            setEmailError(false);
        } else {
            let regex = /\S+@\S+\.\S+/;
            if (regex.test(email)) {
                setEmailError(false);
            } else {
                setEmailError(true);
            };
        };
    }, [email]);

    useEffect(() => {
        if (!isForeignResident) {
            if (idNumber.length === 11 || idNumber.length === 0) {
                setIdNumberError(false);
            } else {
                setIdNumberError(true);
            }
        } else {
            setIdNumberError(false);
        };
    }, [idNumber, isForeignResident]);

    useEffect(() => {
        if (verifyEmail) {
            handleSendMailOtp();
        };
    }, [verifyEmail]);

    useEffect(() => {
        if (emailVerificationCode.length < 6) {
            setIsValidMailOtp(false);
        }
    }, [emailVerificationCode])

    const handleGenderChange = (type: string) => {
        Keyboard.dismiss();
        if (type === 'male') {
            setGender({
                male: true,
                female: false,
                error: false,
            });
        } else {
            setGender({
                male: false,
                female: true,
                error: false,
            });
        };
    };

    const handleStep = () => {
        if (step === 0) {
            if (name === '') {
                setNameError(true);
                return;
            } else if (lastname === '') {
                setNameError(false);
                setLastnameError(true);
                return;
            } else if (isForeignResident && idNumber === '') {
                setLastnameError(false);
                setIdNumberError(true);
                return
            } else if (!gender.male && !gender.female) {
                setIdNumberError(false);
                setGender((prev: any) => {
                    return {
                        ...prev, error: true
                    };
                });
                return;
            };
        } else if (step === 1) {
            if (dateOfBirth === '') {
                setBirthDateError(true);
                return;
            } else if (district === '') {
                setBirthDateError(false);
                setDistrictError(true);
                return;
            } else if (!agreedTerms) {
                setDistrictError(false);
                setAgreedTerms((prev: any) => {
                    return {
                        ...prev, error: true
                    };
                });
            };
        };
        setStep(step + 1);
    };
    const toggleSwitch = () => {
        setEmailVerificationCode('');
        setVerifyEmailError(false);
        setIsValidMailOtp(false);
        setVerifyEmail(!verifyEmail);
    }
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
        setButtonLoading(true);
        let date = dateOfBirth.split('-');
        let data = {
            personCode: idNumber,
            birthDate: date[2] + '-' + date[1] + '-' + date[0],
            firstName: name,
            lastName: lastname,
            phone: userPhoneNumber,
            email: email,
            address: district,
            sex: gender.male ? 1 : gender.female ? 0 : 2,
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
        <Layout hasBackArrow={step < 2 ? true : false} hideArrows onPressBack={() => {
            if (step === 0) {
                GoBack();
            } else {
                setStep(step - 1);
            }
        }}>
            <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={[Grid.col_12, { paddingHorizontal: '10%' }]}>
                {step !== 2 ?
                    <View style={[Grid.row_12_5, {}]}>

                        <Text style={styles.regTitle}>რეგისტრაცია</Text>
                    </View> : null}
                {step === 0 ?
                    <View style={[Grid.col_9, {}]}>
                        <AppInput
                            style={{ color: isDarkTheme ? Colors.white : Colors.black }}
                            placeholder='სახელი'
                            placeholderTextColor={isDarkTheme ? Colors.white : Colors.black}
                            value={name}
                            onChangeText={(val: string) => setName(val)} />
                        {nameError ?
                            <Text style={styles.errorText}>გთხოვთ შეავსოთ ველი</Text>
                            : null}
                        <AppInput
                            style={{ color: isDarkTheme ? Colors.white : Colors.black }}
                            placeholder='გვარი'
                            placeholderTextColor={isDarkTheme ? Colors.white : Colors.black}
                            value={lastname}
                            onChangeText={(val: string) => setLastname(val)} />
                        {lastnameError ?
                            <Text style={styles.errorText}>გთხოვთ შეავსოთ ველი</Text>
                            : null}
                        <View>
                            <AppInput
                                style={{ color: isDarkTheme ? Colors.white : Colors.black, }}
                                placeholder='პირადი ნომერი'
                                maxLength={isForeignResident ? undefined : 11}
                                placeholderTextColor={isDarkTheme ? Colors.white : Colors.black}
                                keyboardType={isForeignResident ? 'default' : 'number-pad'}
                                value={idNumber}
                                onChangeText={(val: string) => setIdNumber(val)} />
                            {idNumberError ?
                                <Text style={styles.errorText}>პირადობის ნომერი არასწორია</Text>
                                : null}
                            <TouchableOpacity style={styles.inputWithLabel} onPress={() => setIsForeignResident(!isForeignResident)}>
                                <AppChekBox checked={isForeignResident} onChange={() => setIsForeignResident(!isForeignResident)} />
                                <Text style={styles.labelText}>უცხო ქვეყნის მოქალაქე</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.genderCheck}>
                            <TouchableOpacity style={styles.inputWithLabel} onPress={() => handleGenderChange('female')}>
                                <AppChekBox checked={gender.female} onChange={() => handleGenderChange('female')} />
                                <Text style={styles.labelText}>მდედრობითი</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.inputWithLabel} onPress={() => handleGenderChange('male')}>
                                <AppChekBox checked={gender.male} onChange={() => handleGenderChange('male')} />
                                <Text style={styles.labelText}>მამრობითი</Text>
                            </TouchableOpacity>
                            {gender.error ?
                                <Text style={styles.errorText}>გთხოვთ აირჩიოთ სქესი </Text>
                                : null}
                        </View>
                    </View> : null}
                {step === 1 ?
                    <View style={[Grid.col_9, {}]}>
                        <DatePicker
                            style={{ width: '100%' }}
                            placeholder='დაბადების თარიღი'
                            date={dateOfBirth}
                            onDateChange={(date) => setDateOfBirth(date)}
                            format='DD-MM-YYYY'
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    alignItems: 'flex-start',
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    borderBottomColor: Colors.white
                                },
                                placeholderText: {
                                    color: isDarkTheme ? Colors.white : Colors.black,
                                    fontFamily: 'Pangram-Bold',
                                    fontSize: 14,
                                    fontWeight: '700',
                                    lineHeight: 17,
                                    paddingLeft: 5
                                },
                                dateText: {
                                    color: isDarkTheme ? Colors.white : Colors.black,
                                    fontFamily: 'Pangram-Bold',
                                    fontSize: 14,
                                    fontWeight: '700',
                                    lineHeight: 17,
                                    paddingLeft: 5

                                }
                            }}
                        />
                        <AppInput
                            style={{ color: isDarkTheme ? Colors.white : Colors.black }}
                            placeholder='საცხოვრებელი რაიონი'
                            placeholderTextColor={isDarkTheme ? Colors.white : Colors.black}
                            value={district}
                            onChangeText={(val: string) => setDistrict(val)} />
                        {districtError ?
                            <Text style={styles.errorText}>გთხოვთ შეავსოთ ველი</Text>
                            : null}
                        <View style={{ alignItems: 'flex-start' }}>
                            <AppInput
                                style={{ color: isDarkTheme ? Colors.white : Colors.black, }}
                                placeholder='ელ-ფოსტა'
                                placeholderTextColor={isDarkTheme ? Colors.white : Colors.black}
                                keyboardType='email-address'
                                value={email}
                                onChangeText={(val: string) => setEmail(val)}
                            />
                            {emailError ?
                                <Text style={styles.errorText}>არასწორი მეილის ფორმატი</Text>
                                : null}

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
                                        <Text style={styles.mailVerificationText}>ელ-ფოსტის ვერიფიკაცია</Text>
                                        <Text style={styles.mailVerificationSubtext}>ელ. ფოსტის მითითებისა და ვერიფიკაციის შემთხვევაში საჩუქრად დაგერიცხებათ 100 სითი ქულა         </Text>
                                    </View>
                                </View>
                                {verifyEmail ?
                                    <View style={{ position: 'relative' }}>
                                        <AppInput
                                            style={{ color: isDarkTheme ? Colors.white : Colors.black, }}
                                            placeholder='ვერიფიკაციის კოდი'
                                            keyboardType='numeric'
                                            maxLength={6}
                                            placeholderTextColor={isDarkTheme ? Colors.white : Colors.black}
                                            value={emailVerificationCode}
                                            onChangeText={(val: string) => setEmailVerificationCode(val)} />
                                        {verifyEmailError ?
                                            <Text style={styles.errorText}>ერთჯერადი კოდი არასწორია</Text>
                                            : null}
                                        <TouchableOpacity onPress={handleCheckMailOtp} style={{ position: 'absolute', right: 5, top: 15 }}>
                                            {verifyEmailLoading ?
                                                <ActivityIndicator animating={verifyEmailLoading} color={Colors.white} />
                                                :
                                                !isValidMailOtp ?
                                                    <Text style={{ color: '#FFFFFF' }}>შეამოწმე</Text>
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
                                <AppChekBox checked={agreedTerms.value} onChange={() => { setAgreedTerms({ value: !agreedTerms.value, error: false }); Keyboard.dismiss() }} />
                                <Text style={styles.labelText}>ვეთანხმები წესებს და პირობებს</Text>
                                {agreedTerms.error ?
                                    <Text style={styles.errorText}>გთხოვთ დაეთანხმოთ წესებსა და პირობებს</Text>
                                    : null}
                            </View>
                        </View>
                    </View> : null}
                {step === 2 ?
                    <View style={[Grid.col_9, { alignItems: 'center', justifyContent: 'center' }]}>
                        <Image source={require('../assets/images/success-mark.png')} style={{ width: 64, height: 64, marginBottom: 20 }} />
                        <Text style={styles.registerSuccess}>რეგისტაცია წარმატებით დასრულდა</Text>
                    </View> : null}
                <View style={[Grid.row_12_5, {}]}>
                    {step === 0 ?
                        <TouchableOpacity style={styles.authBtn} onPress={handleStep}>
                            <Text style={styles.btnText}>შემდეგი</Text>
                        </TouchableOpacity> :
                        step === 1 ?
                            <TouchableOpacity style={styles.authBtn} onPress={handleAddVirtualCard} disabled={buttonLoading}>
                                {buttonLoading ?
                                    <ActivityIndicator animating={buttonLoading} color='#dadde1' />
                                    :
                                    <Text style={styles.btnText}>დადასტურება</Text>
                                }
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.authBtn} onPress={handleGetClientCards}>
                                <Text style={styles.btnText}>დახურვა</Text>
                            </TouchableOpacity>
                    }
                </View>
            </ScrollView>
        </Layout>
    );
};

export default RegistrationScreen;