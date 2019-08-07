import joi from '@hapi/joi';

export const validateForm = (signup) => {
  const schema = joi.object().keys({
    username: joi.string().alphanum().min(4).max(40)
      .required(),
    password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).trim().min(8)
      .max(30)
      .required(),
  });
  const result = joi.validate(signup, schema);
  return result;
};
