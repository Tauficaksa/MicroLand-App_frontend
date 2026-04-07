import React, { useState } from "react";
import { SafeAreaView, StatusBar, View, Text, TouchableOpacity } from "react-native";

import ChatScreen from "./screens/ChatScreen";
import AppointmentsScreen from "./screens/AppointmentsScreen";
import MedicationsScreen from "./screens/MedicationsScreen";
import HistoryScreen from "./screens/HistoryScreen";
import InsightsScreen from "./screens/InsightsScreen";

export default function App() {
  const [tab, setTab] = useState("chat");

  const tabs = ["chat", "appointments", "medications", "history", "insights"];

  const renderScreen = () => {
    if (tab === "appointments") return <AppointmentsScreen />;
    if (tab === "medications") return <MedicationsScreen />;
    if (tab === "history") return <HistoryScreen />;
    if (tab === "insights") return <InsightsScreen />;
    return <ChatScreen />;
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0, backgroundColor: "#fff" }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", padding: 10, gap: 8 }}>
        {tabs.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setTab(item)}
            style={{
              backgroundColor: tab === item ? "#0f62fe" : "#e9eefc",
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20
            }}
          >
            <Text style={{ color: tab === item ? "#fff" : "#17324d", fontWeight: "600", textTransform: "capitalize" }}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>
    </SafeAreaView>
  );
}