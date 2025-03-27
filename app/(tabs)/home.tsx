import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../supabaseClient";
import LottieView from "lottie-react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [profileUrl, setProfileUrl] = useState(
    "https://xsgames.co/randomusers/avatar.php?g=male"
  );

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData.user) {
        Alert.alert("Not Signed In", "Please sign in to continue.");
        router.replace("/auth/sign-in");
        return;
      }

      const userId = userData.user.id;

      const { data, error } = await supabase
        .from("user_details")
        .select("first_name, last_name")
        .eq("uuid", userId)
        .single();

      if (error || !data) {
        Alert.alert("Error", "Failed to fetch user info.");
      } else {
        setFullName(`${data.first_name} ${data.last_name}`);
      }

      setLoading(false);
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/auth/sign-in");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
   

      <Image source={{ uri: profileUrl }} style={styles.avatar} />

      <Text style={styles.title}>👋 Hello,{fullName || "there"}!</Text>
      <Text style={styles.subtext}>Welcome back! We're glad to see you 🎉</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>🚪 Log Out</Text>
      </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1e1e2f",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
  },
  subtext: {
    fontSize: 16,
    color: "#cfcfcf",
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },
  button: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
});
