export const capitalize = function (string: string) {
  return string
    .split(' ')
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(' ');
};

export function numberOfRejectionsValidator() {
  return {
    validator: function numberOfRejectionsValidatorFn(v) {
      const totalRejections = this.rejections.reduce((total, rejection) => {
        total += rejection.numberOfRejections;
        return total;
      }, 0);
      return totalRejections < this.numberOfParts;
    },
    message: 'Number of Rejections must be less than Number of Parts',
  };
}

export function totalRejectionsValidator() {
  return {
    validator: function totalRejectionsValidatorFn(v) {
      const totalRejections = this.rejections.reduce((acc, rejection) => {
        acc += rejection.numberOfRejections;
        return acc;
      }, 0);

      return totalRejections < this.numberOfParts;
    },
    message:
      'Total Number of Rejections must be less than Total Number of Parts',
  };
}
