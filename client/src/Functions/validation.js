const validate = (activity) => {
  const errors = {};
  if (activity.name && !/\b\w{3,30}\b/.test(activity.name)) {
    errors.name = "* Must be between 3 and 30 characters";
  }

  if (
    activity.duration &&
    (!/^-?\d+(\.\d+)?$/.test(activity.duration) || activity.duration <= 0)
  ) {
    errors.duration = "* Invalid duration";
  }
  if (activity.duration > 9) {
    errors.duration = "* The maximum duration is 9hr";
  }

  return errors;
};

export default validate;
