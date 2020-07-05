import React from 'react'
import { useFormikContext } from 'formik'
import { Button } from 'react-native-paper'

import colors from '../../utils/colors'


const SubmitButton = ({ title, ...otherProps }) => {
    const { handleSubmit } = useFormikContext();
    return (
        <Button mode="contained" {...otherProps} onPress={handleSubmit}>
            {title}
        </Button>
    )
}

export default SubmitButton
