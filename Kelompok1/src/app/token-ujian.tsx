
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
    Alert,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from 'react-native';

export default function TokenUjianScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [token, setToken] = useState(['', '', '', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  const compact = height < 700;
  const horizontalPadding = Math.max(20, Math.min(24, width * 0.075));

  function updateToken(value: string, index: number) {
    const digit = value.replace(/[^0-9a-zA-Z]/g, '').slice(-1);
    const next = [...token];
    next[index] = digit;
    setToken(next);

    if (digit && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  }

  function verifyToken() {
    const enteredToken = token.join('');

    if (enteredToken.length !== 6) {
      Alert.alert(
        'Token belum lengkap',
        'Masukkan seluruh 6 karakter token terlebih dahulu.',
      );
      return;
    }

    Alert.alert(
      'Token siap diverifikasi',
      'Tampilan ini masih berupa prototype. Verifikasi token asli perlu dihubungkan ke sistem CBT.',
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <LinearGradient
        colors={['#D8E8FF', '#F7FAFF', '#DCE9FF']}
        locations={[0, 0.52, 1]}
        style={styles.screen}
      >
        <View style={styles.statusBar}>
          <Text style={styles.time}>09:41</Text>
          <Text style={styles.systemInfo}>Signal  WiFi  Bat</Text>
        </View>

        <View
          style={[
            styles.pageHeader,
            { paddingHorizontal: horizontalPadding },
          ]}
        >
          <Text style={styles.pageTitle}>Token Ujian</Text>
          <Text style={styles.pageSubtitle}>
            Masukkan token dari guru
          </Text>
        </View>

        <View
          style={[
            styles.card,
            {
              marginHorizontal: horizontalPadding,
              marginTop: compact ? 18 : 23,
              paddingTop: compact ? 24 : 29,
              paddingBottom: compact ? 24 : 29,
            },
          ]}
        >
          <View style={styles.keyCircle}>
            <Text style={styles.keyIcon}>⚿</Text>
          </View>

          <Text style={styles.subjectTitle}>Matematika</Text>

          <Text style={styles.description}>
            Token berbeda untuk setiap mata
            {'\n'}pelajaran.
          </Text>

          <View style={styles.tokenRow}>
            {token.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputs.current[index] = ref;
                }}
                value={digit}
                onChangeText={(value) => updateToken(value, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (
                    nativeEvent.key === 'Backspace' &&
                    !token[index] &&
                    index > 0
                  ) {
                    inputs.current[index - 1]?.focus();
                  }
                }}
                onFocus={() => {}}
                autoCapitalize="characters"
                autoCorrect={false}
                keyboardType={
                  Platform.OS === 'web' ? 'default' : 'visible-password'
                }
                maxLength={1}
                selectTextOnFocus
                style={styles.tokenInput}
                selectionColor="#1670FF"
                accessibilityLabel={`Karakter token ${index + 1}`}
              />
            ))}
          </View>
        </View>

        <View
          style={[
            styles.footer,
            { paddingHorizontal: horizontalPadding },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={verifyToken}
            style={styles.buttonTouchable}
          >
            <LinearGradient
              colors={['#1269FF', '#5A9DFA']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.verifyButton}
            >
              <Text style={styles.buttonText}>
                Verifikasi Token
              </Text>
            </LinearGradient>
          </TouchableOpacity>
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
    height: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    },
  time: {
    color: '#142139',
    fontSize: 10,
    fontWeight: '700',
  },
  systemInfo: {
    color: '#142139',
    fontSize: 8,
    fontWeight: '500',
  },
  pageHeader: {
    marginTop: 5,
  },
  pageTitle: {
    color: '#152139',
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  pageSubtitle: {
    color: '#60728E',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 1,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 0,
    shadowColor: '#738BB2',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 9 },
    elevation: 4,
  },
  keyCircle: {
    width: 97,
    height: 97,
    borderRadius: 49,
    backgroundColor: '#EAF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyIcon: {
    color: '#1269FF',
    fontSize: 37,
    lineHeight: 44,
    fontWeight: '400',
  },
  subjectTitle: {
    color: '#151F35',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    letterSpacing: -0.4,
    marginTop: 24,
  },
  description: {
    color: '#5D7190',
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 4,
  },
  tokenRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 12,
    marginTop: 18,
  },
  tokenInput: {
    flex: 1,
    maxWidth: 42,
    minWidth: 0,
    height: 42,
    borderWidth: 1,
    borderColor: '#DCE7FA',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    color: '#176DFF',
    fontSize: 19,
    fontWeight: '700',
    padding: 0,
    shadowColor: '#7186A7',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: '17%',
  },
  buttonTouchable: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#2676FF',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  verifyButton: {
    height: 43,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
