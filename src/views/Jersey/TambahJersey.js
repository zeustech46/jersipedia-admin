import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Input,
  Label,
  Button,
  Spinner,
} from "reactstrap";
import { Link, Navigate } from "react-router-dom";
import DefaultImage from "../../assets/img/default-image.jpg";
import { uploadJersey, tambahJersey } from "action/JerseyAction";
import { getListLiga } from "action/LigaAction";
import Swal from "sweetalert2";

class TambahJersey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image1: DefaultImage,
      image2: DefaultImage,
      imageToDB1: false,
      imageToDB2: false,

      nama: "",
      harga: 0,
      berat: 0,
      jenis: "",
      ukurans: ["S", "M", "L", "XL", "XXL"],
      ukuranSelected: [],
      ready: true,
      liga: "",
      movePage: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(getListLiga());
  }

  componentDidUpdate(prevProps) {
    const { uploadJerseyResult, tambahJerseyResult } = this.props;

    if (
      uploadJerseyResult &&
      prevProps.uploadJerseyResult !== uploadJerseyResult
    ) {
      this.setState({
        [uploadJerseyResult.imageToDB]: uploadJerseyResult.image,
      });
      Swal.fire({
        icon: "success",
        title: "Success !",
        text: "Data berhasil ditambahkan",
        showConfirmButton: false,
        confirmButtonColor: "#33b4b7",
        timer: 2000,
        // timerProgressBar: true,
      });
    }

    if (
      tambahJerseyResult &&
      prevProps.tambahJerseyResult !== tambahJerseyResult
    ) {
      Swal.fire({
        icon: "success",
        title: "Success !",
        text: "Data Jersey berhasil ditambahkan",
        showConfirmButton: false,
        confirmButtonColor: "#33b4b7",
        timer: 2000,
        // timerProgressBar: true,
      });
      this.setState({
        movePage: true,
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleImage = (event, imageToDB) => {
    if (event.target.files && event.target.files[0]) {
      const gambar = event.target.files[0];
      this.setState({
        [event.target.name]: URL.createObjectURL(gambar),
      });

      this.props.dispatch(uploadJersey(gambar, imageToDB));
    }
  };

  handleCheck = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;

    if (checked) {
      //jika user ceklis ukuran
      //isi state array ukuran selected
      this.setState({
        ukuranSelected: [...this.state.ukuranSelected, value],
      });
    } else {
      //jika user menghapus ceklis
      const ukuranBaru = this.state.ukuranSelected
        .filter((ukuran) => ukuran !== value)
        .map((filterUkuran) => {
          return filterUkuran;
        });

      this.setState({
        ukuranSelected: ukuranBaru,
      });
    }
  };

  handleSubmit = (event) => {
    const {
      nama,
      harga,
      jenis,
      berat,
      ukuranSelected,
      liga,
      imageToDB1,
      imageToDB2,
    } = this.state;

    event.preventDefault();

    if (
      nama &&
      harga &&
      jenis &&
      berat &&
      ukuranSelected &&
      liga &&
      imageToDB1 &&
      imageToDB2
    ) {
      //action
      this.props.dispatch(tambahJersey(this.state));
    } else {
      Swal.fire({
        icon: "error",
        title: "Error !",
        text: "Maaf, Semua data harus di isi",
        showConfirmButton: false,
        confirmButtonColor: "#33b4b7",
        timer: 2000,
        // timerProgressBar: true,
      });
    }
  };

  render() {
    const {
      image1,
      image2,
      nama,
      harga,
      berat,
      jenis,
      ukurans,
      ready,
      liga,
      imageToDB1,
      imageToDB2,
      movePage,
    } = this.state;
    const { listLigaResult, tambahJerseyLoading } = this.props;

    return (
      <div className="content">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Link to="/admin/jersey" className="btn btn-primary">
                  Kembali
                </Link>
                <CardTitle tag="h4">Tambah Jersey</CardTitle>
              </CardHeader>
              <CardBody>
                {movePage ? <Navigate to="/admin/jersey" /> : []}
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col>
                          <img
                            src={image1}
                            width="300"
                            alt="Foto Jersey (Depan)"
                          />
                          <FormGroup>
                            <label>Foto Jersey Depan</label>
                            <Input
                              type="file"
                              name="image1"
                              onChange={(event) =>
                                this.handleImage(event, "imageToDB1")
                              }
                            />
                          </FormGroup>

                          {image1 !== DefaultImage ? (
                            imageToDB1 ? (
                              <p>
                                <i className="nc-icon nc-check-2 mr-2"></i>
                                Selesai Upload
                              </p>
                            ) : (
                              <p>
                                <i className="nc-icon nc-user-run mr-2"></i>
                                Proses Upload
                              </p>
                            )
                          ) : (
                            <p>
                              <i className="nc-icon nc-cloud-upload-94 mr-2"></i>
                              Belum Upload
                            </p>
                          )}
                        </Col>
                        <Col>
                          <img
                            src={image2}
                            width="300"
                            alt="Foto Jersey (Belakang)"
                          />
                          <FormGroup>
                            <label>Foto Jersey Belakang</label>
                            <Input
                              type="file"
                              name="image2"
                              onChange={(event) =>
                                this.handleImage(event, "imageToDB2")
                              }
                            />
                          </FormGroup>

                          {image2 !== DefaultImage ? (
                            imageToDB2 ? (
                              <p>
                                <i className="nc-icon nc-check-2 mr-2"></i>
                                Selesai Upload
                              </p>
                            ) : (
                              <p>
                                <i className="nc-icon nc-user-run mr-2"></i>
                                Proses Upload
                              </p>
                            )
                          ) : (
                            <p>
                              <i className="nc-icon nc-cloud-upload-94 mr-2"></i>
                              Belum Upload
                            </p>
                          )}
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <label>Nama Jersey</label>
                        <Input
                          type="text"
                          name="nama"
                          value={nama}
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>

                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>Liga</label>
                            <Input
                              type="select"
                              name="liga"
                              value={liga}
                              onChange={(event) => this.handleChange(event)}
                            >
                              <option value=""> -- Pilih -- </option>
                              {Object.keys(listLigaResult).map((key) => (
                                <option value={key} key={key}>
                                  {listLigaResult[key].namaLiga}
                                </option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>Harga (Rp)</label>
                            <Input
                              type="number"
                              value={harga}
                              name="harga"
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>Berat (Kg)</label>
                            <Input
                              type="number"
                              value={berat}
                              name="berat"
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>Jenis</label>
                            <Input
                              type="text"
                              name="jenis"
                              value={jenis}
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={8}>
                          <label>Ukuran</label>
                          <FormGroup check>
                            {ukurans.map((ukuran, index) => (
                              <Label key={index} check className="mr-2">
                                <Input
                                  type="checkbox"
                                  value={ukuran}
                                  name="ukuran"
                                  onChange={(event) => this.handleCheck(event)}
                                />
                                {ukuran}
                                <span className="form-check-sign">
                                  <span className="check"></span>
                                </span>
                              </Label>
                            ))}
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <label>Ready</label>
                            <Input
                              type="select"
                              name="ready"
                              value={ready}
                              onChange={(event) => this.handleChange(event)}
                            >
                              <option value="">-- Pilih --</option>
                              <option value={true}>Ada</option>
                              <option value={false}>Kosong</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={8} />
                    <Col>
                      {tambahJerseyLoading ? (
                        <Button
                          type="submit"
                          className="btn btn-primary"
                          disabled
                          block
                        >
                          <Spinner size="sm" color="light" /> Loading ...
                        </Button>
                      ) : (
                        <Button type="submit" className="btn btn-primary" block>
                          Submit
                        </Button>
                      )}
                    </Col>
                  </Row>
                </form>
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

  uploadJerseyLoading: state.JerseyReducer.uploadJerseyLoading,
  uploadJerseyResult: state.JerseyReducer.uploadJerseyResult,
  uploadJerseyError: state.JerseyReducer.uploadJerseyError,

  tambahJerseyLoading: state.JerseyReducer.tambahJerseyLoading,
  tambahJerseyResult: state.JerseyReducer.tambahJerseyResult,
  tambahJerseyError: state.JerseyReducer.tambahJerseyError,
});

export default connect(mapStateToProps, null)(TambahJersey);
