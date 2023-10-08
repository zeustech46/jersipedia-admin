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
import { updateLiga } from "action/LigaAction";
import { Link, Navigate } from "react-router-dom";
import DefaultImage from "../../assets/img/default-image.jpg";
import Swal from "sweetalert2";
import { getDetailLiga } from "action/LigaAction";
import Params from "utils/params";

class EditLiga extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      imageLama: DefaultImage,
      image: DefaultImage,
      imageToDB: false,
      namaLiga: "",
      movePage: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(getDetailLiga(this.props.id));
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
    const { namaLiga } = this.state;

    event.preventDefault();
    if (namaLiga) {
      //Proses lanjut ke action firebasse
      this.props.dispatch(updateLiga(this.state));
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
    const { updateLigaResult, detailLigaResult } = this.props;
    if (updateLigaResult && prevProps.updateLigaResult !== updateLigaResult) {
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
    if (detailLigaResult && prevProps.detailLigaResult !== detailLigaResult) {
      this.setState({
        image: detailLigaResult.image,
        namaLiga: detailLigaResult.namaLiga,
        imageLama: detailLigaResult.image,
      });
    }
  }

  render() {
    const { image, namaLiga, movePage } = this.state;
    const { updateLigaLoading } = this.props;
    console.log(this.state);

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
                  <CardTitle tag="h4">Edit Liga</CardTitle>
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
                      {updateLigaLoading ? (
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
  updateLigaLoading: state.LigaReducer.updateLigaLoading,
  updateLigaResult: state.LigaReducer.updateLigaResult,
  updateLigaError: state.LigaReducer.updateLigaError,

  detailLigaLoading: state.LigaReducer.detailLigaLoading,
  detailLigaResult: state.LigaReducer.detailLigaResult,
  detailLigaError: state.LigaReducer.detailLigaError,
});

export default Params(connect(mapStateToProps, null)(EditLiga));
