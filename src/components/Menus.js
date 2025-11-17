import React from "react";
import { Badge, Card, Col } from "react-bootstrap";
import { numberWithCommas } from "./utils/utils";

const Menus = ({ menu, masukKeranjang, keranjangs }) => {

    // Cari apakah produk ini sudah ada di keranjang
    const keranjangItem = keranjangs.find(
        (k) => k.product.id === menu.id
    );

    const jumlah = keranjangItem ? keranjangItem.jumlah : 0;
    const totalHarga = keranjangItem ? keranjangItem.total_harga : 0;

    return (
        <Col md={4} xs={6} className="mb-4">
            <Card
                className="shadow position-relative"
                onClick={() => masukKeranjang(menu)}
                style={{ cursor: "pointer" }}
            >

                {/* GAMBAR */}
                <Card.Img
                    variant="top"
                    src={`images/assets/${menu.category.nama.toLowerCase()}/${menu.gambar}`}
                    style={{
                        height: "200px",
                        objectFit: "cover",
                        width: "100%"
                    }}
                />

                {/* BADGE JUMLAH (muncul kalau jumlah > 0) */}
                {jumlah > 0 && (
                    <Badge
                        bg="success"
                        pill
                        className="position-absolute"
                        style={{
                            top: "10px",
                            right: "10px",
                            fontSize: "14px"
                        }}
                    >
                        {jumlah}
                    </Badge>
                )}

                <Card.Body>
                    <Card.Title className="d-flex justify-content-between">
                        <span>{menu.nama}</span>
                        <small><strong>({menu.kode})</strong></small>
                    </Card.Title>

                    {/* Harga produk */}
                    <Card.Text className="mb-1">
                        Rp. {numberWithCommas(menu.harga)}
                    </Card.Text>

                    {/* Total harga (OPSIONAL, hanya kalau di keranjang) */}
                    {jumlah > 0 && (
                        <Card.Text className="text-success">
                            Total: <strong>Rp. {numberWithCommas(totalHarga)}</strong>
                        </Card.Text>
                    )}
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Menus;
