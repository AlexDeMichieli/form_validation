import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const initialState = {
  firstname: "",
  lastname: "",
  emailaddress: "",
  password: "",
};

const App = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState([]);
  const [passwordError, setPasswordError] = useState(false);
  const clearState = () => {
    setForm({ ...initialState });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      const evaluation = zxcvbn(value);
      setErrors(evaluation);
      console.log(evaluation);
    }
    setForm((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (form.password.length < 6) {
      setPasswordError(true);
      return false;
    }
    if (!mailformat.test(form.emailaddress)) {
      alert("email not valid");
      return false;
    } else {
      setPasswordError(false);
    }
    clearState();
  };

  console.log(errors.score, errors.feedback, passwordError);
  const strengthClass = [
    "strength-meter mt-2",
    form.password.length > 0 ? "visible" : "invisible",
  ]
    .join(" ")
    .trim();

  return (
    <div className="container">
      <h3> Create your Account</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              value={form.firstname}
              name="firstname"
              onChange={onChange}
              type="firstname"
              htmlFor="firstname"
              placeholder="Frist Name"
            />
          </label>
        </div>
        <div>
          <label>
            <input
              value={form.lastname}
              type="lastname"
              placeholder="Last Name"
              name="lastname"
              htmlFor="lastname"
              onChange={onChange}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              value={form.emailaddress}
              name="emailaddress"
              type="emailaddress"
              placeholder="Email Address"
              htmlFor="emailaddress"
              onChange={onChange}
            />
          </label>
        </div>
        <div>
          <div className={strengthClass}>
            <div
              className="strength-meter-fill"
              data-strength={errors.score}
            ></div>
          </div>
          <label>
            <input
              value={form.password}
              name="password"
              type="password"
              onChange={onChange}
              htmlFor="password"
              placeholder="Password"
            />
          </label>
          {
            <p
              className="passwordError"
              style={{ opacity: passwordError ? "1" : "0" }}
            >
              Passwords must be between 6 and 40 characters long
            </p>
          }
          {errors.feedback &&
            form.password.length > 0 &&
            errors.feedback.suggestions.map((item) => {
              return <span class="suggestions">{item}</span>;
            })}
        </div>
        <p className="disclamer">
          By creating an account, you agree to our Terms of Service and have
          read and understood the Privacy Policy
        </p>
        {form.firstname &&
        form.lastname &&
        form.emailaddress &&
        form.password ? (
          <button type="submit" className="button" value="Submit!">
            CONTINUE
          </button>
        ) : (
          <button
            type="submit"
            disabled
            className="button button-disabled"
            value="Submit!"
          >
            CONTINUE
          </button>
        )}
      </form>
    </div>
  );
};

export default App;
