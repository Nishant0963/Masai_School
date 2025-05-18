const Vehicle = require('../models/Vehicle');

exports.createVehicle = async (req, res, next) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    next(err);
  }
};

exports.getAllVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

exports.updateVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(vehicle);
  } catch (err) {
    next(err);
  }
};

exports.deleteVehicle = async (req, res, next) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    next(err);
  }
};

exports.addTrip = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    vehicle.trips.push(req.body);
    await vehicle.save();
    res.json(vehicle);
  } catch (err) {
    next(err);
  }
};

exports.updateTrip = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (vehicle && vehicle.trips[req.params.tripIndex]) {
      vehicle.trips[req.params.tripIndex] = req.body;
      await vehicle.save();
      res.json(vehicle);
    } else {
      res.status(404).json({ message: 'Trip not found' });
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (vehicle) {
      vehicle.trips.splice(req.params.tripIndex, 1);
      await vehicle.save();
      res.json(vehicle);
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (err) {
    next(err);
  }
};

exports.getLongTrips = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({ 'trips.distance': { $gte: 200 } });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

exports.getTripsFromCities = async (req, res, next) => {
  try {
    const cities = ['Delhi', 'Mumbai', 'Bangalore'];
    const vehicles = await Vehicle.find({ 'trips.startLocation': { $in: cities } });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

exports.getTripsAfterDate = async (req, res, next) => {
  try {
    const date = new Date('2024-01-01');
    const vehicles = await Vehicle.find({ 'trips.startTime': { $gte: date } });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

exports.getVehicleTypes = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({ type: { $in: ['car', 'truck'] } });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};