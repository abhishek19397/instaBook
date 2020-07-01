import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Login from "../screens/Login";
import SignupScreen from "../screens/Signup";

import { TouchableOpacity } from "react-native";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const StackNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Signup: {
    screen: SignupScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Signup",
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons style={styles.icon} name={"ios-arrow-back"} size={30} />
        </TouchableOpacity>
      ),
    }),
  },
});

export default createAppContainer(StackNavigator);
