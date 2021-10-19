const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  register: async (req, res) => {
    try {
      //Capturamos la informacion digitada por el usuario en el formulario de registro
      const { name, email, password } = req.body;

      //Consultamos la base de datos para
      //Verificar que el email no este ya registrado en la base de datos
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "The email already exists." });
      }

      //Verifica la longitud del password que se establecio como minimo en 6 caracteres alfanumericos
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters long." });

      // Encripta el password del usuario
      const passwordHash = await bcrypt.hash(password, 10);

      //Instancia un nuevo usuario con los datos digitados por el usuario
      const newUser = new User({
        name,
        email,
        password: passwordHash,
      });

      // Registra al nuevo usuario en la base de datos
      await newUser.save();

      //Establece el token para autenticacion usando jsonwebtoken
      //basado en los metodos descritos
      const accesstoken = createAccessToken({ id: newUser._id }); //linea 56
      const refreshtoken = createRefreshToken({ id: newUser._id }); //linea 59

      //Almacenamos el nuevo token en una cookie para accederlo posteriormente
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({ accesstoken }); //No borrar

      //res.json({ msg: "RegisterSuccess!!!" });
      //res.json({ password, passwordHash });
      //res.json({ newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      //Capturamos la informacion digitada por el usuario en el formulario de inicio de sesion
      const { email, password } = req.body;

      //Consultamos la base de datos para
      //Verificar que el email no este ya registrado en la base de datos
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "User does not exist." });
      }

      //Verificamos que el  password ingresado sea el registrado en la base de datos
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect password." });
      }

      // If login success , create access token and refresh token
      //res.json({ msg: "Login Success!" });
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      //Almacenamos el nuevo token en una cookie para accederlo posteriormente
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        //maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        return res.status(400).json({ msg: "User does not exist." });
      }
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: (req, res) => {
    const rf_token = req.cookies.refreshtoken;
    //res.json({ rf_token });

    try {
      if (!rf_token) {
        return res.status(400).json({ msg: "Please Login or Register 1" });
      }

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(400).json({ msg: "Please Login or Register 2 " });
        }
        const accesstoken = createAccessToken({ id: user.id });
        //res.json({ user, accesstoken });
        res.json({ accesstoken }); //NO BORRAR
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addCart: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      );

      return res.json({ msg: "Added to cart" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  /*  history: async (req, res) => {
    try {
      const history = await Payments.find({ user_id: req.user.id });

      res.json(history);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }, */
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userController;
