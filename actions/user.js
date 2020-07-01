import firebase from "firebase";
import db from "../config/firebase";
import { orderBy } from "lodash";

export const updateEmail = (email) => {
  return { type: "UPDATE_EMAIL", payload: email };
};

export const updatePassword = (password) => {
  return { type: "UPDATE_PASSWORD", payload: password };
};

export const updateUsername = (username) => {
  return { type: "UPDATE_USERNAME", payload: username };
};

export const updateBio = (bio) => {
  return { type: "UPDATE_BIO", payload: bio };
};

export const updatePhoto = (photo) => {
  return { type: "UPDATE_PHOTO", payload: photo };
};

export const login = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = getState().user;
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      dispatch(getUser(response.user.uid));
    } catch (e) {
      alert(e);
    }
  };
};

export const getUser = (uid, type) => {
  return async (dispatch, getState) => {
    try {
      const userQuery = await db.collection("users").doc(uid).get();
      let user = userQuery.data();

      let posts = [];
      const postsQuery = await db
        .collection("posts")
        .where("uid", "==", uid)
        .get();
      postsQuery.forEach(function (response) {
        posts.push(response.data());
      });
      user.posts = orderBy(posts, "date", "desc");

      if (type === "LOGIN") {
        dispatch({ type: "LOGIN", payload: user });
      } else {
        dispatch({ type: "GET_PROFILE", payload: user });
      }
    } catch (e) {
      alert(e);
    }
  };
};

export const updateUser = () => {
  return async (dispatch, getState) => {
    const { uid, username, bio, photo } = getState().user;
    try {
      db.collection("users").doc(uid).update({
        username: username,
        bio: bio,
        photo: photo,
      });
    } catch (e) {
      alert(e);
    }
  };
};

export const signup = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password, username, bio, photo } = getState().user;
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (response.user.uid) {
        const user = {
          uid: response.user.uid,
          email: email,
          username: username,
          bio: bio,
          photo:
            photo ||
            "https://firebasestorage.googleapis.com/v0/b/feedbook-a155f.appspot.com/o/person.png?alt=media&token=054405e6-bd0e-42bb-9f7f-7efaae0a50ad",
        };
        db.collection("users").doc(response.user.uid).set(user);
        dispatch({ type: "LOGIN", payload: user });
      }
    } catch (e) {
      alert(e);
    }
  };
};
