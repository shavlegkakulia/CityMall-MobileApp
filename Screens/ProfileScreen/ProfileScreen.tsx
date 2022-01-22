import React, {
    useContext,
    useState
} from 'react';
import {
    StyleSheet,
    Switch,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    NativeSyntheticEvent,
    NativeScrollEvent,
    Image
} from 'react-native';
import { AppContext } from '../../AppContext/AppContext';
import { Colors } from '../../Colors/Colors';
import AppLayout from '../../Components/AppLayout';
import AppSwitch from '../../Components/CustomComponents/AppSwitch';
import Layout from '../../Components/Layouts/Layout';
import PaginationDots from '../../Components/PaginationDots';
import PromotionBox from '../../Components/PromotionBox';
import StatusBar from '../../Components/StatusBar';
import TransactionList from '../../Components/TransactionList';
import { useDimension } from '../../Hooks/UseDimension';
import { navigate } from '../../Services/NavigationServices';
import Grid from '../../Styles/grid';
import StatusInfoScreen from './StatusInfoScreen';


const offers: any = [
    {
        title: 'ფასდაკლება THE NORTH FACE-ში',
        subTitle: 'საცურაო აუზი -30% ფასდაკლება',
        imgUrl: '../assets/images/promotion_img.png'
    },
    {
        title: 'ფასდაკლება THE NORTH FACE-ში',
        subTitle: 'საცურაო აუზი -30% ფასდაკლება',
        imgUrl: '../assets/images/promotion_img.png'
    },
    {
        title: 'ფასდაკლება THE NORTH FACE-ში',
        subTitle: 'საცურაო აუზი -30% ფასდაკლება',
        imgUrl: '../assets/images/promotion_img.png'
    },
    {
        title: 'ფასდაკლება THE NORTH FACE-ში',
        subTitle: 'საცურაო აუზი -30% ფასდაკლება',
        imgUrl: '../assets/images/promotion_img.png'
    },
    {
        title: 'ფასდაკლება THE NORTH FACE-ში',
        subTitle: 'საცურაო აუზი -30% ფასდაკლება',
        imgUrl: '../assets/images/promotion_img.png'
    },
    {
        title: 'ფასდაკლება THE NORTH FACE-ში',
        subTitle: 'საცურაო აუზი -30% ფასდაკლება',
        imgUrl: '../assets/images/promotion_img.png'
    },
    {
        title: 'ფასდაკლება THE NORTH FACE-ში',
        subTitle: 'საცურაო აუზი -30% ფასდაკლება',
        imgUrl: '../assets/images/promotion_img.png'
    },
    {
        title: 'ფასდაკლება THE NORTH FACE-ში',
        subTitle: 'საცურაო აუზი -30% ფასდაკლება',
        imgUrl: '../assets/images/promotion_img.png'
    },

]

const tr = [
    {
        date: '28.10.2021',
        time: '16:45',
        shop : 'Zara',
        amount: '-90',
        image: require('../../assets/images/hm-icon-profile.png')
    },
    {
        date: '28.10.2021',
        time: '16:45',
        shop : 'Zara',
        amount: '-90',
        image: require('../../assets/images/hm-icon-profile.png')
    },
    {
        date: '28.10.2021',
        time: '16:45',
        shop : 'Zara',
        amount: '-90',
        image: require('../../assets/images/hm-icon-profile.png')
    },
    {
        date: '28.10.2021',
        time: '16:45',
        shop : 'Zara',
        amount: '-90',
        image: require('../../assets/images/hm-icon-profile.png')
    },
    {
        date: '28.10.2021',
        time: '16:45',
        shop : 'Zara',
        amount: '-90',
        image: require('../../assets/images/hm-icon-profile.png')
    },
    {
        date: '28.10.2021',
        time: '16:45',
        shop : 'Zara',
        amount: '-90',
        image: require('../../assets/images/hm-icon-profile.png')
    },
    {
        date: '28.10.2021',
        time: '16:45',
        shop : 'Zara',
        amount: '-90',
        image: require('../../assets/images/hm-icon-profile.png')
    },
    {
        date: '28.10.2021',
        time: '16:45',
        shop : 'Zara',
        amount: '-90',
        image: require('../../assets/images/hm-icon-profile.png')
    },
    {
        date: '28.10.2021',
        time: '16:45',
        shop : 'Zara',
        amount: '-90',
        image: require('../../assets/images/hm-icon-profile.png')
    },
    {
        date: '28.10.2021',
        time: '16:45',
        shop : 'Zara',
        amount: '-90',
        image: require('../../assets/images/hm-icon-profile.png')
    },
] 



