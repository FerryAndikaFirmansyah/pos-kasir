import axios from 'axios';
import React, { Component } from 'react';
import { Button, Card, Container, ListGroup } from 'react-bootstrap';
import { API_URL } from '../components/utils/constants';
import { numberWithCommas } from "../components/utils/utils";

export default class Riwayat extends Component {

    state = {
        transaksi: []
    };

    componentDidMount() {
        axios.get(API_URL + "transaksi")
            .then(res => this.setState({ transaksi: res.data }))
            .catch(err => console.log(err));
    }

    render() {
        const { transaksi } = this.state;

        return (
            <Container className="mt-4">
                <h3><strong>Riwayat Transaksi</strong></h3>
                <hr />

                {transaksi.map((trx) => (
                    <Card className="mb-3" key={trx.id}>
                        <Card.Body>

                            <Card.Title>Transaksi #{trx.id}</Card.Title>
                            <Card.Subtitle className="text-muted mb-2">
                                {trx.tanggal}
                            </Card.Subtitle>

                            {/* METODE PEMBAYARAN */}
                            <p>Metode: <strong>{trx.metode.toUpperCase()}</strong></p>

                            {/* DISKON */}
                            {trx.diskon_persen > 0 && (
                                <p>Diskon Persen: {trx.diskon_persen}%</p>
                            )}

                            {trx.diskon_nominal > 0 && (
                                <p>Diskon Nominal: Rp. {numberWithCommas(trx.diskon_nominal)}</p>
                            )}

                            <ListGroup variant="flush">
                                {trx.menus.map(item => (
                                    <ListGroup.Item key={item.id}>
                                        {item.product.nama} x {item.jumlah}
                                        <span className="float-right">
                                            Rp. {numberWithCommas(item.total_harga)}
                                        </span>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>

                            <h5 className="mt-3">
                                Total:
                                <strong className="float-right">
                                    Rp. {numberWithCommas(trx.total_bayar)}
                                </strong>
                            </h5>

                            <Button
                                variant="primary"
                                onClick={() => this.props.history.push(`/struk/${trx.id}`)}
                                className="mt-2"
                            >
                                Lihat Struk
                            </Button>

                        </Card.Body>
                    </Card>
                ))}
            </Container>
        );
    }
}
