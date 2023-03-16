const AppError = require('./appError');

class APIFeatures {
  constructor(query, queryString, next) {
    this.query = query;
    this.queryString = queryString;
    this.next = next;
  }

  filter() {
    // Exclude unwanted fields
    const queryObj = { ...this.queryString };
    console.log(queryObj);
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
            'Please provide latitude and longitude in format <boxStartLat>,<boxStartLng>to<boxEndLat>,<boxEndLng>',
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

    // Adding the $ sign where needed (cause we don't want to pass it in the url)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-popularity -ratingsAvarage');
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

module.exports = APIFeatures;
