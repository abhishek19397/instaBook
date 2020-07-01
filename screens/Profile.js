import React from "react";
import styles from "../styles";
import firebase from "firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  ScrollView,
} from "react-native";
import { getUser } from "../actions/user";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  logout = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate("Auth");
  };
  render() {
    let user = {};
    const { state, navigate } = this.props.navigation;
    if (state.routeName === "Profile") {
      user = this.props.profile;
    } else {
      user = this.props.user;
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={async () => {
                this.setState({ loading: true });
                await this.props.getUser(user.uid, "LOGIN");
                this.setState({ loading: false });
              }}
            />
          }
        >
          <View style={styles.center}>
            <Image style={styles.profileImage} source={{ uri: user.photo }} />
          </View>
          <View style={styles.center}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {user.username}
            </Text>
          </View>
          <View style={styles.center}>
            <Text>{user.bio}</Text>
          </View>
          <View style={styles.center}>
            {state.routeName === "MyProfile" ? (
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.buttonSmall}
                  onPress={() => this.props.navigation.navigate("Edit")}
                >
                  <Text style={styles.bold}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonSmall}
                  onPress={this.logout}
                >
                  <Text style={styles.bold}>Logout</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <View style={{ marginBottom: 20 }}></View>
          <FlatList
            refreshing={false}
            scrollEnabled={false}
            data={user.posts}
            keyExtractor={(item) => JSON.stringify(item.date)}
            renderItem={({ item }) => {
              return (
                <View>
                  <View style={[styles.row, styles.space]}>
                    <View style={[styles.row, styles.center]}>
                      <Image
                        style={styles.roundImage}
                        source={{ uri: item.photo }}
                      />
                      <View>
                        <Text style={styles.bold}>{item.username}</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={item.postPhoto === " " ? styles.textPost : null}>
                    {item.postDescription}
                  </Text>
                  {item.postPhoto === " " ? null : (
                    <Image
                      style={styles.postPhoto}
                      source={{ uri: item.postPhoto }}
                    />
                  )}
                </View>
              );
            }}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUser }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    profile: state.profile,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
