import express from "express";

const router = express.Router();
router.get("/", (req, res) => {
  res.json({
    data: "Hello World",
  });
});

router.post("/login", (req, res) => {
  res.json({
    data: "Hello World",
  });
});

export default router;
