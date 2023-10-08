import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { numberWithCommas } from "../../utils/numberFormat/index";

export default class Pesanans extends Component {
  render() {
    const { pesanans } = this.props;
    return (
      <div>
        {Object.keys(pesanans).map((keys, index) => (
          <Row key={keys}>
            <Col md={2}>
              <p>
                <img
                  src={pesanans[keys].product.gambar[0]}
                  alt="pesanan"
                  width="100"
                />
              </p>
            </Col>
            <Col md={5}>
              <p>{pesanans[keys].product.nama}</p>
              <p>Rp. {numberWithCommas(pesanans[keys].product.harga)}</p>
            </Col>
            <Col md={5}>
              <p>Pesan : {pesanans[keys].jumlahPesan}</p>
              <p>Rp. {numberWithCommas(pesanans[keys].totalHarga)}</p>
            </Col>
          </Row>
        ))}
      </div>
    );
  }
}
