import React from "react";
import styles from "../styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Text, View, Image, FlatList, ActivityIndicator } from "react-native";
import { getPosts } from "../actions/post";

class Home extends React.Component {
  componentDidMount() {
    this.props.getPosts();
    alert(
      "Auto refresh is off to save the bandwidth. Refresh the pages manually to see the new posts."
    );
  }

  render() {
    if (this.props.post === null)
      return (
        <ActivityIndicator
          size="large"
          color="#2980b9"
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        />
      );
    return (
      <View style={styles.container}>
        {console.log(this.props.post.feed)}
        <FlatList
          onRefresh={() => this.props.getPosts()}
          refreshing={false}
          data={this.props.post.feed.sort((a, b) =>
            b.date.localeCompare(a.date)
          )}
          keyExtractor={(item) => item.id}
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
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getPosts }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
