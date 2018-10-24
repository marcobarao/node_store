class ValidationContract {
  constructor() {
    this.errors = [];
  }

  isRequired(value, message) {
    if (!value || value.length <= 0) this.errors.push({ message });
  }

  hasMinLen(value, min, message) {
    if (!value || value.length < min) this.errors.push({ message });
  }

  hasMaxLen(value, max, message) {
    if (!value || value.length > max) this.errors.push({ message });
  }

  hasMinValue(value, min, message) {
    if (!value || value.length > min) this.errors.push({ message });
  }

  isFixedLen(value, len, message) {
    if (value.length != len) this.errors.push({ message });
  }

  isEmail(value, message) {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value)) this.errors.push({ message });
  }

  isBoolean(value, message) {
    if (!(value === true || value === false)) this.errors.push({ message });
  }

  getErrors() {
    return this.errors;
  }

  clear() {
    this.errors = [];
  }

  isValid() {
    return this.errors.length == 0;
  }
}

module.exports = ValidationContract;