const ProfileScreen = () => {
    const { width } = useDimension();
    const { state } = useContext(AppContext);
    const { isDarkTheme } = state;

    const [offersStep, setOffersStep] = useState<number>(0);
    const [isMoneyTransaction, setIsMoneyTransaction] = useState<boolean>(false);
    const [transactions, setTranzactions] = useState<any[]>(tr);


    const toggleSwitch = () => {
        setIsMoneyTransaction(!isMoneyTransaction)
    };



    const handleOffersScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        let overView = event.nativeEvent.contentOffset.x / (width - 25);
        setOffersStep(Math.round(overView));
    };

    return (
        <AppLayout>
            <View style={{ flexGrow: 1, backgroundColor: isDarkTheme ? Colors.black : Colors.white, paddingHorizontal: '7%' }}>
                <View style={styles.balanceView}>
                    <View >
                        <Text style={styles.balanceWrapTitle}>
                            ხელმისაწვდომი თანხა
                        </Text>
                        <Text style={styles.balanceWrapAmount}>
                            1050.50
                        </Text>

                    </View>
                    <View>
                        <Text style={styles.balanceWrapTitle}>
                            სითი ქულა
                        </Text>
                        <Text style={styles.balanceWrapAmount}>
                            1360.50
                        </Text>
                    </View>
                </View>
                <View style={{ marginBottom: 30, width: '100%' }}>
                    <View style={styles.statusBarView}>
                        <Text style={[styles.promotionsTitle, { color: isDarkTheme ? Colors.white : Colors.black, }]}>
                            სტატუსბარი
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigate('StatusInfoScreen')}>
                            <Text style={[styles.promotionsTitle, { color: isDarkTheme ? Colors.white : Colors.black, }]}>
                                ვრცლად
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <StatusBar />
                </View>
                <View style={{marginBottom: 30}}>
                    <View style={styles.promotionContainer}>
                        <Text style={[styles.promotionsTitle, { color: isDarkTheme ? Colors.white : Colors.black, }]}>
                            პირადი შეთავაზებები
                        </Text>
                        <PaginationDots length={Math.round(offers?.length / 2)} step={offersStep} />
                    </View>
                    <ScrollView contentContainerStyle={{ flexDirection: "row" }} showsVerticalScrollIndicator={false}>
                        <ScrollView contentContainerStyle={{ flexDirection: 'row', }} showsHorizontalScrollIndicator={false} horizontal={true} onScroll={handleOffersScroll}>
                            {offers?.map((el: any, i: number) => (
                                <PromotionBox key={i} data={el} />

                            ))}
                        </ScrollView>
                    </ScrollView>
                </View>
                <View style={{marginBottom: 30}}>
                <View style={styles.promotionContainer}>
                    <Text style={[styles.promotionsTitle, { color: isDarkTheme ? Colors.white : Colors.black, }]}>
                        ქულების გახაჯვის ოფცია
                    </Text>
                    <PaginationDots length={Math.round(offers?.length / 2)} step={offersStep} />
                </View>
                <ScrollView contentContainerStyle={{ flexDirection: "row" }} showsVerticalScrollIndicator={false}>
                    <ScrollView contentContainerStyle={{ flexDirection: 'row' }} showsHorizontalScrollIndicator={false} horizontal={true} onScroll={handleOffersScroll}>
                        {offers?.map((el: any, i: number) => (
                            <PromotionBox key={i} data={el} />

                        ))}
                    </ScrollView>
                </ScrollView>
                </View>
                <View style={styles.redirectView}>
                    <Image source={require('../../assets/images/payunicard_white.png')} style={{ width: 49, height: 26, marginRight: 10 }} />
                    <TouchableOpacity style={styles.redirectBtn}>
                        <Text style={styles.redirectBtnText}>
                            დამატებითი ოპერაციები ფეიუნიქარდში
                        </Text>
                        <Image source={require('../../assets/images/redirect_icon.png')} style={{ width: 9, height: 9 }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.transactionView}>
                    <View style={styles.trViewHeader}>
                        <Text
                            style={[
                                styles.promotionsTitle,
                                { color: isDarkTheme ? Colors.white : Colors.black, }]
                            }>
                            ტრანზაქციები
                        </Text>
                        <View style={styles.trViewHeaderRight}>
                            <Image source={require('../../assets/images/points_active.png')} style={{width: 19, height: 19}} />
                      
                                         <AppSwitch />
                            <Image source={require('../../assets/images/GEL_inactive.png')} style={{width: 15, height: 18}} />
                            
                        </View>
                    </View>
                    <View>
                        {tr.map((item, index) => (
                            <TransactionList item = {item} key = {index}/>
                        ))}
                        <TransactionList/>
                    </View>
                </View>
            </View>



        </AppLayout>
    );
};

const styles = StyleSheet.create({
    balanceView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        marginBottom: 35
    },
    balanceWrap: {

    },
    balanceWrapTitle: {
        fontSize: 14,
        fontFamily: 'HMpangram-Medium',
        color: Colors.darkGrey
    },
    balanceWrapAmount: {
        fontSize: 24,
        fontFamily: 'HMpangram-Bold',
        color: Colors.white
    },

    statusBarView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    promotions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 400,
    },
    promotionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    promotionsTitle: {
        fontFamily: 'HMpangram-Bold',
        fontSize: 14,
        lineHeight: 17,
        fontWeight: '900',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    redirectView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 30
    },
    redirectBtn: {
        width: '100%',
        maxWidth: 272,
        height: 39,
        borderRadius: 50,
        backgroundColor: Colors.darkGrey,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    redirectBtnText: {
        fontSize: 10,
        fontFamily: 'HMpangram-Medium',
        marginRight: 5
    },
    transactionView: {
        marginBottom: 20
    },
    trViewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    trViewHeaderRight: {
        flexDirection: 'row',
        marginBottom: 20
    }
});



export default ProfileScreen;