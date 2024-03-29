import React, { useContext, useEffect, useState } from 'react';
import { Keyboard, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AppContext } from '../AppContext/AppContext';
import { Colors } from '../Colors/Colors';
import AppButton from '../Components/CostumComponents/AppButton';
import AppChekBox from '../Components/CostumComponents/AppChekBox';

import AppInput from '../Components/CostumComponents/AppInput';
import Layout from '../Components/Layouts/Layout';
import { useDimension } from '../Hooks/UseDimension';
import ApiServices, { IServiceCenter, IServiceCenterResponse } from '../Services/ApiServices';
import { navigate } from '../Services/NavigationServices';
import Grid from '../Styles/grid';

interface IDeliveryOption {
    fromCityMall: boolean,
    curierDelivery: boolean
};


const OrderGiftCardScreen = () => {
    const { isDarkTheme } = useContext(AppContext)
    const { width, height } = useDimension();
    const [step, setStep] = useState<number>(0);
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [customer, setCustomer] = useState<string>('');
    const [customerError, setCustomerError] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('995');
    const [phoneNumberError, setPhoneNumberError] = useState<string>('');
    const [orderDetails, setOrderDetails] = useState<string>('');
    const [orderDetailsError, setOrderDetailsError] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [addressError, setAddressError] = useState<string>('');
    const [deliveryOption, setDeliveryOption] = useState<IDeliveryOption>({ fromCityMall: false, curierDelivery: false });
    const [serviceCenters, setServiceCenters] = useState([]);
    const [checkedServiceCenter, setChekedServiceCenter] = useState<IServiceCenter>({ id: 0, name: '', checked: false });
    const [resSuccess, setRespSuccess] = useState<boolean>(false);


    useEffect(() => {
        hanldeGetServiceCenters();
    }, []);

    useEffect(() => {
        if (phoneNumber.length === 12 || phoneNumber.length === 3) {
            setPhoneNumberError('');
        } else {
            setPhoneNumberError('მობილურის ნომერი არასწორია')
        }
    }, [phoneNumber]);

    const styles = StyleSheet.create({
        infoText: {
            color: isDarkTheme ? Colors.white : Colors.black,
            fontFamily: 'HMpangram-Medium',
            fontSize: 16,
            lineHeight: 24
        },
        orderCardTitle: {
            color: isDarkTheme ? Colors.white : Colors.black,
            fontFamily: 'HMpangram-Bold',
            fontSize: 14,
            lineHeight: 17,
            fontWeight: '700',
            textTransform: 'uppercase',
            marginBottom: 20
        },
        detailsText: {
            width: '100%',
            height: 80,
            borderWidth: 1,
            borderColor: isDarkTheme ? Colors.white : Colors.black,
            borderRadius: 5,
            textAlignVertical: 'top',
            color: isDarkTheme ? Colors.white : Colors.black,
            fontFamily: 'HMpangram-Medium',
            fontSize: 10,
            lineHeight: 14,
            padding: 10,
            marginBottom: '5%'
        },

        checkBoxWithLabel: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20
        },
        labelText: {
            color: isDarkTheme ? Colors.white : Colors.black,
            fontFamily: 'HMpangram-Medium',
            fontSize: 16,
            lineHeight: 18,
            textTransform: 'uppercase',
            marginLeft: 5
        },
        responseText: {
            color: isDarkTheme ? Colors.white : Colors.black,
            fontFamily: 'HMpangram-Bold',
            fontWeight: '700',
            fontSize: 18,
            lineHeight: 21,
            textAlign: 'center',
            textTransform: 'uppercase',
            width: 300,
            alignSelf: 'center'
        },
        responseImg: {
            width: 64,
            height: 64,
            alignSelf: 'center',
            marginBottom: 36
        },
        btnStyle: {
            width: '100%',
            maxWidth: 325,

            height: 66,
            backgroundColor: Colors.darkGrey,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center'
        },
        btnTitleStyle: {
            color: Colors.white,
            fontFamily: 'HMpangram-Bold',
            textAlign: 'center',
            fontSize: 14,
            lineHeight: 17,
            textTransform: 'uppercase'
        },
        errorText: {

            color: Colors.red,
            fontSize: 11,
            fontFamily: 'HMpangram-Medium'
        }
    });

    const loaderStyle = {
        size: 'small',
        color: Colors.white
    }



    const conditionalpadding = () => {
        if (width > 412) {
            return '8.5%';
        } else if (width < 400 && width > 369) {
            return '6%';
        } else {
            return '4%';
        }
    };

    const handlePhoneNumber = (value: string) => {
        if (value.length < 3) {
            return;
        } else {
            setPhoneNumber(value);
        }
    }

    const handleValidateInputs = (name: string, value: string) => {
        switch (name) {
            case 'customer':
                if (value === '') {
                    setCustomerError('გთხოვთ შეავსოთ ველი');
                } else {
                    if (customerError) {
                        setCustomerError('');
                    }
                }
                break;
            case 'orderDetails':
                if (value === '') {
                    setOrderDetailsError('გთხოვთ შეავსოთ ველი');
                } else {
                    if (orderDetailsError) {
                        setOrderDetailsError('');
                    }
                }
                break;
            case 'address':
                if (value === '') {
                    setAddressError('გთხოვთ შეავსოთ ველი');
                } else {
                    if (addressError) {
                        setAddressError('');
                    }
                }
                break;
            default:
                break;
        }
    }



    const toggleDeliveryOption = (option: string) => {
        if (option === 'fromMall') {
            setDeliveryOption({ fromCityMall: true, curierDelivery: false });
        } else {
            setDeliveryOption({ fromCityMall: false, curierDelivery: true });
        };
        Keyboard.dismiss();
    };

    const togglePickupLocation = (index: number) => {
        let tempServiceCenters: any = serviceCenters.map((s: IServiceCenter, indx: number) => {
            if (indx === index) {
                s.checked = true;
                setChekedServiceCenter(s);
            } else {
                s.checked = false;
            };

            return s;
        });

        setServiceCenters(tempServiceCenters);
    };

    const hanldeGetServiceCenters = () => {
        ApiServices.GetServiceCenters().then(res => {
            let tempServiceCenters = res.data.map((s: any) => {
                s.checked = false;

                return s;
            })
            setServiceCenters(tempServiceCenters);
        })
            .catch(e => {
                console.log(JSON.parse(JSON.stringify(e)));
            });
    }

    const handleGiftCardOrder = () => {
        if(phoneNumberError || customerError || orderDetailsError) {
            return;
        };
        if(deliveryOption.fromCityMall && checkedServiceCenter.id === 0) {
            return;
        } else {
            if(addressError) {
                return;
            };
        };
        setBtnLoading(true);
        let data;
        data = {
            name: customer,
            phone: phoneNumber,
            orderDetails: orderDetails,
            deliveryType: deliveryOption.fromCityMall ? 1 : 2,
        }
        if (deliveryOption.fromCityMall) {
            data = {
                ...data,
                deliveryServiceCenter: checkedServiceCenter.id,
            }
        } else {
            data = {
                ...data,
                courierDetails: address
            }
        }
        ApiServices.OrderGiftCard(data).then(res => {
            if (res.status === 200) {
                setRespSuccess(true);
                setBtnLoading(false);
                setStep(2);

            }
        })
            .catch(e => {
                setRespSuccess(false);
                setBtnLoading(false);
                setStep(2);
                console.log(JSON.parse(JSON.stringify(e)));
            });
    };


    const GiftCards = () => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Image source={require('../assets/images/gift-card-v1.png')} style={{ width: 159, height: 101 }} />
            <Image source={require('../assets/images/gift-card-v2.png')} style={{ width: 159, height: 101 }} />
        </View>
    );


    let GiftCardOrderStep;

    if (step === 0) {
        GiftCardOrderStep = (
            <View style={{ flex: 1, paddingHorizontal: conditionalpadding(), justifyContent: 'flex-end' }}>
                <View style={{ height: Grid.col_11.height, justifyContent: 'space-between' }}>
                    <View>
                        <GiftCards />
                        <View style={{ marginTop: 44 }}>
                            <Text style={styles.infoText}>
                                შეუკვეთე სითი მოლის სასაჩუქრე ბარათი შენთვის ან შენი საყვარელი ადამიანებისთვის - ეს ყველაზე სასურველი საჩუქარია, რითაც შეგიძლიათ ადამიანს არჩევანის თავისუფლება მისცეთ
                            </Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <AppButton
                            btnStyle={styles.btnStyle}
                            titleStyle={styles.btnTitleStyle}
                            loaderStyle={loaderStyle}
                            loading={btnLoading}
                            title='შემდეგი'
                            onPress={() => setStep(1)}
                        />
                    </View>
                </View>
            </View>
        );
    } else if (step === 1) {
        GiftCardOrderStep = (
            <View
                style={{ flexGrow: 1, backgroundColor: isDarkTheme ? Colors.black : Colors.white, paddingHorizontal: conditionalpadding(), paddingBottom: 10 }}>
                <Text style={styles.orderCardTitle}>
                    შეუკვეთე ბარათ(ებ)ი
                </Text>
                <GiftCards />
                <AppInput
                    placeholder='სახელი გვარი'
                    value={customer}
                    onChangeText={(newValue: string) => setCustomer(newValue)}
                    onBlur={() => handleValidateInputs('customer', customer)} />
                {customerError.length > 0 && <Text style={styles.errorText}>{customerError}</Text>}
                <AppInput
                    placeholder='მობილურის ნომერი'
                    value={phoneNumber}
                    onChangeText={(newValue: string) => handlePhoneNumber(newValue)}
                    keyboardType='numeric'
                    maxLength={12} />
                {phoneNumberError.length > 0 && <Text style={styles.errorText}>{phoneNumberError}</Text>}

                <Text style={[styles.orderCardTitle, { marginTop: 30 }]}>
                    შეკვეთის დეტალები
                </Text>
                <TextInput
                    style={styles.detailsText}
                    placeholder='მიუთითეთ ბარათ(ებ)ი დიზაინი, რაოდენობა და თანხა'
                    placeholderTextColor={Colors.darkGrey}
                    value={orderDetails}
                    onChangeText={(newValue: string) => setOrderDetails(newValue)}
                    onBlur={() => handleValidateInputs('orderDetails', orderDetails)}
                    multiline={true}
                    numberOfLines={4} />
                {orderDetailsError.length > 0 && <Text style={styles.errorText}>{orderDetailsError}</Text>}
                <TouchableOpacity
                    style={styles.checkBoxWithLabel}
                    onPress={() => toggleDeliveryOption('fromMall')}>
                    <AppChekBox
                        checked={deliveryOption.fromCityMall}
                        onChange={() => toggleDeliveryOption('fromMall')} />
                    <Text style={styles.labelText}>სითი მოლიდან გატანა</Text>
                </TouchableOpacity>
                {deliveryOption.fromCityMall &&
                    <View style={{ paddingLeft: 20 }}>
                        {serviceCenters?.map((s: IServiceCenter, i: number) => (
                            <TouchableOpacity
                                key={s.id}
                                style={styles.checkBoxWithLabel}
                                onPress={() => togglePickupLocation(i)}>
                                <AppChekBox
                                    checked={s.checked}
                                    onChange={() => togglePickupLocation(i)} />
                                <Text style={styles.labelText}>{s.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>}
                <TouchableOpacity
                    style={styles.checkBoxWithLabel}
                    onPress={() => toggleDeliveryOption('curier')}>
                    <AppChekBox
                        checked={deliveryOption.curierDelivery}
                        onChange={() => toggleDeliveryOption('curier')} />
                    <Text style={styles.labelText}>საკურიერო მომსახურება</Text>
                </TouchableOpacity>
                {deliveryOption.curierDelivery &&
                    <View >
                        <TextInput
                            style={styles.detailsText}
                            placeholder='გთხოვთ მიუთიოთ მისამართი'
                            placeholderTextColor={Colors.darkGrey}
                            value={address}
                            onChangeText={(newValue: string) => setAddress(newValue)}
                            multiline={true}
                            numberOfLines={4}
                            onBlur={() => handleValidateInputs('address', address)} />
                        {addressError.length > 0 && <Text style={styles.errorText}>{addressError}</Text>}
                    </View>
                }

                <AppButton
                    btnStyle={styles.btnStyle}
                    titleStyle={styles.btnTitleStyle}
                    loaderStyle={loaderStyle}
                    loading={btnLoading}
                    title='შემდეგი'
                    onPress={handleGiftCardOrder}
                />
            </View>
        );
    } else {
        GiftCardOrderStep = (
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View style={{ justifyContent: 'space-between', height: Grid.col_9.height }}>
                    {!resSuccess ?
                        <View>
                            <Image source={require('../assets/images/error-mark.png')} style={styles.responseImg} />
                            <Text style={styles.responseText}>დაფიქსირდა შეცდომა</Text>
                        </View>
                        :
                        <View>
                            <Image source={require('../assets/images/success-mark.png')} style={styles.responseImg} />
                            <Text style={styles.responseText}>შეკვეთა წარმატებით დასრულდა</Text>
                        </View>}
                    <Pressable onPress={() => navigate('HomeScreen')} style={{ width: 325, height: 66, backgroundColor: Colors.darkGrey, borderRadius: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={{ color: Colors.white }}>
                            დახურვა
                        </Text>
                    </Pressable>
                </View>
            </View>
        );
    };




    return (
        <Layout>
            {GiftCardOrderStep}
        </Layout>

    );
};

export default OrderGiftCardScreen;