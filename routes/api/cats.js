const express = require("express");
const router = express.Router();
const Cats = require("../../model/cats");
const {
  validationCreateCat,
  validationUpdateStatusCat,
  validationUpdateCat,
} = require("./valid-cat-router");

router.get("/", async (req, res, next) => {
  try {
    const cats = await Cats.getAll();
    return res.json({
      status: "success",
      code: 200,
      data: {
        cats,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const cat = await Cats.getById(req.params.id);
    if (cat) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          cat,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", validationCreateCat, async (req, res, next) => {
  try {
    const cat = await Cats.create(req.body);
    return res.status(201).json({
      status: "success",
      cade: 200,
      data: {
        cat,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validationUpdateCat, async (req, res, next) => {
  try {
    const cat = await Cats.update(req.params.id, req.body);
    if (cat) {
      return res.json({
        status: "success",
        cade: 200,
        data: {
          cat,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        cade: 404,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const cat = await Cats.remove(req.params.id);
    if (cat) {
      return res.json({
        status: "success",
        cade: 200,
        data: {
          cat,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        cade: 404,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", validationUpdateStatusCat, async (req, res, next) => {
  try {
    const cat = await Cats.update(req.params.id, req.body);
    if (cat) {
      return res.json({
        status: "success",
        cade: 200,
        data: {
          cat,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        cade: 404,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
