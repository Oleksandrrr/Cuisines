import React, {Component, ErrorInfo, ReactNode} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {UI_CONFIG, ERROR_MESSAGES} from '../../config';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error: Error): State {
    return {hasError: true, error};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    // Here you would typically log to an error reporting service
    // like Sentry, Crashlytics, etc.
  }

  handleRetry = () => {
    this.setState({hasError: false, error: undefined});
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <Text style={styles.title}>Oops! Something went wrong.</Text>
          <Text style={styles.message}>{ERROR_MESSAGES.NETWORK.UNKNOWN}</Text>
          <TouchableOpacity style={styles.button} onPress={this.handleRetry}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: UI_CONFIG.SPACING.LG,
    backgroundColor: UI_CONFIG.COLORS.BACKGROUND,
  },
  title: {
    fontSize: UI_CONFIG.FONT_SIZES.TITLE,
    fontWeight: 'bold',
    color: UI_CONFIG.COLORS.TEXT.PRIMARY,
    marginBottom: UI_CONFIG.SPACING.MD,
    textAlign: 'center',
  },
  message: {
    fontSize: UI_CONFIG.FONT_SIZES.MD,
    color: UI_CONFIG.COLORS.TEXT.SECONDARY,
    textAlign: 'center',
    marginBottom: UI_CONFIG.SPACING.LG,
    lineHeight: 24,
  },
  button: {
    backgroundColor: UI_CONFIG.COLORS.PRIMARY,
    paddingHorizontal: UI_CONFIG.SPACING.LG,
    paddingVertical: UI_CONFIG.SPACING.SM,
    borderRadius: UI_CONFIG.BORDER_RADIUS.MD,
  },
  buttonText: {
    color: UI_CONFIG.COLORS.SURFACE,
    fontSize: UI_CONFIG.FONT_SIZES.MD,
    fontWeight: '600',
  },
});

export default ErrorBoundary;
