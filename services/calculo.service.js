function calcularValorFinal(costoBase, descuento = 0, iva = 19) {

    const descuentoAplicado = costoBase * (descuento / 100);
    const precioConDescuento = costoBase - descuentoAplicado;

    const valorIVA = precioConDescuento * (iva / 100);
    const valorFinal = precioConDescuento + valorIVA;

    return {
        descuentoAplicado,
        precioConDescuento,
        valorIVA,
        valorFinal,
        ivaUsado: iva
    };
}

module.exports = {
    calcularValorFinal
};
