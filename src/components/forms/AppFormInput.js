import React from 'react'
import { StyleSheet } from 'react-native'
import ErrorMessage from './ErrorMessage'
import { useFormikContext } from 'formik';
import colors from '../../utils/colors';
import { TextInput } from 'react-native-paper';
import { View } from 'native-base';



const AppFormInput = ({ name, ...otherProps }) => {

    const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
    return (
        <>
            <View styles={styles.container}>
                <TextInput
                    error={touched[name] && errors[name] && true}
                    onBlur={() => setFieldTouched(name)}
                    onChangeText={handleChange(name)}
                    {...otherProps}
                />
                <View style={styles.errorContainer}>
                    {touched[name] && <ErrorMessage error={errors[name]} />}
                </View>

            </View>

        </>
    )
}

export default AppFormInput

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-start"
    },
    errorContainer: {
        marginTop: 2,
        marginLeft: 5
    }
})