const Products = require("../models/Product");

// Filter, sorting and paginating

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    console.log({ before: queryObj }); //before delete page
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    console.log({ after: queryObj }); //after delete page

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const productController = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(
        Products.find({ stock: { $gte: 1 } }),
        req.query
      )
        .filtering()
        .sorting()
        .paginating();

      const products = await features.query;

      res.json({
        status: "success",
        result: products.length,
        products: products,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        brand,
        price,
        description,
        content,
        images,
        category,
        gender,
        featured,
        stock,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });

      const product = await Products.findOne({ product_id });
      if (product)
        return res.status(400).json({ msg: "This product already exists." });

      const newProduct = new Products({
        product_id,
        title,
        brand,
        price,
        description,
        content,
        images,
        category,
        gender,
        featured,
        stock,
      });

      await newProduct.save();
      res.json({ msg: "Created a product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        title,
        brand,
        price,
        description,
        content,
        images,
        category,
        gender,
        featured,
        stock,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });

      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title,
          brand,
          price,
          description,
          content,
          images,
          category,
          gender,
          featured,
          stock,
        }
      );

      res.json({ msg: "Updated a Product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getCartProduct: async (req, res) => {
    try {
      const { id } = req.body;
      const prod = await Products.find({ _id: id });
      if (!prod) {
        return res.status(400).json({ msg: "Product does not exist." });
      }
      res.json(prod);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addWomenFeaturedProduct: async (req, res) => {
    try {
      let featuredWomen = [];
      featuredWomen = await Products.find({
        featured: true,
        gender: "damas",
        stock: { $gte: 1 },
      }).exec();
      if (!featuredWomen)
        return res
          .status(400)
          .json({ msg: "No products with featured equals true." });
      res.json(featuredWomen);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addMenFeaturedProduct: async (req, res) => {
    try {
      const featuredMen = await Products.find({
        featured: true,
        gender: "caballeros",
        stock: { $gte: 1 },
      }).exec();
      if (!featuredMen)
        return res
          .status(400)
          .json({ msg: "No products with featured equals true." });
      res.json(featuredMen);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getWomenProducts: async (req, res) => {
    try {
      const womenProducts = await Products.find({
        gender: "damas",
        stock: { $gte: 1 },
      }).exec();
      if (!womenProducts)
        return res
          .status(400)
          .json({ msg: "No products with gender equals women." });
      res.json(womenProducts);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getMenProducts: async (req, res) => {
    try {
      const menProducts = await Products.find({
        gender: "caballeros",
        stock: { $gte: 1 },
      }).exec();
      if (!menProducts)
        return res
          .status(400)
          .json({ msg: "No products with gender equals men." });
      res.json(menProducts);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getFabricProducts: async (req, res) => {
    try {
      const fabricProducts = await Products.find({
        category: "fabric",
        stock: { $gte: 1 },
      }).exec();
      if (!fabricProducts)
        return res
          .status(400)
          .json({ msg: "No products with category equals fabric." });
      res.json(fabricProducts);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getBoyProducts: async (req, res) => {
    try {
      const boyProducts = await Products.find({
        gender: "boy",
        stock: { $gte: 1 },
      }).exec();
      if (!boyProducts)
        return res
          .status(400)
          .json({ msg: "No products with gender equals boy." });
      res.json(boyProducts);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getGirlProducts: async (req, res) => {
    try {
      const girlProducts = await Products.find({
        gender: "girl",
        stock: { $gte: 1 },
      }).exec();
      if (!girlProducts)
        return res
          .status(400)
          .json({ msg: "No products with gender equals girl." });
      res.json(girlProducts);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAccesoriesProducts: async (req, res) => {
    try {
      const accesoriesProducts = await Products.find({
        category: "accesories",
        stock: { $gte: 1 },
      }).exec();
      if (!accesoriesProducts)
        return res
          .status(400)
          .json({ msg: "No products with category equals accesories." });
      res.json(accesoriesProducts);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getSchoolProducts: async (req, res) => {
    try {
      const schoolProducts = await Products.find({
        categoy: "school",
        stock: { $gte: 1 },
      }).exec();
      if (!schoolProducts)
        return res
          .status(400)
          .json({ msg: "No products with category equals school." });
      res.json(schoolProducts);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productController;
