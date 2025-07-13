// utils/logger.js
import Log from '../models/log.model.js';

export const logActivity = async (req, action, resource) => {
  await Log.create({
    userId: req.user?._id,
    action,
    resource,
    ip: req.ip
  });
};
