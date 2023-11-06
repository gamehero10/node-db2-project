const express = require('express');
const router = express.Router();
const Car = require('./cars-model');
const md = require('./cars-middleware');

router.get('/', async (req, res, next) => {
    try {
    const cars = await Car.getAll();
    res.json(cars);
    } catch(err) {
        next(err);
    }
})

router.get('/:id', md.checkCarId, async(req, res, next) => {
    res.json(req.car);
} )

router.post('/', md.checkCarPayload, md.checkVinNumberUnique, md.checkVinNumberValid, async(req, res, next) => {
    try {
        const newCar = await Car.create(req.body);
        res.status(201).json(newCar);
    } catch(err) {
        next(err);
    }
})











module.exports = router;
