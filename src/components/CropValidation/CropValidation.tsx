import * as yup from "yup";

export const CropValidation = yup.object().shape({
  name: yup.string().required("Please input crop name"),
  description: yup
    .string()
    .required()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .max(100),
  quantity: yup.number().positive().required().integer(),
  price: yup.number().required(),
  remark: yup
    .string()
    .required()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .max(100),
});
