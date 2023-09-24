export const capitalize = function (string: string) {
  return string
    .split(' ')
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(' ');
};

export function numberOfRejectionsValidator() {
  return {
    validator: function numberOfRejectionsValidatorFn(v) {
      return v >= this.numberOfParts;
    },
    message: 'Number of Rejections must be less than Number of Parts',
  };
}
