import Ajv from "ajv";
import addFormats from "ajv-formats";
import ajvErrors from "ajv-errors";

const ajv = new Ajv({
  allErrors: true,
});
addFormats(ajv);
ajvErrors(ajv);

export default ajv;
