import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import { EyeClosed, Eye } from "phosphor-react-native";
import AppErrorMessage from './AppErrorMessage'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import colors from '../../utils/colors'

export default function AppFormFeilds({ name, password = false, ...otherProps }) {
  const [showPassword, setShowPassword] = useState(password)
  const { setFieldTouched, handleChange, errors, touched, values } = useFormikContext()

  return (
    <View style={styles.container}>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        {...otherProps}
        style={[styles.input, (touched[name] && errors[name]) && { borderColor: colors.Danger }]}
        secureTextEntry={showPassword}
        value={values[name]}
      />
      {password && (
        <TouchableOpacity style={styles.icon} onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <EyeClosed color="#AE2983" weight="regular" size={24} />
          ) : (
            <Eye color="#AE2983" weight="regular" size={24} />
          )}
        </TouchableOpacity>
      )}
      <AppErrorMessage visible={touched[name]} error={errors[name]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    borderColor: colors.medium,
    backgroundColor: colors.Background,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 15
  },
  inputError: {
    borderColor: colors.Danger
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: 32
  }
})
