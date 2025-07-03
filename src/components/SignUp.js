import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../redux/actions';
import Icon from 'react-native-vector-icons/Ionicons';

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmValid, setConfirmValid] = useState(false);

  const isFormValid = emailValid && passwordValid && confirmValid;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setEmailValid(validateEmail(email));
      setPasswordValid(validatePassword(password));
      setConfirmValid(
        password === confirmPassword && confirmPassword.length > 0,
      );
    }, 800);
    return () => clearTimeout(timeout);
  }, [email, password, confirmPassword]);

  const validateEmail = value => {
    // Matches only username@domain.com (no subdomains, no .com.com)
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.com$/;
    return regex.test(value);
  };

  const validatePassword = value => {
    const hasLength = value.length > 6;
    const hasLetter = /[A-Za-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    return hasLength && hasLetter && hasNumber;
  };

  const handleSignUp = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const alreadyExists = users.find(user => user.email === email);
    if (alreadyExists) {
      Alert.alert('Error', 'User already exists');
      return;
    }

    dispatch(registerUser({username, email, password}));
    Alert.alert('Success', 'Account created successfully!');
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Alex_123"
          placeholderTextColor="#8888"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[
            styles.input,
            emailTouched && !emailValid ? styles.inputError : null,
          ]}
          keyboardType="email-address"
          placeholder="alex@yahoo.com"
          placeholderTextColor="#8888"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setEmailTouched(true)}
          autoCapitalize="none"
        />
        {emailTouched && !emailValid && (
          <Text style={styles.helperText}>Enter a valid email address</Text>
        )}

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[
              styles.inputPass,
              passwordTouched && !passwordValid ? styles.inputError : null,
            ]}
            placeholder="*************"
            placeholderTextColor="#8888"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
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
          <Text style={styles.helperText}>
            Minimum 7 characters, must include letters & numbers
          </Text>
        )}

        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[
              styles.inputPass,
              confirmTouched && !confirmValid ? styles.inputError : null,
            ]}
            placeholder="*************"
            placeholderTextColor="#8888"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={() => setConfirmTouched(true)}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Icon
              name={showConfirmPassword ? 'eye' : 'eye-off'}
              size={22}
              color="#555"
            />
          </TouchableOpacity>
        </View>
        {confirmTouched && !confirmValid && (
          <Text style={styles.helperText}>Passwords do not match</Text>
        )}

        <TouchableHighlight
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
          underlayColor="#370063"
          onPress={handleSignUp}
          disabled={!isFormValid}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableHighlight>

        <Pressable
          onPress={() => navigation.navigate('SignIn')}
          style={styles.press}>
          <Text style={styles.pressText}>
            Already have an account? Sign In!
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  scrollContent: {paddingBottom: 30},
  label: {
    marginLeft: '13%',
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 10,
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
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  inputPass: {
    paddingLeft: 20,
    paddingRight: 50, // add space for eye icon
    height: 55,
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: 'red',
  },
  eyeIcon: {
    position: 'absolute',
    right: 18,
    top: 16,
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

export default SignUp;
