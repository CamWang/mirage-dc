/**
 * validate.js
 * 
 * @description Used for checking the parameter, it will match the
 *              property name of the parameter object with the 
 *              name of the rules, it will test all requirements
 *              that are present.
 * @throws TypeError when rules not defined or tests not pass
 * 
 */

const postRule = require("./rules/post");
const userRule = require("./rules/user");

const rules = {...postRule, ...userRule};

function validate(obj) {
  for (const key in obj) {
    if (!rules.hasOwnProperty(key)) {
      throw new TypeError("Validate Error: Rule for '" + key + "' haven't been set yet.");
    }
    const rule = rules[key];
    const value = obj[key];
    if (rule.hasOwnProperty("required") && !value.length) {
      throw new TypeError(rule.name + " Is Required");
    }
    if (rule.hasOwnProperty("type") && typeof value !== rule.type) {
      throw new TypeError(rule.name + " Format Error");
    }
    if (rule.hasOwnProperty("regex") && !rule.regex.test(value)) {
      throw new TypeError(rule.name + " Format Error");
    }
    if (rule.hasOwnProperty("length") && (value.length < rule.length.min || value.length > rule.length.max)) {
      throw new TypeError(rule.name + " Out Of Range");
    }
  }
  return true;
}

module.exports = {
  validate
}