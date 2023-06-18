const AppError = require('./appError');
const ObjectId = require('mongodb').ObjectID;

class TourAPIFeatures {
  constructor(model, queryString, next) {
    this.model = model;
    this.queryString = queryString;
    this.next = next;
    this.aggregation = null;
  }

  filter() {
    let queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludedFields.forEach((el) => {
      delete queryObj[el];
    });

    // Specific to tours: filter tours with startLocation within the box
    if (queryObj.box) {
      const [boxStart, boxEnd] = queryObj.box.split('to');
      const [boxStartLat, boxStartLgn] = boxStart.split(',');
      const [boxEndLat, boxEndLng] = boxEnd.split(',');

      if (!boxStartLat || !boxStartLgn || !boxEndLat || !boxEndLng) {
        this.next(
          new AppError(
            'Please provide latitude and longitude in format <boxSouthWestLat>,<boxSouthWestLng>to<boxNorthEastLat>,<boxNorthEastLng>',
            400
          )
        );
      }

      delete queryObj.box;

      queryObj.startLocation = {
        $geoWithin: {
          $box: [
            [+boxStartLgn, +boxStartLat],
            [+boxEndLng, +boxEndLat],
          ],
        },
      };
    }

    if (queryObj.category) {
      const categoriesQuery = Array.isArray(queryObj.category)
        ? [...queryObj.category]
        : [queryObj.category];
      queryObj.categories = { $in: categoriesQuery };
      delete queryObj.category;
    }

    if (queryObj.difficulty) {
      const difficultyQuery = Array.isArray(queryObj.difficulty)
        ? [...queryObj.difficulty]
        : [queryObj.difficulty];
      queryObj.difficulty = { $in: difficultyQuery };
    }

    if (queryObj.guides) {
      const guideQuery = Array.isArray(queryObj.guides)
        ? queryObj.guides.map((guide) => ObjectId(guide))
        : [ObjectId(queryObj.guides)];
      queryObj.guides = { $in: guideQuery };
    }

    if (queryObj.id) {
      const isArray = Array.isArray(queryObj.id);
      let idQuery = [];
      if (isArray) {
        queryObj.id.forEach((id) => {
          idQuery.push(ObjectId(id));
        });
      } else {
        idQuery = [ObjectId(queryObj.id)];
      }
      queryObj._id = { $in: idQuery };
      delete queryObj.id;
    }

    if (
      queryObj.price ||
      queryObj.groupSize ||
      queryObj.date ||
      queryObj.onlyAvailables
    ) {
      queryObj.currentAvailabilities = {
        $elemMatch: {},
      };

      if (queryObj.price) {
        queryObj.currentAvailabilities['$elemMatch'].price = {};
        if (queryObj.price?.lte)
          queryObj.currentAvailabilities['$elemMatch'].price['$lte'] =
            +queryObj.price.lte;
        if (queryObj.price?.lt)
          queryObj.currentAvailabilities['$elemMatch'].price['$lt'] =
            +queryObj.price.lt;
        if (queryObj.price?.gte)
          queryObj.currentAvailabilities['$elemMatch'].price['$gte'] =
            +queryObj.price.gte;
        if (queryObj.price?.gt)
          queryObj.currentAvailabilities['$elemMatch'].price['$gt'] =
            +queryObj.price.gt;
        if (queryObj.price?.eq)
          queryObj.currentAvailabilities['$elemMatch'].price['$eq'] =
            +queryObj.price.eq;
      }

      if (queryObj.groupSize) {
        queryObj.currentAvailabilities['$elemMatch'].maxGroupSize = {};
        if (queryObj.groupSize?.lte)
          queryObj.currentAvailabilities['$elemMatch'].maxGroupSize['$lte'] =
            +queryObj.groupSize.lte;
        if (queryObj.groupSize?.lt)
          queryObj.currentAvailabilities['$elemMatch'].maxGroupSize['$lt'] =
            +queryObj.groupSize.lt;
        if (queryObj.groupSize?.gte)
          queryObj.currentAvailabilities['$elemMatch'].maxGroupSize['$gte'] =
            +queryObj.groupSize.gte;
        if (queryObj.groupSize?.gt)
          queryObj.currentAvailabilities['$elemMatch'].maxGroupSize['$gt'] =
            +queryObj.groupSize.gt;
        if (queryObj.groupSize?.eq)
          queryObj.currentAvailabilities['$elemMatch'].maxGroupSize['$eq'] =
            +queryObj.groupSize.eq;
      }

      if (queryObj.date || queryObj.onlyAvailables === 'true') {
        queryObj.currentAvailabilities['$elemMatch'].date = {};
        if (queryObj.date?.lte)
          queryObj.currentAvailabilities['$elemMatch'].date['$lte'] = new Date(
            queryObj.date.lte
          );
        if (queryObj.date?.lt)
          queryObj.currentAvailabilities['$elemMatch'].date['$lt'] = new Date(
            queryObj.date.lt
          );
        if (queryObj.date?.gte || queryObj.onlyAvailables === 'true')
          queryObj.currentAvailabilities['$elemMatch'].date['$gte'] = queryObj
            .date?.gte
            ? new Date(queryObj.date.gte)
            : new Date(Date.now());
        if (queryObj.date?.gt)
          queryObj.currentAvailabilities['$elemMatch'].date['$gt'] = new Date(
            queryObj.date.gt
          );
        if (queryObj.date?.eq)
          queryObj.currentAvailabilities['$elemMatch'].date['$eq'] = new Date(
            queryObj.date.eq
          );
      }

      delete queryObj.price;
      delete queryObj.groupSize;
      delete queryObj.date;
      delete queryObj.onlyAvailables;
    }

    if (queryObj.duration) {
      const durationQuery = {};
      if (queryObj.duration?.lte)
        durationQuery['$lte'] = +queryObj.duration.lte;
      if (queryObj.duration?.lt) durationQuery['$lt'] = +queryObj.duration.lt;
      if (queryObj.duration?.gte)
        durationQuery['$gte'] = +queryObj.duration.gte;
      if (queryObj.duration?.gt) durationQuery['$gt'] = +queryObj.duration.gt;
      if (queryObj.duration?.eq) durationQuery['$eq'] = +queryObj.duration.eq;

      queryObj.duration = { ...durationQuery };
    }

    // if (!queryObj.showHiddenTours) {
    //   queryObj.hiddenTour = { $ne: true };
    // } else {
    //   delete queryObj.showHiddenTours;
    // }

    this.aggregateQuery = queryObj;

    return this;
  }

