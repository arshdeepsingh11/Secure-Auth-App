import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../supabaseClient'; // adjust if your path is different

export default function SignUpScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert('Sign Up Failed', error.message);
      return;
    }

    const userId = data.session?.user.id;

    if (!userId) {
      Alert.alert('Error', 'No user ID found after sign-up.');
      return;
    }

    const { error: insertError } = await supabase.from('user_details').insert([
      {
        uuid: userId,
        first_name: firstName,
        last_name: lastName,
        email: email,
      },
    ]);

    if (insertError) {
      Alert.alert('Database Error', insertError.message);
    } else {
      Alert.alert('Success', 'Account created!');
      router.replace('/home');
    }
  };

  return (
    <View style={colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer}>
      <Text style={colorScheme === 'dark' ? styles.darkTitle : styles.lightTitle}>Create an Account</Text>

      <TextInput
        placeholder="First Name"
        placeholderTextColor={colorScheme === 'dark' ? 'lightgray' : 'gray'}
        value={firstName}
        onChangeText={setFirstName}
        style={colorScheme === 'dark' ? styles.darkInput : styles.lightInput}
      />

      <TextInput
        placeholder="Last Name"
        placeholderTextColor={colorScheme === 'dark' ? 'lightgray' : 'gray'}
        value={lastName}
        onChangeText={setLastName}
        style={colorScheme === 'dark' ? styles.darkInput : styles.lightInput}
      />

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

      <Button title="Sign Up" onPress={handleSignUp} color={colorScheme === 'dark' ? '#ffcc00' : '#007bff'} />

      <View style={{ marginTop: 10 }}>
        <Button
          title="Already have an account? Sign In"
          onPress={() => router.replace('/auth/sign-in')}
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
