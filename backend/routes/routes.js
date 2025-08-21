const express = require('express');
const router = express.Router();
const {createConcern, getAllConcerns} = require('../controllers/concern.controller');
const { createTreatment, getAllTreatments } = require('../controllers/treatment.controller');
const { createPackage, getAllPackages } = require('../controllers/package.controller');
const { createEnquiry, getEnquiry } = require('../controllers/enquiry.controller');

router.post("/add-concern",createConcern)
router.get("/get-all-concern",getAllConcerns)


router.post("/add-treatment",createTreatment)
router.get("/get-all-treatment",getAllTreatments)

router.post("/add-package",createPackage)
router.get("/get-all-package", getAllPackages)

router.post("/create-enquiry",createEnquiry);
router.get("/get-all-enquiry", getEnquiry);
module.exports = router;