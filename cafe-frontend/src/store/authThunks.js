import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, provider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";
import api from "../api";
export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (_, thunkAPI) => {
    try {
      let user = JSON.parse(localStorage.getItem("user")) || null;
      let token = localStorage.getItem("token");
      if (token) {
        return {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          uid: user.uid,
          token: token,
        };
      }
      const result = await signInWithPopup(auth, provider);
      user = result.user;
      token = await user.getIdToken();
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      return {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid,
        token: token,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
