import React from "react";
import styles from "../styles";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ImagePicker from "expo-image-picker";
import { NavigationEvents } from "react-navigation";
import { updateDescription, uploadPost, updatePhoto } from "../actions/post";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { uploadPhoto } from "../actions";
import * as Permissions from "expo-permissions";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  post = () => {
    if (this.props.post.description == null && this.props.post.photo == null) {
      return alert("Nothing to post");
    } else {
      if (this.props.post.description == "") return alert("Nothing to post");
      this.props.uploadPost();
      this.props.updateDescription(null);
      this.props.updatePhoto(null);
      this.props.navigation.navigate("Home");
    }
  };

  remove = () => {
    this.props.updatePhoto(null);
  };

  addImage = () => {
    this.openLibrary();
  };

  openLibrary = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const image = await ImagePicker.launchImageLibraryAsync();
      if (!image.cancelled) {
        this.setState({ loading: true });
        const url = await this.props.uploadPhoto(image);
        await this.props.updatePhoto(url);
        this.setState({ loading: false });
      }
    }
  };

  render() {
    return (
      <View style={[styles.container, styles.center]}>
        <TextInput
          style={styles.border}
          value={this.props.post.description}
          onChangeText={(text) => this.props.updateDescription(text)}
          placeholder="Enter text here"
        />
        {this.state.loading ? (
          <ActivityIndicator />
        ) : (
          <View>
            <Image
              style={styles.postPhoto}
              source={{ uri: this.props.post.photo }}
            />
            {this.props.post.photo ? (
              <TouchableOpacity
                style={styles.buttonCross}
                onPress={this.remove}
              >
                <Ionicons name={"ios-close"} size={32} />
              </TouchableOpacity>
            ) : null}
          </View>
        )}

        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <TouchableOpacity style={styles.buttonSmall} onPress={this.addImage}>
            <Text>Add Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSmall}
            onPress={() =>
              alert(
                "Excluded videos, enough bandwidth not available in free tier version of firebase"
              )
            }
          >
            <Text>Add Video</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.post}>
          <Text>Post</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { updateDescription, uploadPost, uploadPhoto, updatePhoto },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
