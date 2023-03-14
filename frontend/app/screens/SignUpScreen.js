import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import { Text } from 'react-native-paper'
// import Background from '../components/Background'
// import Logo from '../components/Logo'
// import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
// import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { confirmPasswordValidator } from '../helpers/confirmPasswordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { signup } from '../service' //import the service
import { IconButton } from 'react-native-paper';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })
  const [errorMessage, setErrorMessage] = useState()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSignUpPressed = async () => {
    const nameError = nameValidator(username.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const confirmPasswordError = confirmPasswordValidator(confirmPassword.value, password.value)
    if (emailError || passwordError || nameError || confirmPasswordError) {
      setUsername({ ...username, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setConfirmPassword({ ...confirmPassword, error: confirmPasswordError })
      return
    }
    try {
      const response = await signup({
        username: username.value,
        email: email.value,
        password: password.value
      });

      if (response.status === 201) {
        alert("Signup success!");
        setErrorMessage("");
        // navigate to the login screen or the intended screen
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      } else {
        alert("Signup failed!");
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage("can't signup? make sure don't have an account already!");
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.jpg')} style={styles.image} />
      <TextInput
        label="Name"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: '' })}
        error={!!username.error}
        errorText={username.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry={!showPassword}
        />
        <IconButton
          style={{ marginLeft: -35, zIndex: 1 }}
          icon={showPassword ? 'eye' : 'eye-off'}
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          label="Confirm Password"
          returnKeyType="done"
          value={confirmPassword.value}
          onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
          error={!!confirmPassword.error}
          errorText={confirmPassword.error}
          secureTextEntry={!showConfirmPassword}
        />
        <IconButton
          style={{ marginLeft: -35, zIndex: 1 }}
          icon={showConfirmPassword ? 'eye' : 'eye-off'}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      </View>
      {errorMessage ? <Text style={styles.loginError}>{errorMessage}</Text> : null}
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login', { name: 'Login' })}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'plum',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPassword: {
    width: '90%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  loginError: {
    fontSize: 15,
    marginBottom: '3%',
    color: 'red'
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  row: {
    padding: 20,
    alignContent: "center",
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    marginTop: 4,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  wrapper: {
    borderColor: 'grey',
    borderWidth: 5,
  }
});