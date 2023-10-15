const favorits = require("../models/favorits");

const favoritsController = {
  getfavorits: async (req, res) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(400).json({
          status: "error",
          message: "user is required",
        });
      } else {
      }
      const allfavorits = await favorits.find({ userid: user._id });

      res.json({
        status: "success",
        message: "all favorits",
        data: allfavorits,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },

  addFavorits: async (req, res) => {
    try {
      const user = req.user;
      console.log(user);
      const { strMeal, strCategory, strMealThumb, strInstructions } = req.body;
      if (!strMeal || !strCategory || !strMealThumb || !strInstructions) {
        return res.status(400).json({
          status: "error",
          message: "all fields are required",
        });
      }
      const isFavoritsExsist = await favorits.findOne({
        userid: user._id,
        strMeal: strMeal,
      });

      console.log(isFavoritsExsist);

      if (isFavoritsExsist) {
        return res.status(400).json({
          status: "error",
          message: "This favorits is already exsist in your favorits",
        });
      } else {
        const newFavorits = new favorits({
          userid: user._id,
          strMeal: strMeal,
          strCategory: strCategory,
          strMealThumb: strMealThumb,
          strInstructions: strInstructions,
        });
        await newFavorits.save();
        return res.status(200).json({
          status: "success",
          message: "favorits added",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },

  deleteFavorits: async (req, res) => {
    try {
      const user = req.user;
      const id = req.body;
      console.log(id);
      console.log(user);

      if (!id) {
        return res.status(400).json({
          status: "error",
          message: "id is required",
        });
      }

      if (!user) {
        return res.status(400).json({
          status: "error",
          message: "user is required",
        });
      }

      const isFavoritsExsist = await favorits.findOne({
        _id: id.id,
        userid: user._id,
      });

      if (!isFavoritsExsist) {
        return res.status(400).json({
          status: "error",
          message: "favorits not found",
        });
      } else {
        await favorits.deleteOne({
          _id: id.id,
        });
        return res.status(200).json({
          status: "success",
          message: "favorits deleted",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
};

module.exports = favoritsController;
