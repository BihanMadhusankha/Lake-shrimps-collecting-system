import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from 'react';
function Signup() {


  return (

    <div>
      <form className="row g-3 w-75 m-5  ">
      <h1 className="h3 mb-3 fw-normal mt-3 ">Please sign up</h1>

        <div className="col-md-4">
          <label htmlFor="validationDefault01" className="form-label">First name</label>
          <input type="text" className="form-control" id="validationDefault01" placeholder='First Name' required />
        </div>
        <div className="col-md-4">
          <label htmlFor="validationDefault02" className="form-label">Last name</label>
          <input type="text" className="form-control" id="validationDefault02" placeholder='Last Name' required />
        </div>
        <div className="col-md-4">
          <label htmlFor="validationDefaultUsername" className="form-label">Username</label>
          <div className="input-group">
            <span className="input-group-text" id="inputGroupPrepend2">@</span>
            <input type="text" className="form-control" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required />
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationDefault03" className="form-label">City</label>
          <input type="text" className="form-control" id="validationDefault03" required />
        </div>
        <div className="col-md-3">
          <label htmlFor="validationDefault04" className="form-label">State</label>
          <select className="form-select" id="validationDefault04" required>
            <option selected disabled value="">Choose...</option>
            <option>...</option>
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationDefault05" className="form-label">Zip</label>
          <input type="text" className="form-control" id="validationDefault05" required />
        </div>
        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" required />
              <label className="form-check-label" htmlFor="invalidCheck2">
                Agree to terms and conditions
              </label>
          </div>
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">Submit form</button>
        </div>
        <p>you have another account? <a href="#">Sign in </a></p>
      </form>
    </div>

  );
}
export default Signup;




































