import React, { useEffect, useState } from "react";
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
import { useNotificationsStore } from "../stores/notifications.store";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorIndicator from "../components/ErrorIndicator";
import Toast from "react-native-toast-message";
import { toastConfig } from "../config/ToastConfig";
import { colors } from "../constants/theme";

export default function DocumentsScreen() {
  const { documents, isLoadingDocuments, errorGettingDocuments, refetchDocuments } = useDocumentsStore();

  const { unseenNotificationsCount } = useNotificationsStore();
  const [orderAscending, setOrderAscending] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.CreatedAt);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.List);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { shareDocument } = useShareDocument();
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const toggleOrder = () => setOrderAscending(!orderAscending);

  const sortedDocuments = useSortedDocuments({ documents, sortBy, orderAscending })

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetchDocuments();
    setIsRefreshing(false);
  };

  const renderContent = () => {
    if (isLoadingDocuments) {
      return <LoadingIndicator message="Loading documents..." />
    }

    if (isLoadingDocuments) {
      return <ErrorIndicator message={`Error: ${errorGettingDocuments?.message}`} />
    }

    return (

      <FlatList
        key={viewMode}
        bounces={true}
        data={sortedDocuments}
        keyExtractor={(item) => item.ID}
        numColumns={viewMode === ViewMode.Grid ? 2 : 1}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) =>
          viewMode === ViewMode.List ? (
            <DocumentCardDetails document={item} handleShareDocument={shareDocument} />
          ) : (
            <DocumentCardSimple document={item} />
          )
        }
      />
    )
  }

  return (
    <View style={styles.container}>
      <Header title="Documents" notifications={unseenNotificationsCount} goToNotifications={() => { router.push('/notifications') }} />
      <View style={styles.controls}>
        <SortByPicker onSelect={setSortBy} onToggleOrder={toggleOrder} orderAscending={orderAscending} />
        <ViewModeSelector viewMode={viewMode} onChangeViewMode={setViewMode} />
      </View>
      {renderContent()}
      <BlockButton text="Add document" iconType={IconType.Add} handlePress={toggleModal} />
      <AddDocumentModal onAddDocument={(file) => { console.log('Selected file:', { file }) }} onClose={toggleModal} visible={showModal} />
      <Toast config={toastConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});

