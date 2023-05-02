const AppError = require('./appError');

class APIFeaturesCopy {
  constructor(query, queryString, next) {
    // this.aggragation = query;
    this.query = query;
    this.queryString = queryString;
    this.next = next;
  }

  filter() {
    // Exclude unwanted fields
    let queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
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
            [boxStartLgn, boxStartLat],
            [boxEndLng, boxEndLat],
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

    if (
      queryObj.price ||
      queryObj.groupSize ||
      queryObj.date ||
      queryObj.onlyAvailables
    ) {
      queryObj.availabilities = {
        $elemMatch: {
          price: queryObj.price ? queryObj.price : undefined,
          maxGroupSize: queryObj.groupSize ? queryObj.groupSize : undefined,
          date: queryObj.date
            ? queryObj.date
            : queryObj.onlyAvailables === 'true'
            ? { gte: new Date(Date.now()) }
            : undefined,
        },
      };
      delete queryObj.price;
      delete queryObj.groupSize;
      delete queryObj.date;
      delete queryObj.onlyAvailables;
    }

    if (queryObj.search) {
      queryObj['$text'] = { $search: queryObj.search };
      delete queryObj.search;
    }

    // Adding the $ sign where needed (cause we don't want to pass it in the url)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      let sortBy = this.queryString.sort.split(',').join(' ');
      // sortBy = sortBy.replace('pricing', 'availabilities.price');
      // sortBy = sortBy.replace('lastminute', 'first');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-popularityIndex -ratingsAvarage');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    if (this.queryString.limit) {
      const page = +this.queryString.page || 1;
      const limit = +this.queryString.limit;
      const skip = limit * (page - 1);
      this.query = this.query.skip(skip).limit(limit);
    }

    return this;
  }
}

module.exports = APIFeaturesCopy;