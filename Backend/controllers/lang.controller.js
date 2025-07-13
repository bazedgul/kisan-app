import { localizationData } from '../utils/localizationData.js';

export const getTranslations = (req, res) => {
  const { lang } = req.query;
  const selected = localizationData[lang] || localizationData.en;
  res.status(200).json(selected);
};
