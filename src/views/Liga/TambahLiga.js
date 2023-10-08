import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Input,
  Button,
  Spinner,
} from "reactstrap";
import { connect } from "react-redux";
import { getListLiga, tambahLiga } from "action/LigaAction";
import { Link, Navigate } from "react-router-dom";
import DefaultImage from "../../assets/img/default-image.jpg";
import Swal from "sweetalert2";

class TambahLiga extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: DefaultImage,
      imageToDB: false,
      namaLiga: "",
      movePage: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(getListLiga());
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      const gambar = event.target.files[0];

      this.setState({
        image: URL.createObjectURL(gambar),
        imageToDB: gambar,
      });
    }
  };

  handleSubmit = (event) => {
    const { imageToDB, namaLiga } = this.state;

    event.preventDefault();
    if (imageToDB && namaLiga !== "") {
      //Proses lanjut ke action firebasse
      this.props.dispatch(tambahLiga(this.state));
    } else {
      //munculkan alert
      Swal.fire({
        icon: "error",
        title: "Failed !",
        text: "Semua Data harus terisi",
        showConfirmButton: false,
        confirmButtonColor: "#33b4b7",
        timer: 2000,
        // timerProgressBar: true,
      });
    }
  };

  componentDidUpdate(prevProps) {
    const { tambahLigaResult } = this.props;
    if (tambahLigaResult && prevProps.tambahLigaResult !== tambahLigaResult) {
      Swal.fire({
        icon: "success",
        title: "Success !",
        text: "Data berhasil ditambahkan",
        showConfirmButton: false,
        confirmButtonColor: "#33b4b7",
        timer: 2000,
      });
      this.setState({ movePage: true });
    }
  }

  render() {
    const { image, namaLiga, movePage } = this.state;
    const { tambahLigaLoading } = this.props;

    return (
      <div className="content">
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader>
                <Col>
                  <Link to="/admin/liga" className="btn btn-primary">
                    Kembali
                  </Link>
                  <CardTitle tag="h4">Tambah Liga</CardTitle>
                </Col>
              </CardHeader>

              <CardBody>
                <Row>
                  <Col>
                    <img src={image} width="200" alt="Logo Liga" />
                  </Col>
                </Row>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  {movePage ? <Navigate to="/admin/liga" /> : []}
                  <Row>
                    <Col>
                      <FormGroup>
                        <label>Logo Liga</label>
                        <Input
                          type="file"
                          onChange={(event) => this.handleImage(event)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={8}>
                      <Col>
                        <FormGroup>
                          <label>Nama Liga</label>
                          <Input
                            type="text"
                            value={namaLiga}
                            name="namaLiga"
                            onChange={(event) => this.handleChange(event)}
                          />
                        </FormGroup>
                      </Col>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      {tambahLigaLoading ? (
                        <Button color="primary" type="submit" disabled>
                          <Spinner size="sm" color="light" /> Loading
                        </Button>
                      ) : (
                        <Button color="primary" type="submit">
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
  tambahLigaLoading: state.LigaReducer.tambahLigaLoading,
  tambahLigaResult: state.LigaReducer.tambahLigaResult,
  tambahLigaError: state.LigaReducer.tambahLigaError,
});

export default connect(mapStateToProps, null)(TambahLiga);
