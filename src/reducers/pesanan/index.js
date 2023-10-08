import { GET_LIST_PESANAN, UPDATE_PESANAN } from "../../action/PesananAction";

const initialState = {
  listPesananLoading: false,
  listPesananResult: false,
  listPesananError: false,

  updatePesananLoading: false,
  updatePesananResult: false,
  updatePesananError: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_PESANAN:
      return {
        ...state,
        listPesananLoading: action.payload.loading,
        listPesananResult: action.payload.data,
        listPesananError: action.payload.errorMessage,
      };
    case UPDATE_PESANAN:
      return {
        ...state,
        updatePesananLoading: action.payload.loading,
        updatePesananResult: action.payload.data,
        updatePesananError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
