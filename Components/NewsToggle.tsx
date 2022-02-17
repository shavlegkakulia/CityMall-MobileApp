import {Portal} from '@gorhom/portal';
import React, {useContext, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppContext} from '../AppContext/AppContext';
import {Colors} from '../Colors/Colors';
import {useDimension} from '../Hooks/UseDimension';
import {navigate} from '../Services/NavigationServices';

const NewsToggle = () => {
  const {width} = useDimension();
  const {state} = useContext(AppContext);
  const {isDarkTheme} = state;
  const [collapseFirst, setCollapseFirst] = useState<boolean>(false);
  const [collapseSecond, setCollapseSecond] = useState<boolean>(false);

  return (
    <Portal hostName="News">
      <View
        style={[
          styles.main,
          {backgroundColor: isDarkTheme ? Colors.black : Colors.white},
        ]}>
        <TouchableOpacity
          style={{height: 30, flexDirection: 'row', alignItems: 'center'}}
          onPress={() => setCollapseFirst(!collapseFirst)}>
          <Image
            source={require('../assets/images/arrow-sm.png')}
            style={[
              styles.iconStyle,
              {
                transform: collapseFirst
                  ? [{rotate: '90deg'}]
                  : [{rotate: '0deg'}],
              },
            ]}
          />
          <Text
            style={[
              styles.text,
              {color: isDarkTheme ? Colors.white : Colors.black},
            ]}>
            სითი მოლი გლდანი
          </Text>
        </TouchableOpacity>
        {collapseFirst && (
          <TouchableOpacity>
            <Text
              style={[
                styles.newsText,
                {color: isDarkTheme ? Colors.white : Colors.black},
              ]}>
              {' '}
              სიახლეები
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => setCollapseSecond(!collapseSecond)}
          style={{height: 30, flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../assets/images/arrow-sm.png')}
            style={[
              styles.iconStyle,
              {
                transform: collapseSecond
                  ? [{rotate: '90deg'}]
                  : [{rotate: '0deg'}],
              },
            ]}
          />
          <Text
            style={[
              styles.text,
              {color: isDarkTheme ? Colors.white : Colors.black},
            ]}>
            სითი მოლი საბურთალო
          </Text>
        </TouchableOpacity>
        {collapseSecond && (
          <TouchableOpacity>
            <Text
              style={[
                styles.newsText,
                {color: isDarkTheme ? Colors.white : Colors.black},
              ]}>
              {' '}
              სიახლეები
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.black,
    top: 80,
    left: 190,
    zIndex: 200,
    width: 170,
    height: 'auto',
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
    position: 'absolute',
  },
  text: {
    fontSize: 10,
    textTransform: 'uppercase',
    left: 5,
  },
  newsText: {
    fontSize: 10,
    textTransform: 'uppercase',
    left: 9,
  },
  iconStyle: {
    width: 7,
    height: 7,
  },
});

export default NewsToggle;
