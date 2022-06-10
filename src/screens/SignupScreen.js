import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../utils/auth'
import * as yup from 'yup'
import AppForm from '../components/forms/AppForm'
import colors from '../utils/colors'
import AppFormFeilds from '../components/forms/AppFormFeilds'
import AppSubmitButton from '../components/forms/AppSubmitButton'


const ValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, ({ min }) => `Name must be at least ${min} characters`)
    .max(50, ({ max }) => `Name must be less then ${max} characters`)
    .required('Name is Required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
})

function SignupScreen({ navigation }) {
  const { createUser, error } = useAuth()
  if (error) {
    Alert.alert('ERROR: ', error.message)
  }
  return (
    <View style={styles.wrapper}>
      <View style={styles.form}>
        <AppForm
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={ValidationSchema}
          onSubmit={(values) => createUser(values)}
        >
          <AppFormFeilds name='name' placeholder='Your name' />
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
          <AppSubmitButton title='Sign Up' />
        </AppForm>
      </View>

      <Text style={styles.join}>
        Already a member?{' '}
        <Text
          onPress={() => navigation.navigate('Login')}
          style={{ color: colors.primary }}
        >
          Logn In
        </Text>
      </Text>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.Primary,
    justifyContent: 'center',
  },
  wrapper: {
    paddingHorizontal: 20,
    backgroundColor: colors.Primary,
    justifyContent: 'center',
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

export default SignupScreen
