import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useAppDispatch} from '../../store/hooks';
import {
  clearAuthAndLogout,
  clearKeychainOnly,
  checkKeychainAuth,
  getStoredUserData,
} from '../../utils/auth';
import {UI_CONFIG} from '../../config';

interface DebugMenuProps {
  visible: boolean;
  onClose: () => void;
}

const DebugMenu: React.FC<DebugMenuProps> = ({visible, onClose}) => {
  const dispatch = useAppDispatch();
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [loading, setLoading] = useState<string>('');

  const handleClearAuthAndLogout = async () => {
    setLoading('logout');
    try {
      await clearAuthAndLogout(dispatch);
      setDebugInfo('✅ Auth cleared and logged out successfully');
    } catch (error) {
      setDebugInfo(`❌ Error: ${error}`);
    } finally {
      setLoading('');
    }
  };

  const handleClearKeychainOnly = async () => {
    setLoading('keychain');
    try {
      await clearKeychainOnly();
      setDebugInfo('✅ Keychain cleared successfully');
    } catch (error) {
      setDebugInfo(`❌ Error: ${error}`);
    } finally {
      setLoading('');
    }
  };

  const handleCheckAuth = async () => {
    setLoading('check');
    try {
      const isAuth = await checkKeychainAuth();
      setDebugInfo(
        `🔍 Auth check: ${isAuth ? 'Authenticated' : 'Not authenticated'}`,
      );
    } catch (error) {
      setDebugInfo(`❌ Error: ${error}`);
    } finally {
      setLoading('');
    }
  };

  const handleGetUserData = async () => {
    setLoading('userdata');
    try {
      const userData = await getStoredUserData();
      setDebugInfo(`👤 User data: ${JSON.stringify(userData, null, 2)}`);
    } catch (error) {
      setDebugInfo(`❌ Error: ${error}`);
    } finally {
      setLoading('');
    }
  };

  const renderButton = (
    action: () => Promise<void>,
    text: string,
    loadingKey: string,
  ) => (
    <TouchableOpacity
      style={[styles.button, loading === loadingKey && styles.buttonDisabled]}
      onPress={action}
      disabled={loading !== ''}>
      {loading === loadingKey ? (
        <ActivityIndicator color={UI_CONFIG.COLORS.SURFACE} size="small" />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Debug Menu</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            {renderButton(
              handleClearAuthAndLogout,
              'Clear Auth & Logout',
              'logout',
            )}
            {renderButton(
              handleClearKeychainOnly,
              'Clear Keychain Only',
              'keychain',
            )}
            {renderButton(handleCheckAuth, 'Check Auth Status', 'check')}
            {renderButton(handleGetUserData, 'Get User Data', 'userdata')}
          </View>

          {debugInfo ? (
            <ScrollView style={styles.debugInfoContainer}>
              <Text style={styles.debugTitle}>Debug Info:</Text>
              <Text style={styles.debugText}>{debugInfo}</Text>
            </ScrollView>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: UI_CONFIG.COLORS.SURFACE,
    borderRadius: UI_CONFIG.BORDER_RADIUS.LG,
    width: '100%',
    maxHeight: '80%',
    padding: UI_CONFIG.SPACING.LG,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: UI_CONFIG.SPACING.LG,
    borderBottomWidth: 1,
    borderBottomColor: UI_CONFIG.COLORS.BACKGROUND,
    paddingBottom: UI_CONFIG.SPACING.SM,
  },
  title: {
    fontSize: UI_CONFIG.FONT_SIZES.XL,
    fontWeight: 'bold',
    color: UI_CONFIG.COLORS.TEXT.PRIMARY,
  },
  closeButton: {
    padding: UI_CONFIG.SPACING.XS,
    backgroundColor: UI_CONFIG.COLORS.ERROR,
    borderRadius: UI_CONFIG.BORDER_RADIUS.SM,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: UI_CONFIG.FONT_SIZES.MD,
    color: UI_CONFIG.COLORS.SURFACE,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginBottom: UI_CONFIG.SPACING.MD,
  },
  button: {
    backgroundColor: UI_CONFIG.COLORS.PRIMARY,
    padding: UI_CONFIG.SPACING.MD,
    borderRadius: UI_CONFIG.BORDER_RADIUS.MD,
    marginBottom: UI_CONFIG.SPACING.SM,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: UI_CONFIG.COLORS.SURFACE,
    fontSize: UI_CONFIG.FONT_SIZES.MD,
    fontWeight: '600',
    textAlign: 'center',
  },
  debugInfoContainer: {
    backgroundColor: UI_CONFIG.COLORS.BACKGROUND,
    padding: UI_CONFIG.SPACING.MD,
    borderRadius: UI_CONFIG.BORDER_RADIUS.MD,
    maxHeight: 200,
  },
  debugTitle: {
    fontSize: UI_CONFIG.FONT_SIZES.MD,
    fontWeight: 'bold',
    color: UI_CONFIG.COLORS.TEXT.PRIMARY,
    marginBottom: UI_CONFIG.SPACING.SM,
  },
  debugText: {
    fontSize: UI_CONFIG.FONT_SIZES.SM,
    color: UI_CONFIG.COLORS.TEXT.SECONDARY,
    fontFamily: 'monospace',
  },
});

export default DebugMenu;
