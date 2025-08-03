import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import {UI_CONFIG} from '../../../../config';
import {useLogin} from '../../hooks/useLogin';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [_emailTouched, setEmailTouched] = useState(false);
  const [_passwordTouched, setPasswordTouched] = useState(false);
  const {handleLogin, isLoading} = useLogin();

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;

  const canSubmit = isEmailValid && isPasswordValid;

  const handleSubmit = async () => {
    if (!canSubmit) {
      return;
    }
    try {
      await handleLogin(email, password);
      Toast.show('Login successful!', Toast.SHORT);
    } catch (error: any) {
      Toast.show(
        error.message || 'Login failed. Please try again.',
        Toast.LONG,
      );
    }
  };

  const renderValidationIcon = (isValid: boolean) => {
    const iconColor = isValid
      ? UI_CONFIG.COLORS.SUCCESS
      : UI_CONFIG.COLORS.ERROR;

    return (
      <View style={[styles.validationIndicator, {backgroundColor: iconColor}]}>
        <Text style={styles.validationText}>{isValid ? '✓' : '✗'}</Text>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[UI_CONFIG.COLORS.PRIMARY, UI_CONFIG.COLORS.SECONDARY]}
      style={styles.gradient}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Hello there, sign in to continue!</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username or email</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                onBlur={() => setEmailTouched(true)}
                placeholderTextColor={UI_CONFIG.COLORS.TEXT.DISABLED}
              />
              {email.length > 0 && renderValidationIcon(isEmailValid)}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                onBlur={() => setPasswordTouched(true)}
                placeholderTextColor={UI_CONFIG.COLORS.TEXT.DISABLED}
              />
              {password.length > 0 && renderValidationIcon(isPasswordValid)}
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              (!canSubmit || isLoading) && styles.buttonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!canSubmit || isLoading}>
            <Text style={styles.buttonText}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: UI_CONFIG.COLORS.SURFACE,
    borderTopLeftRadius: UI_CONFIG.BORDER_RADIUS.XL,
    borderTopRightRadius: UI_CONFIG.BORDER_RADIUS.XL,
    paddingHorizontal: UI_CONFIG.SPACING.XL,
    paddingTop: UI_CONFIG.SPACING.XL,
    paddingBottom: UI_CONFIG.SPACING.XL,
    minHeight: 420,
  },
  title: {
    fontSize: UI_CONFIG.FONT_SIZES.TITLE,
    fontWeight: '700',
    color: UI_CONFIG.COLORS.TEXT.PRIMARY,
    marginBottom: UI_CONFIG.SPACING.SM,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: UI_CONFIG.FONT_SIZES.MD,
    color: UI_CONFIG.COLORS.TEXT.SECONDARY,
    marginBottom: UI_CONFIG.SPACING.XL,
    textAlign: 'left',
  },
  inputGroup: {
    marginBottom: UI_CONFIG.SPACING.LG,
  },
  label: {
    fontSize: UI_CONFIG.FONT_SIZES.MD,
    color: UI_CONFIG.COLORS.TEXT.DISABLED,
    marginBottom: UI_CONFIG.SPACING.SM,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: UI_CONFIG.COLORS.BACKGROUND,
    borderRadius: UI_CONFIG.BORDER_RADIUS.LG,
    paddingHorizontal: UI_CONFIG.SPACING.MD,
  },
  input: {
    flex: 1,
    fontSize: UI_CONFIG.FONT_SIZES.LG,
    color: UI_CONFIG.COLORS.TEXT.PRIMARY,
    paddingVertical: UI_CONFIG.SPACING.MD,
    backgroundColor: 'transparent',
  },
  inputIcon: {
    marginLeft: UI_CONFIG.SPACING.SM,
  },
  button: {
    backgroundColor: UI_CONFIG.COLORS.PRIMARY,
    borderRadius: UI_CONFIG.BORDER_RADIUS.LG,
    paddingVertical: UI_CONFIG.SPACING.MD,
    alignItems: 'center',
    marginTop: UI_CONFIG.SPACING.MD,
  },
  buttonDisabled: {
    backgroundColor: UI_CONFIG.COLORS.TEXT.DISABLED,
  },
  buttonText: {
    color: UI_CONFIG.COLORS.SURFACE,
    fontSize: UI_CONFIG.FONT_SIZES.LG,
    fontWeight: '600',
  },
  validationIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: UI_CONFIG.SPACING.SM,
  },
  validationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: UI_CONFIG.COLORS.SURFACE,
  },
});

export default LoginScreen;
