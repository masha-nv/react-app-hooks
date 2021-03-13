import axios from "axios";
import { useReducer, useEffect } from "react";

const ACTIONS = {
  MAKE_REQUEST: "MAKE_REQUEST",
  GET_DATA: "GET_DATA",
  ERROR: "ERROR",
  HAS_NEXT_PAGE: "HAS_NEXT_PAGE",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return {
        ...state,
        loading: true,
        jobs: [],
      };
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: [],
      };
    case ACTIONS.HAS_NEXT_PAGE:
      return {
        ...state,
        hasNextPage: action.payload.hasNextPage,
      };
    default:
      return state;
  }
}
const BASE_URL = "/positions.json";

export default function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, {});
  useEffect(() => {
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(BASE_URL, {
        params: { markdown: true, page: page, ...params },
      })
      .then((res) => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: error } });
      });

    axios
      .get(BASE_URL, {
        params: { markdown: true, page: page + 1, ...params },
      })
      .then((res) => {
        dispatch({
          type: ACTIONS.HAS_NEXT_PAGE,
          payload: { hasNextPage: res.data.length },
        });
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: error } });
      });
  }, [params, page]);
  return state;
}
