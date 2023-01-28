import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import { Text } from 'react-native-paper'
// import Background from '../components/Background'
// import Logo from '../components/Logo'
// import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { login } from '../service' //import the service

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [errorMessage, setErrorMessage] = useState()

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    try {
      const response = await login({ email: email.value, password: password.value });
      if (response.status === 200) {
          alert("login success!")
          setErrorMessage("")
          // navigate to the dashboard or the intended screen
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
      } else {
          alert("login failed!")
      }
  } catch (error) {
      console.log(error.message)
      setErrorMessage("can't login, please check your credentials!")
  }
}
  return (
    <View style={styles.container}>
        {/* <View style={styles.wrapper}> */}
      {/* <BackButton goBack={navigation.goBack} /> */}
      {/* <Logo /> */}
      {/* <Header>Welcome back.</Header> */}
      <Image source={require('../assets/logo.jpg')} style={styles.image} />
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
        // keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      {errorMessage ? <Text style={styles.loginError}>{errorMessage}</Text> : null}
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() =>navigation.navigate('SignUp', { name: 'SignUp' })}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
    // </View>
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
      marginBottom:'3%',
      color: 'red'
    },
    link: {
      fontWeight: 'bold',
      color: theme.colors.primary,
      },
    row: {
      padding:20,
      alignContent:"center", 
      justifyContent: 'center',
      textAlign: 'center',
      flexDirection: 'row',
      marginTop: 4,
    },
    image: {
        width: 120,
        height: 120,
        marginBottom: 40,
      },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    wrapper: {
        borderColor: 'grey',
        borderWidth: 5, 
    }
  });