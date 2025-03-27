import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../supabaseClient";

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");

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
      <Text style={styles.title}>Welcome, {fullName}!</Text>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
  },
});
