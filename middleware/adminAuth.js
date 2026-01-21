// middleware/adminAuth.js
module.exports = function(req, res, next) {
  const { adminPassword } = req.body;

  if (adminPassword === process.env.ADMIN_PASSWORD) {
    return next(); // Password correct → continue
  }

  return res.status(403).send("Forbidden: Incorrect admin password");
};
