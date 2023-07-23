export const validation = (form, setErrors, name) => {
  const regexURL = /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/;
  const { title, summary, instructions, healthScore, image} = form;

  const errorMessages = {};

  const validateTitle = () => {
    if (title.length > 50) {
      errorMessages.title = "The title can't contain more than 50 characters";
    } else if (!title) {
      errorMessages.title = "Empty title is invalid";
    } else {
      errorMessages.title = "";
    }
  };

  const validateSummary = () => {
    if (summary.length > 1000) {
      errorMessages.summary = "Summary can't contain more than 1000 characters";
    } else if (!summary) {
      errorMessages.summary = "Empty summary is invalid";
    } else {
      errorMessages.summary = "";
    }
  };

  const validateInstructions = () => {
    errorMessages.instructions = instructions.length
      ? ""
      : "Empty instructions are invalid";
  };

  const validateHealthScore = () => {
    errorMessages.healthScore =
      healthScore > 100 ? "Health score limit is 100" : "";
  };

  const validateImage = () => {
    errorMessages.image = regexURL.test(image)
      ? ""
      : "Invalid URL, try a URL like: https://www.google.com";
  };


  switch (name) {
    case "title":
      validateTitle();
      break;
    case "summary":
      validateSummary();
      break;
    case "instructions":
      validateInstructions();
      break;
    case "healthScore":
      validateHealthScore();
      break;
    case "image":
      validateImage();
      break;
    default:
      break;
  }

  setErrors(errorMessages);
};
