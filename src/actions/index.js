import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

//new action creator
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  const userIds = _.uniq(_.map(getState().posts, "userId"));
  userIds.forEach((id) => dispatch(fetchUser(id)));
};

//------------after refactoring--------
export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

//-------action creator for fetching user------
export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};

//----------before refactored-------------
// export const fetchPosts = () => {
//     return async function (dispatch, getState) {
//         const response = await jsonPlaceholder.get("/posts");

//         dispatch({ type: "FETCH_POSTS", payload: response });
//     };
// };

//------one way of solving overfetching issue----
// export const fetchUser = (id) => (dispatch) => _fetchUser(id, dispatch);

// //this function makes request and dispatch
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: response.data });
// });
