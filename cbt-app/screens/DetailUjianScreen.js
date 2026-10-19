import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Modal,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function DetailUjianScreen({ navigation }) {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let interval;
    if (downloadModalVisible && !isSuccess) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsSuccess(true);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [downloadModalVisible, isSuccess]);

  const handleOpenModal = () => setConfirmModalVisible(true);

  const handleStartDownload = () => {
    setConfirmModalVisible(false);
    setIsSuccess(false);
    setProgress(0);
    setDownloadModalVisible(true);
  };

  const handleFinish = () => setDownloadModalVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Detail Ujian</Text>
          <Text style={styles.subtitle}>Cek informasi sebelum mulai</Text>
        </View>

        <View style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="document-text" size={32} color="#2563eb" />
            </View>
            <View style={styles.cardHeaderTitle}>
              <Text style={styles.subjectTitle}>Matematika</Text>
              <Text style={styles.subjectInfo}>40 soal • 90 menit</Text>
            </View>
          </View>

          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>BELUM DOWNLOAD</Text>
            </View>
          </View>

          <Text style={styles.cardDescription}>
            Ujian hanya dapat dimulai setelah soal tersimpan offline dan token valid.
          </Text>
        </View>

        <View style={styles.rulesContainer}>
          <View style={styles.ruleCard}>
            <View style={styles.checkIcon}>
              <Ionicons name="checkmark" size={16} color="#16a34a" />
            </View>
            <Text style={styles.ruleText}>Dikerjakan offline</Text>
          </View>

          <View style={styles.ruleCard}>
            <View style={styles.checkIcon}>
              <Ionicons name="checkmark" size={16} color="#16a34a" />
            </View>
            <Text style={styles.ruleText}>Tidak bisa keluar aplikasi saat ujian</Text>
          </View>

          <View style={styles.ruleCard}>
            <View style={styles.checkIcon}>
              <Ionicons name="checkmark" size={16} color="#16a34a" />
            </View>
            <Text style={styles.ruleText}>Internet akan terdeteksi sistem</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.downloadButton} onPress={handleOpenModal} activeOpacity={0.8}>
          <Text style={styles.downloadButtonText}>Download Soal</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal 1: Konfirmasi */}
      <Modal animationType="fade" transparent={true} visible={confirmModalVisible} onRequestClose={() => setConfirmModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconCircle}>
              <Feather name="download" size={32} color="#2563eb" />
            </View>
            <Text style={styles.modalTitle}>Download Soal?</Text>
            <Text style={styles.modalDescription}>Pastikan koneksi stabil. Setelah selesai, soal bisa dikerjakan offline.</Text>
            <TouchableOpacity style={styles.modalDownloadBtn} onPress={handleStartDownload} activeOpacity={0.8}>
              <Text style={styles.modalDownloadText}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setConfirmModalVisible(false)} activeOpacity={0.7}>
              <Text style={styles.modalCancelText}>Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal 2: Progress & Success */}
      <Modal animationType="fade" transparent={true} visible={downloadModalVisible} onRequestClose={() => {}}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.progressHeaderTitle}>Download Soal</Text>
            <Text style={styles.progressHeaderSubtitle}>Simpan soal agar bisa offline</Text>
            <View style={styles.progressInnerCard}>
              <View style={[styles.progressIconCircle, isSuccess && styles.successIconCircle]}>
                {isSuccess ? <Ionicons name="checkmark" size={36} color="#16a34a" /> : <Feather name="download" size={32} color="#2563eb" />}
              </View>
              <Text style={styles.progressStatusTitle}>{isSuccess ? 'Download Selesai' : 'Mengunduh Soal'}</Text>
              <Text style={styles.progressStatusInfo}>Matematika • 12.4 MB • Paket terenkripsi</Text>
              <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: `${progress}%` }, isSuccess && styles.progressBarSuccessFill]} />
              </View>
              <Text style={[styles.progressPercentageText, isSuccess && styles.successPercentageText]}>{progress}%</Text>
            </View>
            {isSuccess ? (
              <TouchableOpacity style={styles.continueButton} onPress={handleFinish} activeOpacity={0.8}>
                <Text style={styles.continueButtonText}>Lanjutkan</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.warningText}>Jangan tutup aplikasi selama proses download.</Text>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eff6ff' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 },
  header: { marginBottom: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#0f172a' },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 4 },
  mainCard: { backgroundColor: '#ffffff', borderRadius: 24, padding: 20, marginBottom: 20, elevation: 3 },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#dbeafe', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  cardHeaderTitle: { flex: 1 },
  subjectTitle: { fontSize: 22, fontWeight: 'bold', color: '#0f172a' },
  subjectInfo: { fontSize: 14, color: '#64748b', marginTop: 2 },
  badgeContainer: { alignItems: 'flex-start', marginTop: 12 },
  badge: { backgroundColor: '#fef3c7', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20 },
  badgeText: { color: '#d97706', fontSize: 12, fontWeight: 'bold' },
  cardDescription: { fontSize: 13, color: '#64748b', marginTop: 14, lineHeight: 18 },
  rulesContainer: { gap: 12, marginBottom: 30 },
  ruleCard: { backgroundColor: '#ffffff', borderRadius: 18, paddingVertical: 16, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  checkIcon: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#dcfce7', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  ruleText: { fontSize: 14, fontWeight: '600', color: '#1e293b', flex: 1 },
  downloadButton: { backgroundColor: '#3b82f6', borderRadius: 16, paddingVertical: 16, alignItems: 'center', elevation: 4 },
  downloadButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.45)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  modalCard: { width: '100%', backgroundColor: '#eff6ff', borderRadius: 28, padding: 24, alignItems: 'center' },
  modalIconCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#0f172a', marginBottom: 8 },
  modalDescription: { fontSize: 14, color: '#64748b', textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  modalDownloadBtn: { width: '100%', backgroundColor: '#3b82f6', borderRadius: 16, paddingVertical: 14, alignItems: 'center', marginBottom: 10 },
  modalDownloadText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  modalCancelBtn: { width: '100%', backgroundColor: '#ffffff', borderRadius: 16, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  modalCancelText: { color: '#2563eb', fontSize: 16, fontWeight: '600' },
  progressHeaderTitle: { fontSize: 24, fontWeight: 'bold', color: '#0f172a', alignSelf: 'flex-start' },
  progressHeaderSubtitle: { fontSize: 14, color: '#64748b', alignSelf: 'flex-start', marginBottom: 20 },
  progressInnerCard: { width: '100%', backgroundColor: '#ffffff', borderRadius: 24, paddingVertical: 28, paddingHorizontal: 20, alignItems: 'center', marginBottom: 20 },
  progressIconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#eff6ff', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  successIconCircle: { backgroundColor: '#dcfce7' },
  progressStatusTitle: { fontSize: 22, fontWeight: 'bold', color: '#0f172a', marginBottom: 6 },
  progressStatusInfo: { fontSize: 13, color: '#64748b', textAlign: 'center', marginBottom: 20 },
  progressBarBackground: { width: '100%', height: 10, backgroundColor: '#e2e8f0', borderRadius: 5, overflow: 'hidden', marginBottom: 10 },
  progressBarFill: { height: '100%', backgroundColor: '#2563eb', borderRadius: 5 },
  progressBarSuccessFill: { backgroundColor: '#16a34a' },
  progressPercentageText: { fontSize: 14, fontWeight: 'bold', color: '#2563eb' },
  successPercentageText: { color: '#16a34a' },
  warningText: { fontSize: 13, color: '#64748b', textAlign: 'center', paddingHorizontal: 20 },
  continueButton: { width: '100%', backgroundColor: '#2563eb', borderRadius: 16, paddingVertical: 16, alignItems: 'center', elevation: 3 },
  continueButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});