import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DashboardStackParamList} from '../../../../navigators/dashboard';
import {useCuisines} from '../../hooks/useCuisines';
import CuisineCell from './components/Cell';
import DebugMenu from '../../../../components/DebugMenu';
import {UI_CONFIG} from '../../../../config';

type CuisineListNavigationProp = NativeStackNavigationProp<
  DashboardStackParamList,
  'CuisineList'
>;

interface HeaderButtonsProps {
  onDebugPress: () => void;
}

const HeaderButtons: React.FC<HeaderButtonsProps> = ({onDebugPress}) => (
  <View style={styles.headerButtons}>
    <TouchableOpacity style={styles.debugButton} onPress={onDebugPress}>
      <Text style={styles.debugText}>🔧</Text>
    </TouchableOpacity>
  </View>
);

interface TitleButtonProps {
  onLongPress: () => void;
}

const TitleButton: React.FC<TitleButtonProps> = ({onLongPress}) => (
  <TouchableOpacity onLongPress={onLongPress} style={styles.titleContainer}>
    <Text style={styles.titleText}>Cuisines</Text>
  </TouchableOpacity>
);

const CuisineList: React.FC = () => {
  const navigation = useNavigation<CuisineListNavigationProp>();
  const {cuisines, isLoading, error, fetch} = useCuisines();
  const [debugMenuVisible, setDebugMenuVisible] = useState(false);

  const handleDebugPress = useCallback(() => {
    setDebugMenuVisible(true);
  }, []);

  const handleTitleLongPress = useCallback(() => {
    setDebugMenuVisible(true);
  }, []);

  const headerRight = useMemo(
    () => () => <HeaderButtons onDebugPress={handleDebugPress} />,
    [handleDebugPress],
  );

  const headerTitle = useMemo(
    () => () => <TitleButton onLongPress={handleTitleLongPress} />,
    [handleTitleLongPress],
  );

  useEffect(() => {
    navigation.setOptions({
      title: 'Cuisines',
      headerRight,
      headerTitle,
    });
  }, [navigation, headerRight, headerTitle]);

  // Show loading only if it's the first load and no data exists
  if (isLoading && (!cuisines || cuisines.length === 0)) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={UI_CONFIG.COLORS.PRIMARY} />
        <Text style={styles.loadingText}>Loading cuisines...</Text>
      </View>
    );
  }

  // Show error only if no data exists and there's an error
  if (error && (!cuisines || cuisines.length === 0)) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load cuisines</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetch}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Show "No cuisines" only if not loading and no data exists
  if (!isLoading && (!cuisines || cuisines.length === 0)) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No cuisines available</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetch}>
          <Text style={styles.retryButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cuisines?.map(cuisine => (
        <CuisineCell key={cuisine.id} cuisine={cuisine} />
      ))}
      <RefreshControl refreshing={isLoading} onRefresh={fetch} />

      <DebugMenu
        visible={debugMenuVisible}
        onClose={() => setDebugMenuVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UI_CONFIG.COLORS.BACKGROUND,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: UI_CONFIG.COLORS.BACKGROUND,
    paddingHorizontal: UI_CONFIG.SPACING.LG,
  },
  loadingText: {
    marginTop: UI_CONFIG.SPACING.MD,
    fontSize: UI_CONFIG.FONT_SIZES.MD,
    color: UI_CONFIG.COLORS.TEXT.SECONDARY,
  },
  errorText: {
    fontSize: UI_CONFIG.FONT_SIZES.LG,
    fontWeight: 'bold',
    color: UI_CONFIG.COLORS.TEXT.PRIMARY,
    textAlign: 'center',
    marginBottom: UI_CONFIG.SPACING.SM,
  },
  errorSubtext: {
    fontSize: UI_CONFIG.FONT_SIZES.MD,
    color: UI_CONFIG.COLORS.TEXT.SECONDARY,
    textAlign: 'center',
    marginBottom: UI_CONFIG.SPACING.LG,
  },
  emptyText: {
    fontSize: UI_CONFIG.FONT_SIZES.LG,
    color: UI_CONFIG.COLORS.TEXT.SECONDARY,
    textAlign: 'center',
    marginBottom: UI_CONFIG.SPACING.LG,
  },
  retryButton: {
    backgroundColor: UI_CONFIG.COLORS.PRIMARY,
    paddingHorizontal: UI_CONFIG.SPACING.LG,
    paddingVertical: UI_CONFIG.SPACING.MD,
    borderRadius: UI_CONFIG.BORDER_RADIUS.MD,
  },
  retryButtonText: {
    color: UI_CONFIG.COLORS.SURFACE,
    fontSize: UI_CONFIG.FONT_SIZES.MD,
    fontWeight: '600',
  },
  headerButtons: {
    flexDirection: 'row',
    marginRight: UI_CONFIG.SPACING.SM,
  },
  debugButton: {
    padding: UI_CONFIG.SPACING.XS,
  },
  debugText: {
    fontSize: 24,
  },
  titleContainer: {
    padding: UI_CONFIG.SPACING.XS,
  },
  titleText: {
    fontSize: UI_CONFIG.FONT_SIZES.LG,
    fontWeight: 'bold',
    color: UI_CONFIG.COLORS.SURFACE,
  },
});

export default CuisineList;
