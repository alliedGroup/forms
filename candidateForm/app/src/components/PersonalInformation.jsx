import React from 'react';

const PersonalInfo = ({ data, handleInputChange }) => (
  <div>
    <h3>Personal Information</h3>
    <div className="form-group">
      <label>Post Applied For</label>
      <input type="text" className="form-control" name="postAppliedFor" value={data.postAppliedFor || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Application Date & Time</label>
      <input type="text" className="form-control" name="applicationDateTime" value={data.applicationDateTime || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Applicant Name</label>
      <input type="text" className="form-control" name="applicantName" value={data.applicantName || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Mobile No.</label>
      <input type="text" className="form-control" name="mobileNo" value={data.mobileNo || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Email ID</label>
      <input type="email" className="form-control" name="emailId" value={data.emailId || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Alternate Mobile No.</label>
      <input type="text" className="form-control" name="alternateMobileNo" value={data.alternateMobileNo || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Date of Birth</label>
      <input type="date" className="form-control" name="dateOfBirth" value={data.dateOfBirth || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Age as on Date</label>
      <input type="number" className="form-control" name="ageAsOnDate" value={data.ageAsOnDate || ''} onChange={handleInputChange} />
    </div>
  </div>
);

export default PersonalInfo;
