import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Provider } from "jotai";
import { SafeAreaView, StyleSheet } from "react-native";
import { WebSocketProvider } from "../contexts/WebSocketContext";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <WebSocketProvider>
          <SafeAreaView style={styles.safeArea}>
            <Stack screenOptions={{ headerShown: false }} />
          </SafeAreaView>
        </WebSocketProvider>
      </Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
