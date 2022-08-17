const Cars = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  try{
    const car = await Cars.getById(req.params.id);
    if (car) {
      req.existingCar = car;
      next()
    } else {
      next({ status: 404, message: `car with id ${req.params.id} not found` })
    }
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  try{
    const { vin, make, model, mileage } = req.body;

    if (vin === undefined) {
      next({ status: 400, message: "vin is missing" })
      return;
    }
    if (make === undefined) {
      next({ status: 400, message: "make is missing" })
      return;
    }
    if (model === undefined) {
      next({ status: 400, message: "model is missing" })
      return;
    }
    if (mileage === undefined) {
      next({ status: 400, message: "mileage is missing" })
      return;
    }

    next()

  } catch (err) {
    next(err)
  }
}

const checkVinNumberValid = (req, res, next) => {
  try{
    const isValidVin = vinValidator.validate(req.body.vin)
    console.log(isValidVin)
    if (isValidVin) {
      next()
    } else {
      next({ status: 400, message: `vin ${req.body.vin} is invalid` })
    }
  } catch (err) {
    next(err)
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try{
    const allCars = await Cars.getAll();
    const matchedCar = allCars.filter(car => car.vin === req.body.vin);

    if (matchedCar.length) {
      next({ status: 400, message: `vin ${req.body.vin} already exists` })
    } else {
      next()
    }

  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}
