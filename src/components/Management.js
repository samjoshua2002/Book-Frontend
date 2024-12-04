import React, { useState } from 'react';
import TextInput from './TextInput';
import Password from './Password';

const Management = () => {
  const [user, setUser] = useState({
    username: "",
    usernumber: "",
    useremail: "",
    userpassword: "",
  });

  const [error, setError] = useState({
    useremail: "",
    userpassword: "",
  });

  const [change, setChange] = useState({
    signIn: true,
    signUp: false,
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const signin = () => {
    setChange({ signIn: true, signUp: false });
    clearForm();
  };

  const signup = () => {
    setChange({ signIn: false, signUp: true });
    clearForm();
  };

  const clearForm = () => {
    setUser({
      username: "",
      usernumber: "",
      useremail: "",
      userpassword: "",
    });
    setError({});
  };

  const onSubmit = () => {
    const errors = {};
    if (!user.useremail) {
      errors.useremail = "Enter a valid email";
    }
    if (!user.userpassword) {
      errors.userpassword = "Enter a valid password";
    }
    setError(errors);

    if (user.useremail && user.userpassword) {
      alert("Signed in successfully!");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-dark" style={{ height: '100vh' }}>
        <div className="border border-2 border-warning p-4 m-2 rounded bg-white">
          <div>
            <img src="sun.png" alt="logo" className="img-fluid" width={'25%'} />
            <div className="text-center fs-4 fw-bold text-capitalize">Welcome to Kaimanam</div>
            <p className="text-center fw-medium">Sign in to your account or create a new one</p>
          </div>
          <div className="d-flex justify-content-evenly my-4 gap-2">
            <div
              className={change.signIn ? "border-bottom w-100 text-center border-2 pb-1 border-warning btn border-0 fw-medium" : "w-100 text-center btn border-0 fw-medium"}
              onClick={signin}
            >
              Sign In
            </div>
            <div
              className={change.signUp ? "border-bottom w-100 text-center border-2 pb-1 border-warning btn border-0 fw-medium" : "w-100 text-center btn border-0 fw-medium"}
              onClick={signup}
            >
              Sign Up
            </div>
          </div>

          {change.signIn && (
            <div className="signin">
              <div>
                <TextInput
                  className="form-control"
                  name="useremail"
                  type="email"
                  label="Email"
                  value={user.useremail}
                  onChange={handleChange}
                  helperText={error.useremail || "Enter email"}
                />
              </div>
              <div className="mt-2">
                <Password
                  name="userpassword"
                  value={user.userpassword}
                  className="form-control"
                  helperText={error.userpassword || "8 characters with @ or # and numbers"}
                  onChange={handleChange}
                />
              </div>
              <div onClick={onSubmit} className="btn btn-outline-success border-2 fw-medium w-100 mt-4">
                Sign In
              </div>
            </div>
          )}

          {change.signUp && (
            <div className="signup">
              <div>
                <TextInput
                  className="form-control"
                  name="username"
                  type="text"
                  label="Name"
                  value={user.username}
                  onChange={handleChange}
                  helperText="Enter name"
                />
              </div>
              <div>
                <TextInput
                  className="form-control"
                  name="usernumber"
                  type="number"
                  label="Number"
                  value={user.usernumber}
                  onChange={handleChange}
                  helperText="Enter number"
                />
              </div>
              <div>
                <TextInput
                  className="form-control"
                  name="useremail"
                  type="email"
                  label="Email"
                  value={user.useremail}
                  onChange={handleChange}
                  helperText="Enter email"
                />
              </div>
              <div>
                <Password
                  name="userpassword"
                  value={user.userpassword}
                  className="form-control"
                  helperText="8 characters with @ or # and numbers"
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex gap-3">
                <div className="btn btn-outline-danger border-2 fw-medium w-100 mt-4" onClick={clearForm}>
                  Clear
                </div>
                <div className="btn btn-outline-success border-2 fw-medium w-100 mt-4">Sign Up</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Management;
