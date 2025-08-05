export const VALIDATION_RULES = {
  isEmail:
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/,
  isNumber: /^\d+$/,
} as const;

export const FORM_VALIDATION = {
  email: {
    required: "Email address is required.",
    pattern: {
      value: VALIDATION_RULES.isEmail,
      message: "Invalid email address ",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },

    // pattern: {
    //   value: VALIDATION_RULES.password,
    //   message: "uppercase, lowercase, number and special",
    // },
  },
  newPassword: {
    required: "New password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
  },
  passwordConfirm: {
    required: "Confirm password is required",
  },
  otp: {
    required: "Otp is required",
    // minLength: {
    //   value: 6,
    //   message: "Otp must be at least 6 numbers",
    // },
    // pattern:{
    //   value: VALIDATION_RULES.isNumber ,
    // },
  },
} as const;
