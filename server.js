const express = require('express');
const path = require('path');

// 📚 Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

// ======================
// 🔌 MIDDLEWARES
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir frontend (HTML)
app.use(express.static(path.join(__dirname, 'public')));

// ======================
// 📚 CONFIGURACIÓN SWAGGER
// ======================
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Productos",
            version: "1.0.0",
            description: "API para cálculo de productos con IVA y descuentos"
        }
    },
    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// UI Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ======================
// 🚦 RUTAS API
// ======================
const productosRoutes = require('./routes/productos.routes');
app.use('/api', productosRoutes);

// ======================
// 🏠 RUTA PRINCIPAL
// ======================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ======================
// 🚀 SERVIDOR
// ======================
app.listen(3010, () => {
    console.log('=================================');
    console.log('🚀 Servidor: http://localhost:3010');
    console.log('📚 Swagger: http://localhost:3010/api-docs');
    console.log('=================================');
});