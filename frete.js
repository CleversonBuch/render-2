
const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = '5b3ce3597851110001cf62480241b7b514234bda8125ce1c65407f55';
const ORIGEM = '83601030';
const PRECO_POR_KM = 2.5;

router.post('/', async (req, res) => {
  const { destino } = req.body;

  if (!destino) {
    return res.status(400).json({ error: 'Destino é obrigatório' });
  }

  try {
    const response = await axios.get('https://api.openrouteservice.org/v2/directions/driving-car', {
      params: {
        start: '-49.2775,-25.0996', // Coordenadas fixas de origem (ex: Campo Largo)
        end: destino
      },
      headers: {
        'Authorization': API_KEY
      }
    });

    const distancia = response.data.features[0].properties.summary.distance / 1000; // em KM
    const valorFrete = (distancia * PRECO_POR_KM).toFixed(2);

    res.json({
      distancia_km: distancia.toFixed(2),
      valor_frete: valorFrete
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao calcular rota', detalhes: error.message });
  }
});

module.exports = router;
