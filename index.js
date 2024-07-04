const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Mock user data
const users = [
  { id: 1, username: "user", password: "password", token: "fake-jwt-token" },
];

// Login route
app.post("/api/auth", (req, res) => {
  const userData = req.body;
  const { username, password } = userData;

  // Check if the username exists
  const user = users.find((u) => u.username === username);

  if (user) {
    // Check if the password matches
    if (user.password === password) {
      res
        .status(200)
        .send({
          user: { username: user.username, token: user.token },
          message: "Login Success",
        });
    } else {
      res.send({ message:"Password Mismatch" });
    }
  } else {
    res.send({ message: "User Unvalid" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
