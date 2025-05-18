const express = require('express');
const router = express.Router();
const {
  createVehicle,
  getAllVehicles,
  updateVehicle,
  deleteVehicle,
  addTrip,
  updateTrip,
  deleteTrip,
  getLongTrips,
  getTripsFromCities,
  getTripsAfterDate,
  getVehicleTypes
} = require('../controllers/vehicleController');

router.post('/', createVehicle);
router.get('/', getAllVehicles);
router.put('/:id', updateVehicle);
router.delete('/:id', deleteVehicle);

router.post('/:id/trips', addTrip);
router.put('/:id/trips/:tripIndex', updateTrip);
router.delete('/:id/trips/:tripIndex', deleteTrip);

router.get('/query/long-trips', getLongTrips);
router.get('/query/from-cities', getTripsFromCities);
router.get('/query/after-date', getTripsAfterDate);
router.get('/query/by-type', getVehicleTypes);

module.exports = router;