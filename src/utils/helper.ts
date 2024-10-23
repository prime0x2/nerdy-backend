export const getReadableExpiration = (expiresIn: string) => {
  const duration = expiresIn.slice(0, -1);
  const unit = expiresIn.slice(-1);

  const newUnit = (duration: string, unit: string) => {
    if (Number(duration) > 1) {
      return unit + 's';
    }

    return unit;
  };

  if (unit === 's') {
    return `${duration} ${newUnit(duration, 'second')}`;
  } else if (unit === 'm') {
    return `${duration} ${newUnit(duration, 'minute')}`;
  } else if (unit === 'h') {
    return `${duration} ${newUnit(duration, 'hour')}`;
  } else if (unit === 'd') {
    return `${duration} ${newUnit(duration, 'day')}`;
  }

  return expiresIn;
};
