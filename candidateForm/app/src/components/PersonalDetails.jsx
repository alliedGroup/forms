import React from 'react';

const PersonalDetails = ({ data, handleInputChange }) => (
  <div>
    <h3>Personal Details</h3>
    <div className="form-group">
      <label>Hobbies/Passion</label>
      <input type="text" className="form-control" name="hobbies" value={data.hobbies || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Achievements</label>
      <input type="text" className="form-control" name="achievements" value={data.achievements || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Daily Routine (Wake Up Time)</label>
      <input type="time" className="form-control" name="wakeUpTime" value={data.wakeUpTime || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Daily Routine (Bed Time)</label>
      <input type="time" className="form-control" name="bedTime" value={data.bedTime || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Mode of Transport to Job</label>
      <input type="text" className="form-control" name="modeOfTransport" value={data.modeOfTransport || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Do You Own a 2-Wheeler?</label>
      <select className="form-control" name="own2Wheeler" value={data.own2Wheeler || ''} onChange={handleInputChange}>
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>
    <div className="form-group">
      <label>Do You Have a Valid Driving License?</label>
      <select className="form-control" name="validDrivingLicense" value={data.validDrivingLicense || ''} onChange={handleInputChange}>
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>
  </div>
);

export default PersonalDetails;
