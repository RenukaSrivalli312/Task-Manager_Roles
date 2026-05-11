import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import TasksScreen from '../screens/TasksScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SplashScreen from '../screens/SplashScreen';
import { useAuth } from '../context/AuthContext';
import { getNavigationTheme, getPalette } from '../theme/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AdminTabs() {
  const isDark = false;
  const palette = getPalette(isDark);
  return (
    <Tab.Navigator screenOptions={createTabScreenOptions(palette)}>
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="clipboard-text-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateTaskScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="plus-circle-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

function UserTabs() {
  const isDark = false;
  const palette = getPalette(isDark);
  return (
    <Tab.Navigator screenOptions={createTabScreenOptions(palette)}>
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="clipboard-text-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

function AppStack() {
  const { user } = useAuth();
  const isDark = false;
  const palette = getPalette(isDark);
  const isAdmin = String(user?.role || '').toLowerCase() === 'admin';

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: palette.background },
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: '700', color: palette.text },
        headerTintColor: palette.text,
      }}
    >
      <Stack.Screen name="HomeTabs" component={isAdmin ? AdminTabs : UserTabs} options={{ headerShown: false }} />
      <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} options={{ title: 'Task Details' }} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { isInitializing, isAuthenticated } = useAuth();
  const isDark = false;

  if (isInitializing) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer theme={getNavigationTheme(isDark)}>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
function createTabScreenOptions(palette) {
  return {
    headerShown: false,
    tabBarActiveTintColor: palette.primary,
    tabBarInactiveTintColor: '#A0A6B3',
    tabBarStyle: {
      height: 70,
      paddingTop: 6,
      paddingBottom: 10,
      borderTopColor: palette.border,
      backgroundColor: palette.surface,
    },
    tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
  };
}
