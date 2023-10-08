import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
} from "../utils/dispatch/index";
import { ref as refDatabase, onValue, update } from "firebase/database";
import { db } from "../config/firebase/index";

export const GET_LIST_PESANAN = "GET_LIST_PESANAN";
export const UPDATE_PESANAN = "UPDATE_PESANAN";

export const getListPesanan = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_PESANAN);
    // Dapatkan data dari firebase
    onValue(
      refDatabase(db, "histories/"),
      (snapshot) => {
        if (snapshot.val()) {
          // berhasil
          dispatchSuccess(dispatch, GET_LIST_PESANAN, snapshot.val());
        } else {
          dispatchError(dispatch, GET_LIST_PESANAN, "Data Jersey tidak ada");
        }
      },
      {
        onlyOnce: true,
      }
    );
  };
};

export const updatePesanan = (order_id, transaction_status) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_PESANAN);

    const status =
      transaction_status === "settlement" || transaction_status === "capture"
        ? "Lunas"
        : transaction_status;

    // Dapatkan data dari firebase

    console.log("masuk sini");

    update(refDatabase(db, "histories/" + order_id.split("-")[2]), {
      status: status,
    })
      .then((res) => {
        console.log("masuk database");
        // berhasil
        dispatchSuccess(dispatch, UPDATE_PESANAN, "Update Berhasil");
        console.log("masuk Success");
      })
      .catch((error) => {
        dispatchError(dispatch, UPDATE_PESANAN, error);
      });
  };
};
