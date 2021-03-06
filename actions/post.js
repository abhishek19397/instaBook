import firebase from "firebase";
import db from "../config/firebase";
import uuid from "uuid";

export const updateDescription = (input) => {
  return { type: "UPDATE_DESCRIPTION", payload: input };
};

export const updatePhoto = (input) => {
  return { type: "UPDATE_POST_PHOTO", payload: input };
};

export const uploadPost = () => {
  return async (dispatch, getState) => {
    try {
      const { post, user } = getState();
      const id = uuid.v4();
      const upload = {
        id: id,
        postPhoto: post.photo || " ",
        postDescription: post.description || " ",
        uid: user.uid,
        photo: user.photo || " ",
        username: user.username,
        date: new Date().toLocaleString(),
      };
      db.collection("posts").doc(id).set(upload);
    } catch (e) {
      console.error(e);
    }
  };
};

export const getPosts = () => {
  return async (dispatch, getState) => {
    try {
      const posts = await db.collection("posts").get();

      let array = [];
      posts.forEach((post) => {
        array.push(post.data());
      });
      dispatch({ type: "GET_POSTS", payload: array });
    } catch (e) {
      alert(e);
    }
  };
};
