exports.check = (ctx, next) => {
  console.log('malController check');
  next();
};

exports.list = (ctx, next) => {
  console.log('malController list');
  next();
};
