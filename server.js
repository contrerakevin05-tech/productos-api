const express = require('express');
const path = require('path');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

// ======================
// MIDDLEWARES
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos (si usas public para css/js)
app.use(express.static(path.join(__dirname, 'public')));

// ======================
// SWAGGER CONFIG
// ======================
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Productos",
            version: "1.0.0",
            description: "API con IVA y descuentos"
        }
    },
    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ======================
// RUTAS API
// ======================
const productosRoutes = require('./routes/productos.routes');
app.use('/api', productosRoutes);

// ======================
// FRONTEND (INDEX FUERA DE PUBLIC)
// ======================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ======================
// SERVER
// ======================
const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    console.log('==============================');
    console.log(`🚀 Servidor: http://localhost:${PORT}`);
    console.log(`📚 Swagger: http://localhost:${PORT}/api-docs`);
    console.log('==============================');
});
