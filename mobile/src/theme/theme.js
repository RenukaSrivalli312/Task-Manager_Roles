import { useColorScheme } from 'react-native';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const colors = {
  primary: '#2563EB',
  background: '#F6F8FC',
  surface: '#FFFFFF',
  text: '#101828',
  subtitle: '#667085',
  border: '#E6EAF2',
  pending: '#F59E0B',
  inProgress: '#2563EB',
  completed: '#22C55E',
  danger: '#EF4444',
};

const darkColors = {
  ...colors,
  background: '#0B1220',
  surface: '#121B2B',
  text: '#E6EBF5',
  subtitle: '#A8B2C6',
  border: '#1F2A3D',
};

export function getPalette(isDark) {
  return isDark ? darkColors : colors;
}

export function getPaperTheme(isDark) {
  const base = isDark ? MD3DarkTheme : MD3LightTheme;
  const palette = getPalette(isDark);
  return {
    ...base,
    roundness: 14,
    colors: {
      ...base.colors,
      primary: palette.primary,
      background: palette.background,
      surface: palette.surface,
      onSurface: palette.text,
      outline: palette.border,
      error: palette.danger,
    },
  };
}

export function getNavigationTheme(isDark) {
  const base = isDark ? NavigationDarkTheme : NavigationDefaultTheme;
  const palette = getPalette(isDark);
  return {
    ...base,
    colors: {
      ...base.colors,
      primary: palette.primary,
      background: palette.background,
      card: palette.surface,
      text: palette.text,
      border: palette.border,
    },
  };
}

export function useAppColors() {
  return getPalette(false);
}

export const shadows = {
  card: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
};
