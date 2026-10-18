import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

const checks = [
  'Soal tersimpan offline',
  'Baterai cukup',
  'Mode aman siap diaktifkan',
];

const menuItems = [
  { icon: '⌂', label: 'Home' },
  { icon: '▤', label: 'Ujian' },
  { icon: '☑', label: 'Tugas' },
  { icon: '▥', label: 'Nilai' },
  { icon: '♙', label: 'Profil' },
];

export default function DetailUjianScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <LinearGradient
        colors={['#D8E8FF', '#F5F9FF', '#DCE9FF']}
        locations={[0, 0.52, 1]}
        style={styles.screen}
      >
        <View style={styles.statusBar}>
          <Text style={styles.time}>09:41</Text>
          <Text style={styles.systemInfo}>Signal  WiFi  Bat</Text>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Detail Ujian</Text>
            <Text style={styles.subtitle}>
              Soal sudah siap offline
            </Text>
          </View>

          <View style={styles.subjectCard}>
            <View style={styles.subjectTop}>
              <LinearGradient
                colors={['#1670FF', '#5CA0FF']}
                style={styles.subjectIcon}
              >
                <Text style={styles.bookIcon}>▤</Text>
              </LinearGradient>

              <View style={styles.subjectInfo}>
                <Text style={styles.subjectTitle}>
                  Matematika
                </Text>

                <Text style={styles.subjectMeta}>
                  40 soal • 90 menit
                </Text>

                <View style={styles.readyBadge}>
                  <Text style={styles.readyText}>
                    OFFLINE READY
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.description}>
              Ujian hanya dapat dimulai setelah soal
              tersimpan offline dan token valid.
            </Text>
          </View>

          <View style={styles.checkList}>
            {checks.map((item) => (
              <View style={styles.checkItem} key={item}>
                <View style={styles.checkCircle}>
                  <Text style={styles.checkMark}>✓</Text>
                </View>

                <Text style={styles.checkLabel}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.bottomArea}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push('/token-ujian')}
            style={styles.buttonTouchable}
          >
            <LinearGradient
              colors={['#1269FF', '#5A9DFA']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>
                Masukkan Token
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.bottomNav}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.label}
                activeOpacity={0.7}
                style={styles.navItem}
              >
                <View
                  style={[
                    styles.navIconContainer,
                    index === 0 && styles.activeNavContainer,
                  ]}
                >
                  <Text
                    style={[
                      styles.navIcon,
                      index === 0 && styles.activeNavText,
                    ]}
                  >
                    {item.icon}
                  </Text>
                </View>

                {index === 0 && (
                  <Text style={styles.navLabel}>
                    {item.label}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAF3FF',
  },
  screen: {
    flex: 1,
    width: '100%',
    maxWidth: 430,
    alignSelf: 'center',
    borderRadius: 30,
    overflow: 'hidden',
  },
  statusBar: {
    height: 35,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    color: '#142139',
    fontSize: 11,
    fontWeight: '600',
  },
  systemInfo: {
    color: '#142139',
    fontSize: 9,
    fontWeight: '500',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    marginTop: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '800',
    color: '#152139',
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 18,
    color: '#60728E',
    marginTop: 1,
  },
  subjectCard: {
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 29,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
    minHeight: 148,
    marginBottom: 27,
    shadowColor: '#738BB2',
    shadowOpacity: 0.12,
    shadowRadius: 17,
    shadowOffset: { width: 0, height: 9 },
    elevation: 4,
  },
  subjectTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 17,
  },
  subjectIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookIcon: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '500',
  },
  subjectInfo: {
    flex: 1,
    minWidth: 0,
  },
  subjectTitle: {
    color: '#172139',
    fontSize: 22,
    lineHeight: 27,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subjectMeta: {
    color: '#5D7190',
    fontSize: 12,
    lineHeight: 16,
    marginTop: 3,
  },
  readyBadge: {
    backgroundColor: '#E6F9EE',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 26,
    width: 119,
    marginTop: 9,
  },
  readyText: {
    color: '#0BAE59',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  description: {
    color: '#5B6E8B',
    fontSize: 11,
    lineHeight: 15,
    marginTop: 3,
  },
  checkList: {
    gap: 12,
  },
  checkItem: {
    backgroundColor: 'rgba(255,255,255,0.93)',
    borderRadius: 19,
    height: 48,
    paddingHorizontal: 19,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#7E94B5',
    shadowOpacity: 0.09,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E4F9ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  checkMark: {
    color: '#0CC66A',
    fontSize: 15,
    fontWeight: '800',
  },
  checkLabel: {
    color: '#1C2940',
    fontSize: 12,
    fontWeight: '700',
  },
  bottomArea: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 19,
  },
  buttonTouchable: {
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 9,
    marginBottom: 64,
    shadowColor: '#2676FF',
    shadowOpacity: 0.2,
    shadowRadius: 13,
    shadowOffset: { width: 0, height: 7 },
    elevation: 5,
  },
  primaryButton: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  bottomNav: {
    height: 46,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E3EBF7',
    backgroundColor: 'rgba(255,255,255,0.95)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  navItem: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconContainer: {
    minWidth: 34,
    height: 34,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNavContainer: {
    backgroundColor: '#EAF2FF',
  },
  navIcon: {
    fontSize: 18,
    color: '#8A9DB9',
  },
  activeNavText: {
    color: '#1975FF',
  },
  navLabel: {
    color: '#1975FF',
    fontSize: 8,
    marginTop: -3,
  },
});
