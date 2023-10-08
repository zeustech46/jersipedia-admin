import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getListPesanan } from "action/PesananAction";
import { numberWithCommas } from "../../utils/numberFormat/index";
import Pesanans from "../../components/Pesanans/index";

class ListPesanan extends Component {
  componentDidMount() {
    this.props.dispatch(getListPesanan());
  }

  render() {
    const { listPesananResult } = this.props;
    console.log(listPesananResult);
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Col className="d-flex justify-content-between" md="12">
                  <CardTitle tag="h4">List Semua Pesanan</CardTitle>
                  <Link className="btn btn-primary">+ Tambah Pesanan</Link>
                </Col>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>No.</th>
                      <th>Tanggal</th>
                      <th>Detail Pesanan</th>
                      <th className="text-center">Total Harga</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(listPesananResult).map((key, index) => (
                      <tr>
                        <td className="align-top" align="center">
                          {index + 1}
                        </td>
                        <td className="align-top">
                          <p>{listPesananResult[key].tanggal}</p>
                          <p style={{ fontWeight: "bold" }}>ID User :</p>
                          <p style={{ maxWidth: "130px" }}>
                            {listPesananResult[key].user}
                          </p>
                        </td>
                        <td>
                          <Pesanans
                            pesanans={listPesananResult[key].pesanans}
                          />
                        </td>
                        <td className="align-top" align="right">
                          <p>
                            Harga : Rp.{" "}
                            {numberWithCommas(
                              listPesananResult[key].totalHarga
                            )}{" "}
                          </p>
                          <p>
                            Ongkir : Rp.{" "}
                            {numberWithCommas(listPesananResult[key].ongkir)}{" "}
                          </p>
                          <p style={{ fontWeight: "bold" }}>
                            Rp.{" "}
                            {numberWithCommas(
                              listPesananResult[key].totalHarga +
                                listPesananResult[key].ongkir
                            )}
                          </p>
                        </td>
                        <td className="align-top">
                          {listPesananResult[key].status}
                        </td>
                        <td className="align-top">
                          <a
                            href={listPesananResult[key].url}
                            className="btn btn-warning"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="nc-icon nc-money-coins" /> Midtrans
                          </a>
                        </td>
                      </tr>
                    ))}
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
  listPesananResult: state.PesananReducer.listPesananResult,
  listPesananLoading: state.PesananReducer.listPesananLoading,
});

export default connect(mapStateToProps, null)(ListPesanan);
