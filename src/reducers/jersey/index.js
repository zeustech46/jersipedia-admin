import {
  GET_LIST_JERSEY,
  UPLOAD_JERSEY,
  TAMBAH_JERSEY,
  GET_DETAIL_JERSEY,
  UPDATE_JERSEY,
  DELETE_JERSEY,
} from "action/JerseyAction";

const initialState = {
  listJerseyLoading: false,
  listJerseyResult: false,
  listJerseyError: false,

  uploadJerseyLoading: false,
  uploadJerseyResult: false,
  uploadJerseyError: false,

  tambahJerseyLoading: false,
  tambahJerseyResult: false,
  tambahJerseyError: false,

  detailJerseyLoading: false,
  detailJerseyResult: false,
  detailJerseyError: false,

  updateJerseyLoading: false,
  updateJerseyResult: false,
  updateJerseyError: false,

  deleteJerseyLoading: false,
  deleteJerseyResult: false,
  deleteJerseyError: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_JERSEY:
      return {
        ...state,
        listJerseyLoading: action.payload.loading,
        listJerseyResult: action.payload.data,
        listJerseyError: action.payload.errorMessage,
      };
    case UPLOAD_JERSEY:
      return {
        ...state,
        uploadJerseyLoading: action.payload.loading,
        uploadJerseyResult: action.payload.data,
        uploadJerseyError: action.payload.errorMessage,
      };
    case TAMBAH_JERSEY:
      return {
        ...state,
        tambahJerseyLoading: action.payload.loading,
        tambahJerseyResult: action.payload.data,
        tambahJerseyError: action.payload.errorMessage,
      };
    case GET_DETAIL_JERSEY:
      return {
        ...state,
        detailJerseyLoading: action.payload.loading,
        detailJerseyResult: action.payload.data,
        detailJerseyError: action.payload.errorMessage,
      };
    case UPDATE_JERSEY:
      return {
        ...state,
        updateJerseyLoading: action.payload.loading,
        updateJerseyResult: action.payload.data,
        updateJerseyError: action.payload.errorMessage,
      };
    case DELETE_JERSEY:
      return {
        ...state,
        deleteJerseyLoading: action.payload.loading,
        deleteJerseyResult: action.payload.data,
        deleteJerseyError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
