const express = require('express');
const router = express.Router();

const { calcularValorFinal } = require('../services/calculo.service');

/**
 * @swagger
 * /api/calcularValorFinal:
 *   post:
 *     summary: Calcula el valor final de un producto
 *     description: Aplica descuento en porcentaje y luego IVA dinámico
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *                 example: ABC123
 *               nombre:
 *                 type: string
 *                 example: Producto demo
 *               costoBase:
 *                 type: number
 *                 example: 100000
 *               descuento:
 *                 type: number
 *                 example: 15
 *               iva:
 *                 type: number
 *                 example: 19
 *     responses:
 *       200:
 *         description: Cálculo exitoso
 *       400:
 *         description: Error de validación
 */
router.post('/calcularValorFinal', (req, res) => {

    const { codigo, nombre } = req.body;

    const costoBase = Number(req.body.costoBase);
    const descuento = Number(req.body.descuento || 0);
    const iva = Number(req.body.iva || 19);

    // 🔍 Debug
    console.log({ codigo, nombre, costoBase, descuento, iva });

    // ======================
    // VALIDACIONES
    // ======================

    if (!codigo || !/^[a-zA-Z0-9]+$/.test(codigo)) {
        return res.status(400).json({ mensaje: "Código inválido" });
    }

    if (!nombre || !/^[a-zA-Z\s]+$/.test(nombre)) {
        return res.status(400).json({ mensaje: "Nombre inválido" });
    }

    if (isNaN(costoBase) || costoBase <= 0) {
        return res.status(400).json({ mensaje: "Costo base inválido" });
    }

    if (isNaN(descuento) || descuento < 0 || descuento > 100) {
        return res.status(400).json({ mensaje: "Descuento debe estar entre 0 y 100%" });
    }

    if (isNaN(iva) || iva < 0 || iva > 100) {
        return res.status(400).json({ mensaje: "IVA inválido" });
    }

    // ======================
    // CÁLCULO
    // ======================

    const resultado = calcularValorFinal(costoBase, descuento, iva);

    return res.status(200).json({
        mensaje: "Cálculo exitoso",
        data: resultado
    });
});

module.exports = router;
