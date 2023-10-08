import {
  dispatchLoading,
  dispatchSuccess,
  dispatchError,
} from "../utils/dispatch";
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

export const GET_LIST_LIGA = "GET_LIST_LIGA";
export const TAMBAH_LIGA = "TAMBAH_LIGA";
export const GET_DETAIL_LIGA = "GET_DETAIL_LIGA";
export const UPDATE_LIGA = "UPDATE_LIGA";
export const DELETE_LIGA = "DELETE_LIGA";

export const getListLiga = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_LIGA);

    // Dapatkan data dari firebase
    onValue(
      refDatabase(db, "/ligas/"),
      (snapshot) => {
        if (snapshot.val()) {
          // berhasil
          dispatchSuccess(dispatch, GET_LIST_LIGA, snapshot.val());
        } else {
          dispatchError(dispatch, GET_LIST_LIGA, "Data Liga tidak ada");
        }
      },
      {
        onlyOnce: true,
      }
    );
    // dispatchSuccess(dispatch, GET_LIST_LIGA, "HAHA");
  };
};

export const tambahLiga = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_LIGA);

    const storageRef = refStorage(getStorage(), "ligas/" + data.imageToDB.name);

    const uploadTask = uploadBytesResumable(storageRef, data.imageToDB);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          const dataBaru = {
            namaLiga: data.namaLiga,
            image: downloadURL,
          };

          push(refDatabase(db, "ligas/"), dataBaru)
            .then((res) => {
              dispatchSuccess(dispatch, TAMBAH_LIGA, res ? res : []);
            })
            .catch((error) => {
              dispatchError(dispatch, TAMBAH_LIGA, error);
              alert(error);
            });
        });
      }
    );
  };
};

export const getDetailLiga = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_LIGA);

    // Dapatkan data dari firebase
    onValue(
      refDatabase(db, "/ligas/" + id),
      (snapshot) => {
        if (snapshot.val()) {
          // berhasil
          dispatchSuccess(dispatch, GET_DETAIL_LIGA, snapshot.val());
        } else {
          dispatchError(dispatch, GET_DETAIL_LIGA, "Data Liga tidak ada");
        }
      },
      {
        onlyOnce: true,
      }
    );
  };
};

export const updateLiga = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_LIGA);

    //Cek apakah gambar diganti
    if (data.imageToDB) {
      //ambil dan hapus gambar yang lama di storage firebase
      const desertRef = refStorage(getStorage(), data.imageLama);

      // Delete the file
      deleteObject(desertRef)
        .then(() => {
          // File deleted successfully
          const storageRef = refStorage(
            getStorage(),
            "ligas/" + data.imageToDB.name
          );

          const uploadTask = uploadBytesResumable(storageRef, data.imageToDB);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              console.log(snapshot);
            },
            (error) => {
              // Handle unsuccessful uploads
              console.log(error);
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log("File available at", downloadURL);

                const dataBaru = {
                  namaLiga: data.namaLiga,
                  image: downloadURL,
                };

                update(refDatabase(db, "ligas/" + data.id), dataBaru)
                  .then((res) => {
                    dispatchSuccess(dispatch, UPDATE_LIGA, res ? res : []);
                  })
                  .catch((error) => {
                    dispatchError(dispatch, UPDATE_LIGA, error);
                    alert(error);
                  });
              });
            }
          );
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          dispatchError(dispatch, UPDATE_LIGA, "Hapus data gagal");
        });
    } else {
      const dataBaru = {
        namaLiga: data.namaLiga,
        image: data.imageLama,
      };

      update(refDatabase(db, "ligas/" + data.id), dataBaru)
        .then((res) => {
          dispatchSuccess(dispatch, UPDATE_LIGA, res ? res : []);
        })
        .catch((error) => {
          dispatchError(dispatch, UPDATE_LIGA, error);
          alert(error);
        });
    }
  };
};

export const deleteLiga = (image, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_LIGA);

    // menghapus data di storage
    const desertRef = refStorage(getStorage(), image);

    // Hapus file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        console.log("Masuk snapshot");
        remove(refDatabase(db, "ligas/" + id)).then(() => {
          dispatchSuccess(dispatch, DELETE_LIGA, "Berhasil di hapus");
        });
        console.log("Masuk snapshot 2");
      })
      .catch((error) => {
        dispatchError(dispatch, DELETE_LIGA, "Hapus data gagal");
      });
  };
};