  search() {
    if (this.queryString.search)
      this.aggregateSearch = { $text: { $search: this.queryString.search } };
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      let sortBy = this.queryString.sort.split(',');
      const sortMap = {};

      sortBy.forEach((sortKey) => {
        let value = 1;
        let key = sortKey;
        if (sortKey[0] === '-') {
          value = -1;
          key = key.slice(1);
        }
        sortMap[key] = value;
      });
      this.aggregateSort = sortMap;
    } else {
      this.aggregateSort = { popularityIndex: -1, ratingsAvarage: -1 };
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',');
      const fieldsMap = {};

      fields.forEach((key) => {
        fieldsMap[key] = 1;
      });
      this.aggregateFields = fieldsMap;
    }
    return this;
  }

  paginate() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 100;
    const skip = limit * (page - 1);
    this.aggregatePagination = { skip, limit };

    return this;
  }

  createAggregation() {
    console.log('QUERY', this.aggregateQuery);
    console.log('SEARCH', this.aggregateSearch);
    console.log('SORT', this.aggregateSort);
    console.log('FIELDS', this.aggregateFields);
    console.log('PAGINATION', this.aggregatePagination);
    this.aggregation = this.model.aggregate([
      { $match: this.aggregateSearch || {} },
      // { $match: { hiddenTour: { $ne: true } } },
      {
        $addFields: {
          currentAvailabilities: {
            $filter: {
              input: '$availabilities',
              as: 'availability',
              cond: {
                $gte: ['$$availability.date', new Date(Date.now())],
              },
            },
          },
        },
      },
      {
        $addFields: {
          firstAvailability: {
            $min: '$currentAvailabilities.date',
          },
          lowerPrice: {
            $min: '$currentAvailabilities.price',
          },
          minGroupSizeCapacity: {
            $min: '$currentAvailabilities.maxGroupSize',
          },
          maxGroupSizeCapacity: {
            $max: '$currentAvailabilities.maxGroupSize',
          },
        },
      },
      {
        $addFields: {
          hasCurrentAvailabilities: {
            $cond: {
              if: { $ne: ['$firstAvailability', null] },
              then: true,
              else: false,
            },
          },
        },
      },
      { $match: this.aggregateQuery || {} },
      { $sort: this.aggregateSort || {} },
      { $project: this.aggregateFields || { __v: 0 } },
      {
        $facet: {
          data: [
            { $skip: this.aggregatePagination?.skip },
            { $limit: this.aggregatePagination?.limit },
          ],
          totalCount: [{ $count: 'total' }],
        },
      },
    ]);

    return this;
  }
}

module.exports = TourAPIFeatures;
