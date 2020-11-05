const User = require("../models/user");

exports.getOne = async function (req, res, next) {
  var { id } = req.params;
  if (!id) return res.status(400).json({ error: "paramètre 'id' requis" });
  // req.user : _id, type, group (name uniquement)
  try {
    const user = await User.findOneById(id).lean();
    if (!user)
      return res.status(404).json({ error: "utilisateur introuvable" });
    return res.status(200).json(user);
  } catch (e) {
    return res.status(404).json({ error: "utilisateur introuvable" });
  }
};
