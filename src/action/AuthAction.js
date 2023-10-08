import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
} from "../utils/dispatch/index";
import { ref as refDatabase, onValue } from "firebase/database";
import { db, auth } from "../config/firebase/index";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import Swal from "sweetalert2";

export const LOGIN_USER = "LOGIN_USER";
export const CHECK_LOGIN = "CHECK_LOGIN";
export const LOGOUT_USER = "LOGOUT_USER";

export const loginUser = (email, password, navigate) => {
  return (dispatch) => {
    dispatchLoading(dispatch, LOGIN_USER);

    //Simpan email dan password di Authentication
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        //membaca data di firebase
        onValue(
          refDatabase(db, "/users/" + user.uid),
          (snapshot) => {
            if (snapshot.val()) {
              if (snapshot.val().status === "admin") {
                //simpan data di localStorage
                window.localStorage.setItem(
                  "user",
                  JSON.stringify(snapshot.val())
                );
                dispatchSuccess(dispatch, LOGIN_USER, snapshot.val());
                navigate("/admin/dashboard");
              } else {
                dispatchError(dispatch, LOGIN_USER, "Anda Bukan Admin");
                Swal.fire({
                  icon: "error",
                  title: "Error !",
                  text: "Anda Bukan Admin",
                  showConfirmButton: false,
                  confirmButtonColor: "#33b4b7",
                  timer: 2000,
                  // timerProgressBar: true,
                });
              }
            } else {
              Swal.fire({
                icon: "error",
                title: "Error !",
                text: "Data User tidak ditemukan",
                showConfirmButton: false,
                confirmButtonColor: "#33b4b7",
                timer: 2000,
                dispatch,
                // timerProgressBar: true,
              });
              dispatchError(dispatch, LOGIN_USER, "Gagal Login");
            }
          },
          {
            onlyOnce: true,
          }
        );

        // ...
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error !",
          text: "Email dan Password tidak valid ",
          showConfirmButton: false,
          confirmButtonColor: "#33b4b7",
          timer: 2000,
          dispatch,
          // timerProgressBar: true,
        });
        dispatchError(dispatch, LOGIN_USER, "Gagal Login");
      });
  };
};

export const checkLogin = (navigate) => {
  return (dispatch) => {
    dispatchLoading(dispatch, CHECK_LOGIN);

    if (window.localStorage.getItem("user")) {
      const user = JSON.parse(window.localStorage.getItem("user"));

      //membaca data di firebase
      onValue(
        refDatabase(db, "/users/" + user.uid),
        (snapshot) => {
          if (snapshot.val()) {
            if (snapshot.val().status === "admin") {
              //simpan data di localStorage
              dispatchSuccess(dispatch, CHECK_LOGIN, snapshot.val());
              navigate("/admin/dashboard");
              console.log("mantap");
            } else {
              Swal.fire({
                icon: "error",
                title: "Error !",
                text: "Anda Bukan Admin",
                showConfirmButton: false,
                confirmButtonColor: "#33b4b7",
                timer: 2000,
                // timerProgressBar: true,
              });
              dispatchError(dispatch, CHECK_LOGIN, "Anda Bukan Admin");
              navigate("/login");
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Error !",
              text: "Data tidak ditemukan",
              showConfirmButton: false,
              confirmButtonColor: "#33b4b7",
              timer: 2000,
              dispatch,
              // timerProgressBar: true,
            });
            dispatchError(dispatch, CHECK_LOGIN, "Gagal Login");
            navigate("/login");
          }
        },
        {
          onlyOnce: true,
        }
      );
    } else {
      dispatchError(dispatch, CHECK_LOGIN, "Belum Login");
      console.log("Belum login yahaha");
      navigate("/login");
    }
  };
};

export const logOutUser = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, LOGOUT_USER);

    signOut(auth)
      .then((res) => {
        // Sign-out successful.
        window.localStorage.removeItem("user");
        dispatchSuccess(dispatch, LOGOUT_USER, res);
      })
      .catch((error) => {
        // An error happened.
        dispatchError(dispatch, LOGOUT_USER, error.message);
        Swal.fire({
          icon: "error",
          title: "Error !",
          text: "Anda Bukan Admin",
          showConfirmButton: false,
          confirmButtonColor: "#33b4b7",
          timer: 2000,
          // timerProgressBar: true,
        });
      });
  };
};
