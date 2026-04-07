import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import ChatScreen from "./screens/ChatScreen";
import AppointmentsScreen from "./screens/AppointmentsScreen";
import MedicationsScreen from "./screens/MedicationsScreen";
import HistoryScreen from "./screens/HistoryScreen";
import InsightsScreen from "./screens/InsightsScreen";

export default function App() {
  const [tab, setTab] = useState("chat");
  const insets = useSafeAreaInsets();

  const tabs = [
    { key: "chat", label: "Chat" },
    { key: "appointments", label: "Appointments" },
    { key: "medications", label: "Meds" },
    { key: "history", label: "History" },
    { key: "insights", label: "Insights" }
  ];

  const renderScreen = () => {
    if (tab === "appointments") return <AppointmentsScreen />;
    if (tab === "medications") return <MedicationsScreen />;
    if (tab === "history") return <HistoryScreen />;
    if (tab === "insights") return <InsightsScreen />;
    return <ChatScreen />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Main Content */}
      <View style={styles.content}>
        {renderScreen()}
      </View>

      {/* Bottom Navigation */}
      <View style={[styles.navBar, { paddingBottom: insets.bottom }]}>
        {tabs.map((item) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => setTab(item.key)}
            style={styles.navItem}
          >
            <Text
              style={[
                styles.navText,
                tab === item.key && styles.activeText
              ]}
            >
              {item.label}
            </Text>

            {tab === item.key && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc"
  },

  content: {
    flex: 1,
    padding: 10
  },

  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 10,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    elevation: 10
  },

  navItem: {
    alignItems: "center"
  },

  navText: {
    color: "#777",
    fontSize: 13,
    fontWeight: "500"
  },

  activeText: {
    color: "#0f62fe",
    fontWeight: "700"
  },

  activeIndicator: {
    marginTop: 4,
    height: 3,
    width: 20,
    backgroundColor: "#0f62fe",
    borderRadius: 2
  }
});