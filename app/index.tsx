import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Header from "../components/Header";
import { DocumentCardDetails } from "../components/DocumentCardDetails";
import { DocumentCardSimple } from "../components/DocumentCardSimple";
import SortByPicker from "../components/SortByPicker";
import { SortOption, ViewMode } from "../types/IDocument";
import ViewModeSelector from "../components/ViewModeSelector";
import { useSortedDocuments } from "../hooks/useSortedDocuments";
import BlockButton, { IconType } from "../components/BlockButton";
import AddDocumentModal from "../components/AddDocumentModal";
import { useShareDocument } from "../hooks/useShareDocument";
import { useRouter } from "expo-router";
import { useDocumentsStore } from "../stores/documents.store";
import { useNotifications } from "../stores/notifications.store";

export default function DocumentsScreen() {
  const { documents } = useDocumentsStore();
  const { unseenNotificationsCount } = useNotifications();
  const [orderAscending, setOrderAscending] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.Name);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.List);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { shareDocument } = useShareDocument();
  const router = useRouter();

  const toggleOrder = () => setOrderAscending(!orderAscending);

  const sortedDocuments = useSortedDocuments({ documents, sortBy, orderAscending })

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <View style={styles.container}>
      <Header title="Documents" notifications={unseenNotificationsCount} goToNotifications={() => { router.push('/notifications') }} />
      <View style={styles.controls}>
        <SortByPicker onSelect={setSortBy} onToggleOrder={toggleOrder} orderAscending={orderAscending} />
        <ViewModeSelector viewMode={viewMode} onChangeViewMode={setViewMode} />
      </View>
      <FlatList
        key={viewMode}
        bounces={false}
        data={sortedDocuments}
        keyExtractor={(item) => item.ID}
        numColumns={viewMode === ViewMode.Grid ? 2 : 1}
        renderItem={({ item }) =>
          viewMode === ViewMode.List ? (
            <DocumentCardDetails document={item} handleShareDocument={shareDocument} />
          ) : (
            <DocumentCardSimple document={item} />
          )
        }
      />
      <BlockButton text="Add document" iconType={IconType.Add} handlePress={toggleModal} />
      <AddDocumentModal onAddDocument={(file) => { console.log('se selecciona esto', { file }) }} onClose={toggleModal} visible={showModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA"
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});

