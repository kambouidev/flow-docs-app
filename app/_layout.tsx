import { Stack } from "expo-router";
import { Provider } from "jotai";
import { SafeAreaView, StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Provider>
        <Stack screenOptions={{ headerShown: false }} />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
