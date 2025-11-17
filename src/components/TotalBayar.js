import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { API_URL } from "./utils/constants";
import { numberWithCommas } from "./utils/utils";

class TotalBayar extends Component {
    state = {
        metode: "cash",
        diskon: 0,
        diskonPersen: 0
    };

    hitungTotalSetelahDiskon = (total) => {
        let dn = parseInt(this.state.diskon) || 0;
        let dp = parseInt(this.state.diskonPersen) || 0;

        let hasil = total;

        if (dp > 0) hasil -= (total * dp) / 100;
        hasil -= dn;

        return hasil < 0 ? 0 : hasil;
    };

    submitTotalBayar = (totalBayar) => {
        const totalAkhir = this.hitungTotalSetelahDiskon(totalBayar);

        const transaksi = {
            id: "TRX-" + Date.now(),
            tanggal: new Date().toLocaleString(),
            total_bayar: totalAkhir,
            metode: this.state.metode,
            diskon_nominal: this.state.diskon,
            diskon_persen: this.state.diskonPersen,
            menus: this.props.keranjangs,
        };

        axios.post(API_URL + "transaksi", transaksi)
            .then(() => {
                this.props.history.push("/sukses");
            })
            .catch(err => console.log(err));
    };

    render() {
        const totalBayar = this.props.keranjangs.reduce(
            (sum, item) => sum + item.total_harga,
            0
        );

        const totalAkhir = this.hitungTotalSetelahDiskon(totalBayar);

        return (
            <>
                {/* DESKTOP (tidak fixed) */}
                <div className="d-none d-md-block bg-white border-top p-3 mt-3 rounded shadow-sm">
                    <Row>
                        <Col>

                            {/* DISKON */}
                            <Form.Group>
                                <Form.Label>Diskon (%)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={this.state.diskonPersen}
                                    onChange={(e) => this.setState({ diskonPersen: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mt-2">
                                <Form.Label>Diskon (Rp)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={this.state.diskon}
                                    onChange={(e) => this.setState({ diskon: e.target.value })}
                                />
                            </Form.Group>

                            {/* METODE */}
                            <Form.Group className="mt-3">
                                <Form.Label>Metode Pembayaran</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={this.state.metode}
                                    onChange={(e) => this.setState({ metode: e.target.value })}
                                >
                                    <option value="cash">Cash</option>
                                    <option value="qris">QRIS</option>
                                    <option value="transfer">Transfer</option>
                                </Form.Control>
                            </Form.Group>

                            {/* TOTAL */}
                            <h4 className="mt-3">
                                Total:
                                <strong className="float-right">
                                    Rp. {numberWithCommas(totalAkhir)}
                                </strong>
                            </h4>

                            <Button
                                variant="primary"
                                className="w-100 mt-3"
                                size="lg"
                                onClick={() => this.submitTotalBayar(totalBayar)}
                            >
                                <FontAwesomeIcon icon={faShoppingCart} /> BAYAR
                            </Button>

                        </Col>
                    </Row>
                </div>

                {/* MOBILE (tetap fixed) */}
                <div className="fixed-bottom d-md-none bg-white border-top p-2">
                    <h5>
                        Total:
                        <strong className="float-right">
                            Rp. {numberWithCommas(totalAkhir)}
                        </strong>
                    </h5>

                    <Button
                        variant="primary"
                        className="w-100 mt-2"
                        size="lg"
                        onClick={() => this.submitTotalBayar(totalBayar)}
                    >
                        <FontAwesomeIcon icon={faShoppingCart} /> BAYAR
                    </Button>
                </div>
            </>
        );
    }
}

export default withRouter(TotalBayar);
