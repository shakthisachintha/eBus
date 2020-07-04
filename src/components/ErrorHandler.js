import { Alert } from 'react-native'

export default function (error) {
    Alert.alert('Bad Happend!', error.message)
}


