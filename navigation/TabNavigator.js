import React from "react";

import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import {
  HomeNavigator,
  SearchNavigator,
  PostNavigator,
  ProfileNavigator,
} from "./StackNavigator";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name={focused ? "home" : "home-outline"}
            size={32}
          />
        ),
      },
    },
    Search: {
      screen: SearchNavigator,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: ({ focused }) => (
          <Ionicons name={focused ? "md-search" : "ios-search"} size={32} />
        ),
      },
    },
    Post: {
      screen: PostNavigator,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={focused ? "ios-add-circle" : "ios-add-circle-outline"}
            size={32}
          />
        ),
      },
    },

    MyProfile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: ({ focused }) => (
          <FontAwesome name={focused ? "user" : "user-o"} size={32} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        paddingVertical: 10,
        height: 60,
      },
    },
  }
);

export default createAppContainer(TabNavigator);
