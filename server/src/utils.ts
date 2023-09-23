export const capitalize = (string: string) =>
  string
    .split(' ')
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(' ');

export function numberOfRejectionsValidator() {
  return {
    validator: function numberOfRejectionsValidatorFn(v) {
      return v >= this.numberOfParts;
    },
    message: 'Number of Rejections must be less than Number of Parts',
  };
}
