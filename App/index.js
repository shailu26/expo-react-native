import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AuthContext } from "./context/context";
import {
  Search,
  Home,
  Details,
  Search2,
  Splash,
  SignOutComponent
} from "./screens/Screens";
import Login from './screens/login/login'
import { Ionicons } from '@expo/vector-icons';
import { AsyncStorage } from "react-native";
import { UploadVideo } from './screens/jobseeker/upload-video/upload-video';
import { Provider as PaperProvider } from "react-native-paper";
import {ChangePassword} from './screens/jobseeker/change-password/change-password';
import {UserProfileDetail } from './screens/jobseeker/user-profile/user-profile';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen
      name="Login"
      component={Login}
    />
  </AuthStack.Navigator>
);

const Tabs = createBottomTabNavigator();
const UserProfileStack = createStackNavigator();

const UserProfileStackScreen = () => (
  <UserProfileStack.Navigator screenOptions={{headerShown: false}}>
    <UserProfileStack.Screen name="Profile" component={UserProfileDetail} />
  </UserProfileStack.Navigator>
);

const TabsScreen = () => (
  <Tabs.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Profile":
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
              break;
            case "Videos":
              iconName = focused ? 'ios-videocam' : 'ios-videocam';
              break;
            case "Settings":
              iconName = focused ? 'ios-list-box' : 'ios-list';
              break;
            default:
              break;
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
    <Tabs.Screen name="Profile" component={UserProfileStackScreen} />
    <Tabs.Screen name="Videos" component={UploadVideo} />
  </Tabs.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Profile">
    <Drawer.Screen name="Profile" component={TabsScreen} />
    <Drawer.Screen name="Change Password" component={ChangePassword} />
    <Drawer.Screen name="Sign Out" component = {SignOutComponent}/>
  </Drawer.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator>
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          animationEnabled: false,
          headerShown: false
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
          headerShown: false
        }}
      />
    )}
  </RootStack.Navigator>
);


export default () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      signIn: (token) => {
        setIsLoading(false);
        setUserToken(token);
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken("asdf");
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      }
    };
  }, []);

  React.useEffect(() => {
    const fetchToken = async () => {
      let token = await AsyncStorage.getItem('token');
      setUserToken(token);
    }
    fetchToken();
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <PaperProvider>
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
  );
};
