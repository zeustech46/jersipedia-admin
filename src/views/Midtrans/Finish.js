import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Spinner,
} from "reactstrap";
import Logo from "../../assets/img/logoUtama.svg";
import { updatePesanan } from "../../action/PesananAction";
import { connect } from "react-redux";

class Finish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order_id: "",
      transaction_status: "",
    };
  }

  componentDidMount() {
    // ?order_id=TEST-1696693136502-rnB3Qifs5jfnn0WMoyG0AVkfZIm1&status_code=201&transaction_status=pending

    let search = window.location.search;
    let params = new URLSearchParams(search);

    const order_id = params.get("order_id");
    const transaction_status = params.get("transaction_status");

    if (order_id) {
      this.setState({
        order_id: order_id,
        transaction_status: transaction_status,
      });
    }

    //masuk ke action update Status History
    this.props.dispatch(updatePesanan(order_id, transaction_status));
  }

  toHistory = () => {
    window.ReactNativeWebView.postMessage("Selesai");
  };

  render() {
    const { transaction_status, order_id } = this.state;
    const { updatePesananLoading } = this.props;
    return (
      <Row className="justify-content-center mt-5">
        {updatePesananLoading ? (
          <Spinner color="primary" />
        ) : (
          <Col md={4}>
            <img src={Logo} className="rounded mx-auto d-block" alt="logo" />
            <Card>
              <CardHeader
                className="rounded mx-auto d-block"
                style={{ fontSize: 20, maxWidth: 270, textAlign: "center" }}
              >
                Selamat Transaksi Anda Berhasil !
              </CardHeader>
              <CardBody className="text-center">
                <p>
                  {transaction_status === "pending" &&
                    "Untuk selanjutnya harap selesaikan pembayaran jika belum bayar dan silahkan updates status pembayaran di halaman Story"}
                </p>
                <p>ORDER ID : {order_id}</p>
                <p>
                  STATUS TRANSAKSI :{" "}
                  {transaction_status === "settlement"
                    ? "Lunas"
                    : transaction_status}
                </p>

                <Button
                  color="primary"
                  type="submit"
                  onClick={() => this.toHistory()}
                >
                  Lanjutkan
                </Button>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  updatePesananLoading: state.PesananReducer.updatePesananLoading,
});

export default connect(mapStateToProps, null)(Finish);
