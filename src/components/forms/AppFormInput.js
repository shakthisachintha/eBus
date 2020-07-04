import React from 'react'
import { StyleSheet } from 'react-native'
import ErrorMessage from './ErrorMessage'
import { useFormikContext } from 'formik';
import colors from '../../utils/colors';
import { TextInput } from 'react-native-paper';



const AppFormInput = ({ name, ...otherProps }) => {

    const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
    return (
        <>
            <TextInput
                error={touched[name] && errors[name] && true}
                onBlur={() => setFieldTouched(name)}
                onChangeText={handleChange(name)}
                {...otherProps}
            />
            {touched[name] && <ErrorMessage error={errors[name]} />}
        </>
    )
}

export default AppFormInput

const styles = StyleSheet.create({})