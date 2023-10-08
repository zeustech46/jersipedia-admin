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
import { getListLiga, deleteLiga } from "action/LigaAction";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class ListLiga extends Component {
  componentDidMount() {
    this.props.dispatch(getListLiga());
  }

  removeData = (image, id) => {
    this.props.dispatch(deleteLiga(image, id));
  };

  componentDidUpdate(prevProps) {
    const { deleteLigaResult } = this.props;
    if (deleteLigaResult && prevProps.deleteLigaResult !== deleteLigaResult) {
      Swal.fire({
        icon: "success",
        title: "Success !",
        text: "Data berhasil dihapus",
        showConfirmButton: false,
        confirmButtonColor: "#33b4b7",
        timer: 2000,
      });
      this.props.dispatch(getListLiga());
    }
  }

  render() {
    const { listLigaResult, listLigaLoading, listLigaError } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Col className="d-flex justify-content-between" md="12">
                  <CardTitle tag="h4">Master Liga</CardTitle>
                  <Link to="/admin/liga/tambahliga" className="btn btn-primary">
                    + Tambah Liga
                  </Link>
                </Col>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>No.</th>
                      <th>Logo</th>
                      <th>Nama Liga</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {listLigaResult ? (
                      // data ada
                      Object.keys(listLigaResult).map((key, index) => (
                        <tr key={key}>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={listLigaResult[key].image}
                              width="70"
                              alt={listLigaResult[key].namaLiga}
                            />
                          </td>
                          <td>{listLigaResult[key].namaLiga}</td>
                          <td>
                            <Link
                              to={"/admin/liga/editliga/" + key}
                              className="btn btn-warning"
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Edit
                            </Link>
                            <Button
                              color="danger"
                              className="ml-3"
                              onClick={() =>
                                this.removeData(listLigaResult[key].image, key)
                              }
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Hapus
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : listLigaLoading ? (
                      <tr>
                        <td colSpan="3" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : listLigaError ? (
                      <tr colSpan="3" align="center">
                        <td>{listLigaError}</td>
                      </tr>
                    ) : (
                      <tr colSpan="3" align="center">
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
  listLigaLoading: state.LigaReducer.listLigaLoading,
  listLigaResult: state.LigaReducer.listLigaResult,
  listLigaError: state.LigaReducer.listLigaError,

  deleteLigaLoading: state.LigaReducer.deleteLigaLoading,
  deleteLigaResult: state.LigaReducer.deleteLigaResult,
  deleteLigaError: state.LigaReducer.deleteLigaError,
});

export default connect(mapStateToProps, null)(ListLiga);
