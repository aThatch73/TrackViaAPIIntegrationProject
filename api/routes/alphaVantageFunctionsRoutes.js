/**
 * @swagger
 * components:
 *   schemas:
 *     Functions:
 *       type: object
 *       example:
 *         'Functions':
 *          - 'CURRENCY_EXCHANGE_RATE'
 *          - 'FX_INTRADAY'
 */

 /**
  * @swagger
  * functions:
  * /av/functions:
  *   get:
  *     summary: Gets available AlphaVantange functions
  *     tags: [Functions]
  *     responses:
  *       200:
  *         description: The Available AlphaVantage Functions.
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Functions'
 */

const express = require('express');
const router = express.Router();

const configs = require('../../config/config').configs;

router.get('/functions', async (req, res) => {
    res.json({
        functions: configs.functions
    });
});

module.exports = router;
