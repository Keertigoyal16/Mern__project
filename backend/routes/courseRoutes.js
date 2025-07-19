const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      id: 1,
      title: "React for Beginners",
      price: 499,
    },
    {
      id: 2,
      title: "Mastering Node.js",
      price: 699,
    }
  ]);
});

module.exports = router;
