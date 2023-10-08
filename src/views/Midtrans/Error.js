import React, { Component } from "react";
import { Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import Logo from "../../assets/img/logoUtama.svg";

export default class Error extends Component {
  render() {
    let search = window.location.search;
    let params = new URLSearchParams(search);

    const order_id = params.get("order_id");
    const transaction_status = params.get("transaction_status");

    return (
      <Row className="justify-content-center mt-5">
        <Col md={4}>
          <img src={Logo} className="rounded mx-auto d-block" alt="logo" />
          <Card>
            <CardHeader
              className="rounded mx-auto d-block"
              style={{ fontSize: 20, maxWidth: 270, textAlign: "center" }}
            >
              Maaf transaksi anda Gagal ! Silahkan coba lagi
            </CardHeader>
            <CardBody className="text-center">
              <p>ORDER ID : {order_id}</p>
              <p>STATUS TRANSAKSI : {transaction_status}</p>

              <Button color="primary" type="submit">
                Lanjutkan
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
