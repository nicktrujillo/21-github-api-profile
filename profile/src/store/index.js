import { createStore, applyMiddleware, compose } from "redux";
import axios from "axios";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const initialState = {
  profile: {},
  repos: [],
};

function profile(state = initialState, action) {
  switch (action.type) {
    case "GET_PROFILE":
      return { ...state, profile: action.payload };
    case "GET_REPOS":
      return { ...state, repos: action.payload };
    default:
      return state;
  }
}

export function getProfile() {
  return (dispatch) => {
    axios.get("https://api.github.com/users/nicktrujillo").then((resp) => {
      dispatch({
        type: "GET_PROFILE",
        payload: resp.data,
      });
    });
  };
}

export function getRepos() {
  return (dispatch) => {
    axios
      .get("https://api.github.com/users/nicktrujillo/repos")
      .then((resp) => {
        dispatch({
          type: "GET_REPOS",
          payload: resp.data,
        });
      });
  };
}

export default createStore(profile, compose(applyMiddleware(thunk)));
