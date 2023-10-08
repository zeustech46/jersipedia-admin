import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  Button,
  Spinner,
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getListJersey, deleteJersey } from "action/JerseyAction";
import Swal from "sweetalert2";

class ListJersey extends Component {
  componentDidMount() {
    this.props.dispatch(getListJersey());
  }

  removeData = (images, id) => {
    this.props.dispatch(deleteJersey(images, id));
  };

  componentDidUpdate(prevProps) {
    const { deleteJerseyResult } = this.props;
    if (
      deleteJerseyResult &&
      prevProps.deleteJerseyResult !== deleteJerseyResult
    ) {
      Swal.fire({
        icon: "success",
        title: "Success !",
        text: "Data berhasil dihapus",
        showConfirmButton: false,
        confirmButtonColor: "#33b4b7",
        timer: 2000,
      });
      this.props.dispatch(getListJersey());
    }
  }

  render() {
    const { listJerseyResult, listJerseyLoading, listJerseyError } = this.props;

    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Col className="d-flex justify-content-between" md="12">
                  <CardTitle tag="h5">List Semua Jersey</CardTitle>
                  <Link
                    to="/admin/jersey/tambahJersey"
                    className="btn btn-primary"
                  >
                    + Tambah Jersey
                  </Link>
                </Col>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>No.</th>
                      <th>Foto</th>
                      <th>Nama Jersey</th>
                      <th>Harga</th>
                      <th>Berat</th>
                      <th>Jenis</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {listJerseyResult ? (
                      Object.keys(listJerseyResult).map((key, index) => (
                        <tr key={key}>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={listJerseyResult[key].gambar[0]}
                              width="70"
                              alt={listJerseyResult[key].nama}
                            />
                          </td>
                          <td>{listJerseyResult[key].nama}</td>
                          <td>Rp. {listJerseyResult[key].harga}</td>
                          <td>{listJerseyResult[key].berat} Kg</td>
                          <td>{listJerseyResult[key].jenis}</td>
                          <td>
                            <Link
                              to={"/admin/jersey/editjersey/" + key}
                              className="btn btn-warning"
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Edit
                            </Link>
                            <Button
                              color="danger"
                              className="ml-3"
                              onClick={() =>
                                this.removeData(
                                  listJerseyResult[key].gambar,
                                  key
                                )
                              }
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Hapus
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : listJerseyLoading ? (
                      <tr>
                        <td colSpan="6" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : listJerseyError ? (
                      <tr colSpan="6" align="center">
                        <td>{listJerseyError}</td>
                      </tr>
                    ) : (
                      <tr colSpan="6" align="center">
                        <td>Data Kosong</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listJerseyLoading: state.JerseyReducer.listJerseyLoading,
  listJerseyResult: state.JerseyReducer.listJerseyResult,
  listJerseyError: state.JerseyReducer.listJerseyError,

  deleteJerseyLoading: state.JerseyReducer.deleteJerseyLoading,
  deleteJerseyResult: state.JerseyReducer.deleteJerseyResult,
  deleteJerseyError: state.JerseyReducer.deleteJerseyError,
});

export default connect(mapStateToProps, null)(ListJersey);
