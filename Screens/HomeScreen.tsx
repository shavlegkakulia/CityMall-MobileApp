import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Image, View, StatusBar, Text, ScrollView, StyleSheet, NativeSyntheticEvent, NativeScrollEvent, TouchableOpacity, ActivityIndicator } from 'react-native';
import ApiServices from "../Services/ApiServices";
import { Colors } from '../Colors/Colors';
import PaginationDots from "../Components/PaginationDots";
import PromotionBox from "../Components/PromotionBox";
import { useDimension } from "../Hooks/UseDimension";
import Grid from "../Styles/grid";
import AppLayout from "../Components/AppLayout";
import { AppContext } from "../AppContext/AppContext";
import UserCardSmall from "../Components/UserCardSmall";
import { paginationDotCount } from "../Services/Utils";




const HomeScreen = (props: any) => {
    const { state, setGlobalState } = useContext(AppContext);
    const { clientDetails, offersArray, isDarkTheme } = state;

    const { width, height } = useDimension();
    const [offersStep, setOffersStep] = useState<number>(0);
    const [offers, setOffers] = useState<any[]>();
    const [offersView, setOffersView] = useState<any[]>();
    const [barcode, setBarCode] = useState<string>('');
    const [initLoading, setInitLoading] = useState<boolean>(true);


    useEffect(() => {
        getOffers();
        handleGetClientCards();
    }, []);

    useEffect(() => {
        handleSetOffers();
    }, [offersArray]);

    useEffect(() => {
        if (clientDetails?.[0]?.card !== undefined) {
            handleGetBarcode(clientDetails?.[0]?.card)
        };

    }, [clientDetails]);

    const handleOffersScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        let overView = event.nativeEvent.contentOffset.x / (width - 25);
        setOffersStep(Math.round(overView));
    };


    const handleGetClientCards = () => {
        ApiServices.GetClientCards().then(res => {
            setGlobalState({ clientDetails: res.data });
            setInitLoading(false);
        })
            .catch(e => {
                console.log(JSON.parse(JSON.stringify(e.response)).data);
                setInitLoading(false);
            });
    };
    const handleGetBarcode = (card: string) => {
        ApiServices.GenerateBarcode(card)
            .then(res => {
                setGlobalState({ cardDetails: { barcode: res.data.base64Data, cardNumber: clientDetails?.[0]?.card } })
            })
            .catch(e => {
                console.log('barcode error', JSON.parse(JSON.stringify(e.response)).data)
            });
    }

    const handleSetOffers = () => {
        if (offersArray !== undefined) {
            for (let i = 4; i < offersArray!.length + 4; i += 4) {
                const renderElement =
                    <View style={styles.promotions}>
                        {offersArray![i - 4] && <PromotionBox data={offersArray![i - 4]} />}
                        {offersArray![i - 3] && <PromotionBox data={offersArray![i - 3]} />}
                        {offersArray![i - 2] && <PromotionBox data={offersArray![i - 2]} />}
                        {offersArray![i - 1] && <PromotionBox data={offersArray![i - 1]} />}
                    </View>
                setOffersView(prev => {
                    return [...(prev || []), renderElement]
                });
            };
        };
    };

    const getOffers = () => {
        ApiServices.GetOffers().then(res => {
            setGlobalState({ offersArray: res.data })
        }).catch(e => {
            console.log('error ===>', e)
        });
    };


    return (
        <AppLayout >
            <View style={{ flex: 1, backgroundColor: isDarkTheme ? Colors.black : Colors.white }}>
                <View style={{ flex: 4.5, justifyContent: 'center' }}>
                    {!initLoading ?
                        <UserCardSmall
                            cardNumber={clientDetails?.[0]?.card.replace(
                                /\b(\d{4})(\d{4})(\d{4})(\d{4})\b/,
                                '$1  $2  $3  $4',
                            )}
                            navigateToBarCode={() => props.navigation.navigate('UserCardWithBarcode')}
                            navigateToReg={() => props.navigation.navigate('RegistrationScreen')} />
                        :
                        <ActivityIndicator animating={initLoading} color='#dadde1' />
                    }
                </View>
                <Image style={{ width: '100%' }} source={require('../assets/images/gradient-line.png')} />
                <View style={{ flex: 7.5 }}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.promotionContainer}>
                            <Text style={[styles.promotionsTitle, { color: isDarkTheme ? Colors.white : Colors.black }]}>
                                შეთავაზებები
                            </Text>
                            <PaginationDots length={paginationDotCount(offersArray, 4)} step={offersStep} />
                        </View>
                        <View style={{ flex: 10 }}>
                            <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: "row" }} showsVerticalScrollIndicator={false}>
                                <ScrollView contentContainerStyle={{ flexDirection: 'row', padding: '7%' }} showsHorizontalScrollIndicator={false} horizontal={true} onScroll={handleOffersScroll}>
                                    {offersView?.map((el, i) => (
                                        <View key={i}>
                                            {el}
                                        </View>
                                    ))}
                                </ScrollView>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
        </AppLayout>
    );

};


export default HomeScreen;

const styles = StyleSheet.create({
    giftCardImg: {
        maxHeight: 187,
        maxWidth: 300,
        width: '100%',
        height: '100%'
    },

    promotions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 400,
    },
    promotionContainer: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '7%',
    },
    promotionsTitle: {
        fontFamily: 'HMpangram-Bold',
        fontSize: 14,
        lineHeight: 17,
        fontWeight: '900',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    authBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'HMpangram-Bold',

    },


});