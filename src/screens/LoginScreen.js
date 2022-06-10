import React from 'react'
import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import AppForm from '../components/forms/AppForm'
import colors from '../utils/colors'
import * as yup from 'yup'
import AppFormFeilds from '../components/forms/AppFormFeilds'
import AppSubmitButton from '../components/forms/AppSubmitButton'
import { useAuth } from '../utils/auth'

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
})

function LoginScreen({ navigation }) {
  const { signIn, error } = useAuth()
  if (error) {
    Alert.alert('ERROR: ', error.message)
  }


  return (

    <View style={styles.container}>
      <View style={styles.form}>
        <AppForm
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={(values) => signIn(values)}
        >
          <AppFormFeilds
            name='email'
            placeholder='Your email'
            keyboardType='email-address'
          />
          <AppFormFeilds
            name='password'
            placeholder='Password'
            autoCompleteType='off'
            password={true}
          />
          <AppSubmitButton title='Login' />
        </AppForm>
      </View>

      <Text style={styles.join}>
        Not a member?{' '}
        <Text
          onPress={() => navigation.navigate('Signup')}
          style={{ color: colors.primary }}
        >
          Sign Up
        </Text>
      </Text>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.Primary,
    justifyContent: 'center',
    paddingHorizontal: 20,
    flex: 1,
  },

  logo: {
    height: 160,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30,
  },
  wellcomeTo: {
    fontSize: 23,
    fontWeight: '700',
    color: colors.secondary,
    marginTop: 20,
    textAlign: 'center',
  },
  brand: {
    fontSize: 23,
    color: colors.primary,
    textAlign: 'center',
    fontWeight: '500',
  },
  form: {
    marginTop: 10,
  },
  join: {
    marginTop: 16,
    textAlign: 'center',
    color: colors.black,
  },
  or: {
    color: colors.gray,
    textAlign: 'center',
    marginVertical: 20,
  },
})

export default LoginScreen
