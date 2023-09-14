const ObjectId = require('mongodb').ObjectID;

class BookingAPIFeatures {
  constructor(model, queryString, next) {
    this.model = model;
    this.queryString = queryString;
    this.next = next;
  }

  filter() {
    // Exclude unwanted fields
    let queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludedFields.forEach((el) => {
      delete queryObj[el];
    });

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

    if (queryObj.user) {
      const guideQuery = Array.isArray(queryObj.user)
        ? queryObj.user.map((guide) => ObjectId(guide))
        : [ObjectId(queryObj.user)];
      queryObj.user = { $in: guideQuery };
    }

    if (queryObj.tour) {
      const guideQuery = Array.isArray(queryObj.tour)
        ? queryObj.tour.map((guide) => ObjectId(guide))
        : [ObjectId(queryObj.tour)];
      queryObj.tour = { $in: guideQuery };
    }

    if (queryObj.date) {
      const date = { ...queryObj.date };
      queryObj.date = {};
      if (date?.lte) queryObj.date['$lte'] = new Date(date.lte);
      if (date?.lt) queryObj.date['$lt'] = new Date(date.lt);
      if (date?.gte) queryObj.date['$gte'] = new Date(date.gte);
      if (date?.gt) queryObj.date['$gt'] = new Date(date.gt);
      if (date?.eq) queryObj.date['$eq'] = new Date(date.eq);
    }

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
      this.aggregateSort = { date: 1 };
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
    const limit = +this.queryString.limit || 200;
    const skip = limit * (page - 1);
    this.aggregatePagination = { skip, limit };

    return this;
  }

  createAggregation() {
    this.aggregation = this.model.aggregate([
      { $match: this.aggregateSearch || {} },
      { $match: this.aggregateQuery || {} },
      { $sort: this.aggregateSort || {} },
      { $project: this.aggregateFields || { __v: 0 } },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'tours',
          localField: 'tour',
          foreignField: '_id',
          as: 'tour',
        },
      },
      {
        $project: {
          tour: {
            name: 1,
            duration: 1,
            imageCover: 1,
            slug: 1,
            meetingAddress: 1,
            _id: 1,
          },
          user: 1,
          date: 1,
          price: 1,
          kidPrice: 1,
          adults: 1,
          kids: 1,
          group: 1,
          totalPrice: 1,
          createdAt: 1,
          status: 1,
          cartId: 1,
          pin: 1,
          orderNumber: 1,
          paymentToken: 1,
          removeAt: 1,
          _id: 1,
        },
      },
      {
        $facet: {
          data: [
            { $skip: this.aggregatePagination?.skip || 0 },
            { $limit: this.aggregatePagination?.limit || 200 },
          ],
          totalCount: [{ $count: 'total' }],
        },
      },
    ]);

    return this;
  }
}

module.exports = BookingAPIFeatures;
