import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
} from "../utils/dispatch/index";
import {
  ref as refDatabase,
  push,
  onValue,
  update,
  remove,
} from "firebase/database";
import {
  getStorage,
  ref as refStorage,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db } from "../config/firebase/index";

export const GET_LIST_JERSEY = "GET_LIST_JERSEY";
export const UPLOAD_JERSEY = "UPLOAD_JERSEY";
export const TAMBAH_JERSEY = "TAMBAH_JERSEY";
export const GET_DETAIL_JERSEY = "GET_DETAIL_JERSEY";
export const UPDATE_JERSEY = "UPDATE_JERSEY";
export const DELETE_JERSEY = "DELETE_JERSEY";

export const getListJersey = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_JERSEY);
    // Dapatkan data dari firebase
    onValue(
      refDatabase(db, "/jerseys/"),
      (snapshot) => {
        if (snapshot.val()) {
          // berhasil
          dispatchSuccess(dispatch, GET_LIST_JERSEY, snapshot.val());
        } else {
          dispatchError(dispatch, GET_LIST_JERSEY, "Data Jersey tidak ada");
        }
      },
      {
        onlyOnce: true,
      }
    );
    // dispatchSuccess(dispatch, GET_LIST_LIGA, "HAHA");
  };
};

export const uploadJersey = (gambar, imageToDB) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPLOAD_JERSEY);

    const storageRef = refStorage(getStorage(), "jerseys/" + gambar.name);

    const uploadTask = uploadBytesResumable(storageRef, gambar);

    console.log("masuk sini");

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
        dispatchError(dispatch, UPLOAD_JERSEY, "Data Jersey tidak ada");
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          const dataBaru = {
            image: downloadURL,
            imageToDB: imageToDB,
          };
          dispatchSuccess(dispatch, UPLOAD_JERSEY, dataBaru);
        });
      }
    );
  };
};

export const tambahJersey = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_JERSEY);

    const dataBaru = {
      gambar: [data.imageToDB1, data.imageToDB2],
      nama: data.nama,
      harga: data.harga,
      berat: data.berat,
      jenis: data.jenis,
      liga: data.liga,
      ukuran: data.ukuranSelected,
      ready: data.ready,
    };

    push(refDatabase(db, "jerseys/"), dataBaru)
      .then((res) => {
        dispatchSuccess(dispatch, TAMBAH_JERSEY, res ? res : []);
      })
      .catch((error) => {
        dispatchError(dispatch, TAMBAH_JERSEY, error);
        alert(error);
      });
  };
};

export const getDetailJersey = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_JERSEY);

    // Dapatkan data dari firebase
    onValue(
      refDatabase(db, "/jerseys/" + id),
      (snapshot) => {
        if (snapshot.val()) {
          // berhasil
          dispatchSuccess(dispatch, GET_DETAIL_JERSEY, snapshot.val());
        } else {
          dispatchError(dispatch, GET_DETAIL_JERSEY, "Data Jersey tidak ada");
        }
      },
      {
        onlyOnce: true,
      }
    );
  };
};

export const updateJersey = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_JERSEY);

    const dataBaru = {
      gambar: [
        data.imageToDB1 ? data.imageToDB1 : data.imageLama1,
        data.imageToDB2 ? data.imageToDB2 : data.imageLama2,
      ],
      nama: data.nama,
      harga: data.harga,
      berat: data.berat,
      jenis: data.jenis,
      liga: data.liga,
      ukuran: data.ukuranSelected,
      ready: data.ready,
    };

    console.log("isi Data baru : ", dataBaru);

    update(refDatabase(db, "jerseys/" + data.id), dataBaru)
      .then((res) => {
        if (data.imageToDB1) {
          const desertRef = refStorage(getStorage(), data.imageLama1);
          deleteObject(desertRef).catch((error) => {
            dispatchError(dispatch, UPDATE_JERSEY, error);
          });
        }
        if (data.imageToDB2) {
          const desertRef = refStorage(getStorage(), data.imageLama2);
          deleteObject(desertRef).catch((error) => {
            dispatchError(dispatch, UPDATE_JERSEY, error);
          });
        }

        dispatchSuccess(dispatch, UPDATE_JERSEY, "Update Jersey Sukses");
      })
      .catch((error) => {
        dispatchError(dispatch, UPDATE_JERSEY, error);
        alert(error);
      });
  };
};

export const deleteJersey = (images, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_JERSEY);

    // menghapus gambar satu di storage firebase
    const desertRef1 = refStorage(getStorage(), images[0]);

    // Hapus file
    deleteObject(desertRef1)
      .then(() => {
        // Hapus photo kedua di storage firebase
        const desertRef2 = refStorage(getStorage(), images[1]);
        deleteObject(desertRef2).then(() => {
          //Hapus data Jersey di Realtime Database
          remove(refDatabase(db, "jerseys/" + id)).then(() => {
            dispatchSuccess(dispatch, DELETE_JERSEY, "Berhasil di hapus");
          });
        });
      })
      .catch((error) => {
        dispatchError(dispatch, DELETE_JERSEY, "Hapus data gagal");
      });
  };
};
