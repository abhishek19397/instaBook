import React from "react";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/Home";
import SearchScreen from "../screens/Search";
import PostScreen from "../screens/Post";

import ProfileScreen from "../screens/Profile";

import EditScreen from "../screens/Signup";

import { TouchableOpacity } from "react-native";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

export const HomeNavigator = createAppContainer(
  createStackNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "InstaBook",
        headerTitleAlign: "center",
      }),
    },
  })
);

export const SearchNavigator = createAppContainer(
  createStackNavigator({
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        headerTitle: "Search",
        headerTitleAlign: "center",
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Profile",
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons style={styles.icon} name={"ios-arrow-back"} size={30} />
          </TouchableOpacity>
        ),
      }),
    },
  })
);

export const PostNavigator = createAppContainer(
  createStackNavigator({
    Post: {
      screen: PostScreen,
      navigationOptions: {
        headerTitle: "Add post",
        headerTitleAlign: "center",
      },
    },
  })
);

export const ProfileNavigator = createAppContainer(
  createStackNavigator({
    MyProfile: {
      screen: ProfileScreen,
      navigationOptions: {
        headerTitle: "My Account",
        headerTitleAlign: "center",
      },
    },
    Edit: {
      screen: EditScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Edit Profile",
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons style={styles.icon} name={"ios-arrow-back"} size={30} />
          </TouchableOpacity>
        ),
      }),
    },
  })
);
