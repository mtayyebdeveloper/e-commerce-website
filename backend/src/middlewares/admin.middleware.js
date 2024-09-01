const adminMiddleware = (req, res, next) => {
  try {
    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
      return res.status(401).json({
        success: false,
        message: "unauthorized access",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
export default adminMiddleware;
