const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const Review = require('../models/reviewModel');
const ObjectId = require('mongodb').ObjectID;

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const queryObj = { _id: ObjectId(req.params.id) };
    if (req.user.role === 'user') queryObj.user = ObjectId(req.user._id);
    const doc = await Model.findOneAndDelete(queryObj);

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
    // console.log('GET ALL', req.query);
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

    let numberOfHikers = undefined;
    if (req.params.getHikers) {
      const allDocs = await features.query;
      numberOfHikers = allDocs.reduce(
        (acc, hiker) => acc + hiker.adults + hiker.kids,
        0
      );
    }

    let avgRating = undefined;
    if (req.params.getAvgRating) {
      const allDocs = await features.query;
      console.log({ allDocs });
      const sum = allDocs.reduce((acc, review) => acc + review.rating, 0);
      avgRating = Math.trunc((sum / allDocs.length) * 100) / 100;
    }

    const count = await features.query.countDocuments();

    const docs = await featuresWithPagination.query;

    res.status(200).json({
      status: 'success',
      results: docs.length,
      numberOfHikers,
      avgRating,
      totalResults: count,
      data: {
        data: docs,
      },
    });
  });
