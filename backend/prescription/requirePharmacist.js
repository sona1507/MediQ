export const requirePharmacist = (req, res, next) => {
  if (req.user.role !== "pharmacist") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
