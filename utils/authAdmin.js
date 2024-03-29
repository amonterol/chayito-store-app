//Metodo para verificar si el usuario tiene los privilegios de administrador

const User = require("../models/User");

const authAdmin = async (req, res, next) => {
  try {
    // Get user information by id
    const user = await User.findOne({
      _id: req.user.id,
    });
    //Verificamos si el usuario tiene role de administrador o sea role = 0
    if (user.role === 0)
      return res.status(400).json({ msg: "Admin resources access denied" });

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authAdmin;
