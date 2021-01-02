const express = require('express');
const { getAllTours, createTour, getTour, updateTour, deleteTour, checkID, checkBody, aliasTopTours, getTourStats, getMonthlyPlan, getToursWithin, getDistances, uploadTourImages, resizeTourImages } = require('./../controllers/tourController');
const { protect, restrictTo } = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

// router.param('id', checkID);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

// POST /tour/234gass/reviews
// GET /tour/234gass/reviews
// GET /tour/234gass/reviews/4548fad4

// router.route('/:tourId/reviews').post(protect, restrictTo('user'), createReview);
router.use('/:tourId/reviews', reviewRouter);

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(protect, restrictTo('admin', 'lead-guide', 'guide') ,getMonthlyPlan);

router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(getToursWithin);
// /tour-within?distance=233&cneter=-40,45&unit=mi
// /tour-within/233/center/-40,45/unit/mi

router.route('/distances/:latlng/unit/:unit').get(getDistances);

router.route('/').get(getAllTours)
    .post(protect, restrictTo('admin', 'lead-guide'), createTour);

router.route('/:id').get(getTour)
    .patch(protect, restrictTo('admin', 'lead-guide'), uploadTourImages, resizeTourImages, updateTour)
    .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;