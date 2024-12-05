import Photo from "../models/Photo.js";

const getAboutPage = (req, res) => {
  res.render('about.ejs');
};

const getAddPage = (req, res) => {
  res.render('add.ejs');
};

const getEditPage = async (req, res) => {
  const photo = await Photo.findById({ _id: req.params.id });
  res.render('edit.ejs', { photo });
};

export { getAboutPage, getAddPage, getEditPage};
