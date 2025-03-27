import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../supabaseClient'; // Adjust if your file path is different

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const colorScheme = useColorScheme();

  const validateInput = () => {
    const emailValid = email.includes('@');
    const passwordValid = password.length >= 6;

    if (!emailValid) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return false;
    }
    if (!passwordValid) {
      Alert.alert('Error', 'Password must be at least 6 characters.');
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    if (!validateInput()) return;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert('Sign In Failed', error.message);
    } else {
      router.replace('/home'); // Redirect to your landing screen
    }
  };

  return (
    <View style={colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer}>
      <Text style={colorScheme === 'dark' ? styles.darkTitle : styles.lightTitle}>Sign In</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor={colorScheme === 'dark' ? 'lightgray' : 'gray'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={colorScheme === 'dark' ? styles.darkInput : styles.lightInput}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={colorScheme === 'dark' ? 'lightgray' : 'gray'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={colorScheme === 'dark' ? styles.darkInput : styles.lightInput}
      />

      <Button title="Sign In" onPress={handleSignIn} color={colorScheme === 'dark' ? '#ffcc00' : '#007bff'} />

      <View style={{ marginTop: 10 }}>
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => router.replace('/auth/sign-up')}
          color={colorScheme === 'dark' ? '#aaa' : '#444'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  darkContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  lightTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  darkTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  lightInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black',
  },
  darkInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#333',
    color: 'white',
  },
});
