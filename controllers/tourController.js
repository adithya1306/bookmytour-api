/* eslint-disable */
const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');

// Top Tours Aliasing using a middleware
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingAverage';
  next();
}



exports.getAllTours = async (req, res) => {
  try {
    // Execution
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      //.limit()
      //.paginate();
    
    const tours = await features.query;
  
    res.status(200).json({
      status: 'success',
      data: {
        tourList: tours
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: 'record not found',
      error: err
    })
  }
};

exports.getTour = async (req, res) => {
  try {
    const tourId = await Tour.findById(req.params.id);
    console.log(tourId);

    res.status(200).json({
      status: 'success',
      data: {
        tour: tourId
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: 'record not found'
    })
  }
}

exports.createTour = async (req, res) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour
    }
  });
}

exports.updateTours = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: 'record not found',
      error: err
    })
  }
}

exports.deleteTour = async (req, res) => {
  await Tour.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "deletion success"
  });
}

exports.getTourStats = async (req,res) => {
  try{
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: {$gte : 4.5} }
      },
      {
        $group: {
          _id: {$toUpper: '$difficulty'},
          numberofTours: {$sum: 1},
          avgRating: {$avg: '$ratingsAverage'},
          avgPrice: {$avg: '$price'},
          minPrice: {$min: '$price'},
          maxPrice: {$max: '$price'}
        }
      },
      {
        $sort: {
          avgPrice: 1
        }
      }
    ])

    res.status(200).json({
      message: 'success',
      data: stats
    })
  }catch(err){
    res.status(404).json({
      message: 'rec not found'
    });
  }
}

exports.getMonthlyPlan = async (req,res) => {
  try{
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          }
        }
      },
      {
        $group: {
          _id: {$month : '$startDates'},
          numTourStarts: { $sum: 1},
          tours: { $push: '$name'}
        }
      },
      {
        $addFields: {
          month: '$_id'
        }
      }
    ]);

    res.status(200).json({
      message: 'success',
      data: {
        plan
      }
    });
  }catch(err){

  }
}