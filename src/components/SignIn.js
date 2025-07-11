import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../redux/userSlice'; // ✅ Updated import
import Icon from 'react-native-vector-icons/Ionicons';

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users); // ✅ Updated selector

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setEmailValid(validateEmail(email));
      setPasswordValid(validatePassword(password));
    }, 800);
    return () => clearTimeout(delay);
  }, [email, password]);

  useEffect(() => {
    setIsFormValid(emailValid && passwordValid);
  }, [emailValid, passwordValid]);

  const validateEmail = value => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value);
  };

  const validatePassword = value => {
    return value.trim().length > 0;
  };

  const handleSignIn = () => {
    if (!isFormValid) return;

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      Alert.alert('Error', 'Invalid credentials');
      return;
    }
    dispatch(loginUser(user)); // ✅ Using Redux Toolkit action
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.inputEmail}>Email</Text>
      <TextInput
        style={[
          styles.input,
          emailTouched && !emailValid ? styles.inputError : null,
        ]}
        inputMode="email"
        autoCapitalize="none"
        placeholder="Alex@yahoo.com"
        placeholderTextColor="#8888"
        value={email}
        onChangeText={text => setEmail(text)}
        onFocus={() => setEmailTouched(true)}
      />
      {emailTouched && !emailValid && (
        <Text style={styles.helperText}>Enter a valid email address</Text>
      )}

      <Text style={styles.inputPass}>Password</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.inputPassField,
            passwordTouched && !passwordValid ? styles.inputError : null,
          ]}
          placeholder="*************"
          placeholderTextColor="#8888"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={text => setPassword(text)}
          onFocus={() => setPasswordTouched(true)}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye' : 'eye-off'}
            size={22}
            color="#555"
          />
        </TouchableOpacity>
      </View>
      {passwordTouched && !passwordValid && (
        <Text style={styles.helperText}>Password is required</Text>
      )}

      <TouchableHighlight
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        underlayColor="#370063"
        onPress={handleSignIn}
        disabled={!isFormValid}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableHighlight>

      <Pressable
        onPress={() => navigation.navigate('SignUp')}
        style={styles.press}>
        <Text style={styles.pressText}>Don't have an account? Sign Up!</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  inputEmail: {
    marginLeft: '13%',
    fontWeight: '500',
    marginTop: '15%',
    marginBottom: 20,
    fontSize: 20,
  },
  inputPass: {
    marginLeft: '13%',
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
  },
  inputWrapper: {
    width: '75%',
    alignSelf: 'center',
    position: 'relative',
  },
  input: {
    paddingLeft: 20,
    height: 55,
    width: '75%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 50,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  inputPassField: {
    paddingLeft: 20,
    paddingRight: 50,
    height: 55,
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    position: 'absolute',
    right: 18,
    top: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  helperText: {
    color: 'red',
    marginTop: -8,
    marginBottom: 8,
    marginLeft: '13%',
    fontSize: 13,
  },
  button: {
    height: 55,
    width: '75%',
    marginTop: 20,
    backgroundColor: '#4B0082',
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  press: {alignSelf: 'center', margin: 25},
  pressText: {fontWeight: '200', color: '#4B0082'},
});

export default SignIn;
