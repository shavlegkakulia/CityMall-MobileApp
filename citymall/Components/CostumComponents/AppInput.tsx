import React, { useContext, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { AppContext } from '../../AppContext/AppContext';
import { Colors } from '../../Colors/Colors';
import { useDimension } from '../../Hooks/UseDimension';


const AppInput = (props: any) => {
    const { isDarkTheme } = useContext(AppContext);
    const { width } = useDimension();
    const [errorMesage, setErrorMesage] = useState<string>('');

    const styles = StyleSheet.create({
        inputWrap: {
            width: '100%',
            position: 'relative',
            borderColor: isDarkTheme ? Colors.white : Colors.black,
            borderBottomWidth: 1,

        },

        input: {
            paddingTop: 16,
            paddingBottom: 12,
            paddingHorizontal: 12,
            height: 65,
            color: isDarkTheme ? Colors.white : Colors.black,
            fontFamily: 'HMpangram-Medium',
            fontWeight: '500',
            fontSize: 14,
            lineHeight: 16,
        }
    })
    return (
        <View style={styles.inputWrap}>
            <TextInput
                style={styles.input}
                {...props}
                selectionColor={isDarkTheme ? Colors.white : Colors.black}
                placeholderTextColor={isDarkTheme ? Colors.white : Colors.black} />
        </View>
    );
};

export default AppInput;