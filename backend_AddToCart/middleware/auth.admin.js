

const adminAuth = async (req, res, next) => {
   if(req.user.admin)
   return res.status(403).send("You are unauthorized");
next();
};

module.exports = adminAuth;
