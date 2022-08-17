const Cars = require('./cars-model');

const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require('./cars-middleware');

const router = require('express').Router();


router.get('/', (req, res, next) => {
  try {
    Cars.getAll()
      .then(cars => {
        res.status(200).json(cars)
      })
  } catch (err) {
    next(err);
  }
})

router.get('/:id', checkCarId, (req, res, next) => {
  try {
    Cars.getById(req.params.id)
      .then(car => {
        res.status(200).json(car)
      })

  } catch (err) {
    next(err)
  }
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
  try{
    Cars.create(req.body)
      .then(car => {
        res.status(201).json(car);
      })

  } catch (err) {
    next(err);
  }
})

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message })
})


module.exports = router;