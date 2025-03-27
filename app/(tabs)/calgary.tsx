import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';

export default function CalgaryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Calgary!</Text>
      <Image source={require('../../assets/images/calgary.jpg')} style={styles.image} />
      <Text style={styles.description}>
        Calgary is famous for its Stampede, Rocky Mountain views, and oil industry.
      </Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.calgary.ca/home.html')}>
        <Text style={styles.link}>Go to City Page</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 , color: 'grey' },
  image: { width: 300, height: 200, marginBottom: 10, borderRadius: 10 },
  description: { fontSize: 16, textAlign: 'center', color: 'gray', marginBottom: 10 },
  link: { color: 'blue', textDecorationLine: 'underline', fontSize: 18, marginTop: 10 }
});
