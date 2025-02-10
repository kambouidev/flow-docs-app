import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Header from "../components/Header";
import { DocumentCardDetails } from "../components/DocumentCardDetails";
import { DocumentCardSimple } from "../components/DocumentCardSimple";



export default function DocumentsScreen() {
  const documents = [
    {
      id: "1",
      title: "Hop Rod Rye",
      version: "2.6.16",
      contributors: ["Carlie Abbott", "Zoe Buckridge", "Carmen Kohler", "Americo Comier"],
      attachments: ["Light Lager", "Porter", "Sour Ale", "German Wheat"],
    },
    {
      id: "2",
      title: "Stone IPA",
      version: "3.8.11",
      contributors: ["Lencra Boyer", "Sherman Hauck"],
      attachments: ["Stout", "Light Hybrid", "Beer"],
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="Documents" />
      <View style={{ flex: 1 }} >
        <FlatList
          bounces={false}
          data={documents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <DocumentCardDetails {...item} />}
        />
      </View>
      <View style={{ flex: 1 }} >
        <FlatList
          bounces={false}
          data={documents}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => <DocumentCardSimple {...item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA"
  },
});
