import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router-dom";
import Error from "./Error";
import Checkbox from "@mui/material/Checkbox";

import "../App.css";

const FGForm = ({ order, setOrder }) => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    Ingredient : "",
    Food: "",
    Price: "",
    qualityOfService: "",
    qualityOfBeverage: "",
    qualityOfCleanliness: "",
    diningExperience: "",
  });
  const [formErrors, setFormErrors] = useState({
    Ingredient : "",
    Food: "",
    Price: "",
    qualityOfService: "",
    qualityOfBeverage: "",
    qualityOfCleanliness: "",
    diningExperience: "",
  });
  const onValidate = values => {
    const errors = {};
    if (!values.Ingredient ) {
      errors.Ingredient = "Please enter the value for the above field";
    } else if (values.name.length > 15 && values.name.length < 3) {
      errors.name = "Must be 15 characters or 4 characters";
    }
    if (!values.Food) {
      errors.Food= "Please enter the value for the above field";
    }
    if (
      values.email &&
      !values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Please enter the value for the above field";
    }
    if (
      values.phoneNumber &&
      !values.phoneNumber.match(/^\+(?:[0-9] ?){6,14}[0-9]$/i)
    ) {
      errors.phoneNumber = "Invalid phone number";
    }
    if (!values.qualityOfService) {
      errors.qualityOfService = "Please choose the value for the above field";
    }
    if (!values.qualityOfBeverage) {
      errors.qualityOfBeverage = "Please choose the value for the above field";
    }
    if (!values.qualityOfCleanliness) {
      errors.qualityOfCleanliness =
        "Please choose the value for the above field";
    }
    if (!values.diningExperience) {
      errors.diningExperience = "Please choose the value for the above field";
    }
    return errors;
  };
  const checkboxStyles = {
    height: "18px",
    width: "18px",
    "&.Mui-checked": {
      color: "#8870C9",
    },
  };
  const handleSubmit = event => {
    setFormErrors(onValidate(formValues));
    event.preventDefault();
    if (!Object.keys(formErrors).length && Object.keys(formValues).length) {
      let uniqueId =
        new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
      let newOrder = {
        id: uniqueId,
        data: formValues,
      };
      if (Object.keys(order).length) {
        setOrder([
          ...order,
          setOrder,
        ]);
      } else {
        setOrder([newOrder]);
      }
      setFormValues({
        Ingredient : "",
        Food: "",
        Price: "",
        qualityOfService: "",
        qualityOfBeverage: "",
        qualityOfCleanliness: "",
        diningExperience: "",
      });
      navigate("/submit-feedback");
    }
  };
  const formBodyStyle =
    Object.keys(formErrors).length > 0 && formErrors.constructor === Object
      ? { paddingBottom: "40px" }
      : { paddingBottom: "21px" };

  return (
    <div className="feedback-body">
      <div className="aromatic-header">
        <p className="aromatic-header-text">Aromatic bar</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="aromatic-form-body" style={formBodyStyle}>
          <div className="input-form">
            <div className="form-group name-field">
              <label htmlFor="name">
                Customer Name<span className="mandatory-field">*</span>
              </label>
              <input
                id="name"
                name="name"
                placeholder="E.g. jon snow"
                className="form-control"
                value={formValues.name}
                onChange={event => {
                  setFormValues({
                    ...formValues,
                    name: event.target.value,
                  });
                  setFormErrors({
                    ...formErrors,
                    name: "",
                  });
                }}
              />
              {formErrors.name ? (
                <Error errorMessage={formErrors?.name} />
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="email">
                Email<span className="mandatory-field">*</span>
              </label>
              <input
                id="email"
                name="email"
                placeholder="E.g. abc@gmail.com"
                className="form-control"
                value={formValues.email}
                onChange={event => {
                  setFormValues({
                    ...formValues,
                    email: event.target.value,
                  });
                  setFormErrors({
                    ...formErrors,
                    email: "",
                  });
                }}
              />
              {formErrors.email ? (
                <Error errorMessage={formErrors?.email} />
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="feedback">
                Phone<span className="mandatory-field">*</span>
              </label>
              <PhoneInput
                placeholder="9999999999"
                value={formValues.phoneNumber}
                onChange={event => {
                  setFormValues({
                    ...formValues,
                    phoneNumber: event,
                  });
                  setFormErrors({
                    ...formErrors,
                    phoneNumber: "",
                  });
                }}
                className="phone-input"
                defaultCountry="IN"
                name="phoneNumber"
              />
              {formErrors.phoneNumber ? (
                <Error errorMessage={formErrors?.phoneNumber} />
              ) : null}
            </div>
          </div>
          <div className="options-class">
            <div className="form-group-checkbox">
              <label>
                Please rate the quality of the service you received from your
                host.<span className="mandatory-field">*</span>
              </label>
              <div className="radio-group">
                <div>
                  <label className="radio">
                    <Checkbox
                      checked={formValues.qualityOfService === "Excellent"}
                      value="Excellent"
                      onChange={e => {
                        setFormValues({
                          ...formValues,
                          qualityOfService: e.target.value,
                        });
                        setFormErrors({
                          ...formErrors,
                          qualityOfService: "",
                        });
                      }}
                      name="qualityOfService"
                      sx={{ ...checkboxStyles }}
                    />{" "}
                    Excellent
                  </label>
                </div>
                <div>
                  <label className="radio">
                    <Checkbox
                      name="qualityOfService"
                      value="Good"
                      checked={formValues.qualityOfService === "Good"}
                      onChange={e => {
                        setFormValues({
                          ...formValues,
                          qualityOfService: e.target.value,
                        });
                        setFormErrors({
                          ...formErrors,
                          qualityOfService: "",
                        });
                      }}
                      sx={{
                        ...checkboxStyles,
                      }}
                    />{" "}
                    Good
                  </label>
                </div>
                <div>
                  <label className="radio">
                    <Checkbox
                      value="Fair"
                      name="qualityOfService"
                      checked={formValues.qualityOfService === "Fair"}
                      onChange={e => {
                        setFormValues({
                          ...formValues,
                          qualityOfService: e.target.value,
                        });
                        setFormErrors({
                          ...formErrors,
                          qualityOfService: "",
                        });
                      }}
                      sx={{
                        ...checkboxStyles,
                      }}
                    />{" "}
                    Fair
                  </label>
                </div>
                <div>
                  <label className="radio">
                    <Checkbox
                      type="checkbox"
                      value="Bad"
                      name="qualityOfService"
                      checked={formValues.qualityOfService === "Bad"}
                      onChange={e => {
                        setFormValues({
                          ...formValues,
                          qualityOfService: e.target.value,
                        });
                        setFormErrors({
                          ...formErrors,
                          qualityOfService: "",
                        });
                      }}
                      sx={{
                        ...checkboxStyles,
                      }}
                    />{" "}
                    Bad
                  </label>
                </div>
              </div>
              {formErrors.qualityOfService ? (
                <Error errorMessage={formErrors?.qualityOfService} />
              ) : null}
            </div>
            <div className="form-group-checkbox">
              <label>
                Please rate the quality of your beverage.
                <span className="mandatory-field">*</span>
              </label>
              <div className="radio-group">
                <div>
                  <label className="radio">
                    <Checkbox
                      value="Excellent"
                      name="qualityOfBeverage"
                      checked={formValues.qualityOfBeverage === "Excellent"}
                      onChange={e => {
                        setFormValues({
                          ...formValues,
                          qualityOfBeverage: e.target.value,
                        });
                        setFormErrors({
                          ...formErrors,
                          qualityOfBeverage: "",
                        });
                      }}
                      sx={{ ...checkboxStyles }}
                    />{" "}
                    Excellent
                  </label>
                </div>
                <div>
                  <label className="radio">
                    <Checkbox
                      value="Good"
                      name="qualityOfBeverage"
                      checked={formValues.qualityOfBeverage === "Good"}
                      onChange={e => {
                        setFormValues({
                          ...formValues,
                          qualityOfBeverage: e.target.value,
                        });
                        setFormErrors({
                          ...formErrors,
                          qualityOfBeverage: "",
                        });
                      }}
                      sx={{ ...checkboxStyles }}
                    />{" "}
                    Good
                  </label>
                </div>
                <div>
                  <label className="radio">
                    <Checkbox
                      value="Fair"
                      name="qualityOfBeverage"
                      checked={formValues.qualityOfBeverage === "Fair"}
                      onChange={e => {
                        setFormValues({
                          ...formValues,
                          qualityOfBeverage: e.target.value,
                        });
                        setFormErrors({
                          ...formErrors,
                          qualityOfBeverage: "",
                        });
                      }}
                      sx={{ ...checkboxStyles }}
                    />{" "}
                    Fair
                  </label>
                </div>
                <div>
                  <label className="radio">
                    <Checkbox
                      value="Bad"
                      name="qualityOfBeverage"
                      checked={formValues.qualityOfBeverage === "Bad"}
                      onChange={e => {
                        setFormValues({
                          ...formValues,
                          qualityOfBeverage: e.target.value,
                        });
                        setFormErrors({
                          ...formErrors,
                          qualityOfBeverage: "",
                        });
                      }}
                      sx={{ ...checkboxStyles }}
                    />{" "}
                    Bad
                  </label>
                </div>
              </div>
              {formErrors.qualityOfBeverage ? (
                <Error errorMessage={formErrors?.qualityOfBeverage} />
              ) : null}
            </div>
            <div className="form-group-checkbox">
              <label>
                Was our restaurant clean?
                <span className="mandatory-field">*</span>
              </label>
              <div className="radio-group">
                <div>
                  <label className="radio">
                    <Checkbox
                      value="Excellent"
                      name="qualityOfCleanliness"
                      checked={formValues.qualityOfCleanliness === "Excellent"}
                      onChange={e => {
                        setFormValues({
                          ...formValues,
                          qualityOfCleanliness: e.target.value,
                        });
                        setFormErrors({
                          ...formErrors,
                          qualityOfCleanliness: "",
                        });
                      }}
                      sx={{ ...checkboxStyles }}
                    />{" "}
                    Excellent
                  </label>
                </div>
                <div>
                  <label className="radio">
                    <Checkbox
                      value="Good"
                      name="qualityOfCleanliness"
                      checked={formValues.qualityOfCleanliness === "Good"}
                      onChange={e => {
                        setFormValues({
                          ...formValues,
                          qualityOfCleanliness: e.target.value,
                        });
                        setFormErrors({
                          ...formErrors,
                          qualityOfCleanliness: "",
                        });
                      }}
                      sx={{ ...checkboxStyles }}
                    />{" "}
                    Good
                  </label>
                </div>
                <div>
                  <label className="radio">
                    <Checkbox
                      value="Fair"
                      name="qualityOfCleanliness"
                      checked={formValues.qualityOfCleanliness === "Fair"}
                      onChange={e => {
                        setFormValues({
                          ...formValues,
                          qualityOfCleanliness: e.target.value,
                        });
                        setFormErrors({
                          ...formErrors,
                          qualityOfCleanliness: "",
                        });
                      }}
                      sx={{ ...checkboxStyles }}
                    />{" "}
                    Fair
                  </label>
                </div>
                <div>
                  <label className="radio">
                    <Checkbox
                      value="Bad"
                      name="qualityOfCleanliness"
                      checked={formValues.qualityOfCleanliness === "Bad"}
                      onChange={e => {
                        setFormValues({
                          ...formValues,
                          qualityOfCleanliness: e.target.value,
                        });
                        setFormErrors({
                          ...formErrors,
                          qualityOfCleanliness: "",
                        });
                      }}
                      sx={{ ...checkboxStyles }}
                    />{" "}
                    Bad
                  </label>
                </div>
              </div>
              {formErrors.qualityOfCleanliness ? (
                <Error errorMessage={formErrors?.qualityOfCleanliness} />
              ) : null}
            </div>
            <div className="form-group-checkbox">
              <label>
                Please rate your overall dining experience.
                <span className="mandatory-field">*</span>
              </label>
              <div className="radio-group">
                <div>
                  <label className="radio">
                    <Checkbox
                      value="Excellent"
                      name="diningExperience"
                      checked={formValues.diningExperience === "Excellent"}
                      onChange={e => {
                        setFormValues({
                          ...formValues,
                          diningExperience: e.target.value,
                        });
                        setFormErrors({
                          ...formErrors,
                          diningExperience: "",
                        });
                      }}
                      sx={{ ...checkboxStyles }}
                    />{" "}
                    Excellent
                  </label>
                </div>
                <div>
                  <label className="radio">
                    <Checkbox
                      value="Good"
                      name="diningExperience"
                      checked={formValues.diningExperience === "Good"}
                      onChange={e => {
                        setFormValues({
                          ...formValues,
                          diningExperience: e.target.value,
                        });
                        setFormErrors({
                          ...formErrors,
                          diningExperience: "",
                        });
                      }}
                      sx={{ ...checkboxStyles }}
                    />{" "}
                    Good
                  </label>
                </div>
                <div>
                  <label className="radio">
                    <Checkbox
                      value="Fair"
                      name="diningExperience"
                      checked={formValues.diningExperience === "Fair"}
                      onChange={e => {
                        setFormValues({
                          ...formValues,
                          diningExperience: e.target.value,
                        });
                        setFormErrors({
                          ...formErrors,
                          diningExperience: "",
                        });
                      }}
                      sx={{ ...checkboxStyles }}
                    />{" "}
                    Fair
                  </label>
                </div>
                <div>
                  <label className="radio">
                    <Checkbox
                      value="Bad"
                      name="diningExperience"
                      checked={formValues.diningExperience === "Bad"}
                      onChange={e => {
                        setFormValues({
                          ...formValues,
                          diningExperience: e.target.value,
                        });
                        setFormErrors({
                          ...formErrors,
                          diningExperience: "",
                        });
                      }}
                      sx={{ ...checkboxStyles }}
                    />{" "}
                    Bad
                  </label>
                </div>
              </div>
              {formErrors.diningExperience ? (
                <Error errorMessage={formErrors?.diningExperience} />
              ) : null}
            </div>
          </div>
        </div>
        <div className="aromatic-footer">
          <div className="btnWrapper">
            <button
              type="submit"
              className="btnPrimary"
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit Review
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FGForm;
