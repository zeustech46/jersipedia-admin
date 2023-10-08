import {
  GET_LIST_LIGA,
  TAMBAH_LIGA,
  GET_DETAIL_LIGA,
  UPDATE_LIGA,
  DELETE_LIGA,
} from "../../action/LigaAction";

const initialState = {
  listLigaLoading: false,
  listLigaResult: false,
  listLigaError: false,

  tambahLigaLoading: false,
  tambahLigaResult: false,
  tambahLigaError: false,

  detailLigaLoading: false,
  detailLigaResult: false,
  detailLigaError: false,

  updateLigaLoading: false,
  updateLigaResult: false,
  updateLigaError: false,

  deleteLigaLoading: false,
  deleteLigaResult: false,
  deleteLigaError: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_LIGA:
      return {
        ...state,
        listLigaLoading: action.payload.loading,
        listLigaResult: action.payload.data,
        listLigaError: action.payload.errorMessage,
      };
    case TAMBAH_LIGA:
      return {
        ...state,
        tambahLigaLoading: action.payload.loading,
        tambahLigaResult: action.payload.data,
        tambahLigaError: action.payload.errorMessage,
      };
    case GET_DETAIL_LIGA:
      return {
        ...state,
        detailLigaLoading: action.payload.loading,
        detailLigaResult: action.payload.data,
        detailLigaError: action.payload.errorMessage,
      };
    case UPDATE_LIGA:
      return {
        ...state,
        updateLigaLoading: action.payload.loading,
        updateLigaResult: action.payload.data,
        updateLigaError: action.payload.errorMessage,
      };
    case DELETE_LIGA:
      return {
        ...state,
        deleteLigaLoading: action.payload.loading,
        deleteLigaResult: action.payload.data,
        deleteLigaError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
