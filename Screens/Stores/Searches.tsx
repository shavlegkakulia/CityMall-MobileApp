import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppLayout from '../../Components/AppLayout';
import {Colors} from '../../Colors/Colors';
import {AppContext} from '../../AppContext/AppContext';
import ShopDetailBox from '../../Components/ShopDetailBox';
import {ChunkArrays} from '../../Utils/utils';
import {IMerchant} from '../../Services/Api/ShopsApi';
import axios from 'axios';
import envs from './../../config/env';
import translateService from '../../Services/translateService';

export default () => {
  const {state} = useContext(AppContext);
  const {isDarkTheme} = state;
  const [merchants, setMerchants] = useState<IMerchant[]>([]);
  const [keyword, setKeyword] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const ttlRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<TextInput | null>();
  const itemChunk = 4;

  const itemStyle = {
    width: Dimensions.get('screen').width,
  };

  useEffect(() => {
    if (ttlRef.current) clearTimeout(ttlRef.current);
    if (!keyword) {
      if (merchants?.length) {
        setMerchants([]);
      }
      return;
    }

    ttlRef.current = setTimeout(() => {
      setIsLoading(true);
      axios
        .get(`${envs.API_URL}/api/Mobile/SearchMerchants?keyword=${keyword}`)
        .then(res => {
          if (res.data?.data) setMerchants(res.data?.data);
          setIsLoading(false);
        }).catch(() => setIsLoading(false));
    }, 1000);
  }, [keyword]);

  const chunkedData = ChunkArrays<IMerchant>(merchants!, itemChunk);
  const fillSpace = (ln: number) => {
    if (itemChunk - ln === 0) return null;
    return Array.from(Array(itemChunk - ln).keys()).map(element => (
      <View style={styles.emptyItem} key={`_${element}`}></View>
    ));
  };
  return (
    <>
    <AppLayout pageTitle={translateService.t('common.searching')}>
      <View
        style={{
          flex: 1,
          backgroundColor: isDarkTheme ? Colors.black : Colors.white,
          paddingTop: 20,
        }}>
        <View style={{paddingHorizontal: '7%'}}>
          <TouchableOpacity
          onPress={() => inputRef.current?.focus()}
            style={[Platform.OS === 'ios' && {paddingBottom: 10}, {
              borderBottomColor: '#fff',
              borderBottomWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              
            }]}>
            <TextInput
              placeholder={translateService.t('common.searching')}
              placeholderTextColor={'#fff'}
              style={{color: '#fff'}}
              value={keyword}
              onChangeText={e => setKeyword(e)}
              autoFocus={true}
              ref={i => inputRef.current = i}
              onChange={() => inputRef.current?.focus()}
            />
            <Image
              source={require('./../../assets/images/icon-search-red.png')}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{backgroundColor: isDarkTheme ? Colors.black : Colors.white}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1, flexDirection: 'row'}}
            horizontal>
            {merchants.length > 0 && (
              <ScrollView
                scrollToOverflowEnabled={true}
                style={[styles.dataScroller]}
                showsHorizontalScrollIndicator={false}>
                {chunkedData.map((data, i) => (
                  <View key={i} style={[styles.dataContent, itemStyle]}>
                    {data.map((item, index) => (
                      <ShopDetailBox
                        index={index}
                        data={item}
                        key={item.name! + index}
                        style={styles.dataItem}
                      />
                    ))}

                    {fillSpace(data.length)}
                  </View>
                ))}
              </ScrollView>
            )}
          </ScrollView>
        </View>
      </View>
    </AppLayout>
    {isLoading && <View style={styles.loader}>
        <ActivityIndicator
          size={'small'}
          color={'#ffffff'}
          style={{
            alignSelf: 'center',
            transform: [{translateY: Dimensions.get('screen').height / 2}],
          }}
        />
      </View>}
    </>
  );
};

const styles = StyleSheet.create({
  dataContent: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dataItem: {
    marginBottom: 20,
  },
  dataScroller: {
    marginTop: 20,
  },
  emptyItem: {
    width: 159,
    height: 180,
    margin: 10,
  },
  loader: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'transparent'
  }
});
