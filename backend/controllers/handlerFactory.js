const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let doc = null;
    if (req.body.startLocation) {
      console.log(req.body.startLocation, req.body.locations);
      const bodyObj = { ...req.body };
      delete bodyObj.startLocation;
      doc = await Model.findByIdAndUpdate(
        req.params.id,
        {
          ...bodyObj,
          $set: {
            startLocation: {
              type: 'Point',
              coordinates: [
                req.body.startLocation.coordinates[0],
                req.body.startLocation.coordinates[1],
              ],
              description: req.body.startLocation.description,
            },
          },
        },
        {
          new: true,
          runValidators: true, // The validators run again when we upadate a tour
        }
      );
    } else {
      doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true, // The validators run again when we upadate a tour
      });
    }

    if (!doc) {
      return next(new AppError('No document found with that id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: newDoc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions && popOptions.length > 0) {
      popOptions.forEach((popOption) => {
        query = query.populate(popOption);
      });
    }

    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    let features = new APIFeatures(Model.find(filter), req.query, next)
      .filter()
      .sort()
      .limitFields();

    const featuresWithPagination = new APIFeatures(
      Model.find(filter),
      req.query,
      next
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const count = await features.query.countDocuments();
    const doc = await featuresWithPagination.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      totalResults: count,
      data: {
        data: doc,
      },
    });
  });
