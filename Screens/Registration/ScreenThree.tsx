import React, { useContext, useState } from 'react';
import { ActivityIndicator, Keyboard, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import {AppContext} from '../../AppContext/AppContext';
import { Colors } from '../../Colors/Colors';
import Layout from '../../Components/Layouts/Layout';
import ApiServices from '../../Services/ApiServices';
import { navigate } from '../../Services/NavigationServices';
import Grid from '../../Styles/grid';
import translateService from '../../Services/translateService';


const ScreenThree: React.FC = () => {
    const { state, setGlobalState } = useContext(AppContext);
    const { isDarkTheme} = state;
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);

    const handleGetClientCards = () => {
        setButtonLoading(false);
        ApiServices.GetClientCards().then(res => {
            setGlobalState({cardDetails: res.data});
            setButtonLoading(false);
            navigate('HomeScreen')
        })
            .catch(e => {
                console.log(JSON.parse(JSON.stringify(e.response)).data);
                setButtonLoading(false);
                navigate('HomeScreen')
            });
    };

    return (
        <Layout hasBackArrow onPressBack={handleGetClientCards} >
            <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={{ paddingHorizontal: '10%', position: 'relative', flexGrow: 1 }}>
                <View style={[Grid.row_12_5, {}]}>
                    <Text style={[styles.regTitle, { color: isDarkTheme ? Colors.white : Colors.black }]}>{state?.t('common.register')}</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Image source={require('../../assets/images/success-mark.png')} style={{ width: 64, height: 64, marginBottom: 20 }} />
                    <Text style={[styles.registerSuccess, { color: isDarkTheme ? Colors.white : Colors.black, }]}>{state?.t('infoText.registerSuccess')}</Text>
                </View>
                <View style={[Grid.row_12_5, { marginBottom: 20 }]}>
                    <TouchableOpacity style={styles.authBtn} onPress={handleGetClientCards}>
                    {buttonLoading ?
                            <ActivityIndicator animating={buttonLoading} color='#dadde1' />
                            :
                        <Text style={[styles.btnText, { color: isDarkTheme ? Colors.white : Colors.black, }]}>{state?.t('common.close')}</Text>
                    }
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Layout>
    );
};

export default ScreenThree;

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

    registerSuccess: {
        fontFamily: 'HMpangram-Bold',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 22,
        textAlign: 'center'
    },

});
