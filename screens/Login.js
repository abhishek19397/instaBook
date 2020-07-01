import React from "react";
import styles from "../styles";
import firebase from "firebase";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { updateEmail, updatePassword, login, getUser } from "../actions/user";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount = () => {
    this.setState({ loading: true });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.getUser(user.uid, "LOGIN");
        if (this.props.user != null) {
          this.setState({ loading: false });
          //firebase.auth().signOut();
          this.props.navigation.navigate("Home");
        }
      }
      this.setState({ loading: false });
    });
  };

  render() {
    return (
      <View style={[styles.container, styles.center]}>
        {this.state.loading ? (
          <View>
            <ActivityIndicator />
            <Text>Checking for previous login</Text>
          </View>
        ) : null}
        <TextInput
          style={styles.border}
          value={this.props.user.email}
          onChangeText={(input) => this.props.updateEmail(input)}
          placeholder="Email"
        />
        <TextInput
          style={styles.border}
          value={this.props.user.password}
          onChangeText={(input) => this.props.updatePassword(input)}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.login()}
        >
          <Text>Login</Text>
        </TouchableOpacity>

        <Text style={{ margin: 20 }}>OR</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Signup")}
        >
          <Text>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { updateEmail, updatePassword, login, getUser },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
