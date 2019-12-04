const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticator");
const isAdmin = require("../middleware/rolesAuthenticator");

const {
  getRecords,
  getRecord,
  updateRecord,
  deleteRecord,
  addRecord
} = require("../controllers/recordsController");

router
  .route("/")
  .get(auth, getRecords)
  .post(auth, isAdmin, addRecord);

router
  .route("/:id")
  .get(auth, getRecord)
  .delete(auth, isAdmin, deleteRecord)
  .put(auth, isAdmin, updateRecord);

module.exports = router;
