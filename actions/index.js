import uuid from "uuid";
import firebase from "firebase";
import db from "../config/firebase";
import * as ImageManipulator from "expo-image-manipulator";
export const uploadPhoto = (image) => {
  return async (dispatch) => {
    try {
      console.log(image);
      const resize = await ImageManipulator.manipulateAsync(image.uri, [], {
        format: ImageManipulator.SaveFormat.JPEG,
        compress: 0.1,
      });
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.response);
        xhr.responseType = "blob";
        xhr.open("GET", resize.uri, true);
        xhr.send(null);
      });
      const uploadTask = await firebase
        .storage()
        .ref()
        .child(uuid.v4())
        .put(blob);
      const downloadURL = await uploadTask.ref.getDownloadURL();
      return downloadURL;
    } catch (e) {
      console.error(e);
    }
  };
};
