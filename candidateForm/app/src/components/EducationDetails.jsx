import React from 'react';

const EducationDetails = ({ data, handleInputChange }) => (
  <div>
    <h3>Educational Qualification</h3>
    <div className="form-group">
      <label>HSLC (Metric)</label>
      <input type="text" className="form-control" name="hslc" value={data.hslc || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>HS</label>
      <input type="text" className="form-control" name="hs" value={data.hs || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Graduation</label>
      <input type="text" className="form-control" name="graduation" value={data.graduation || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Post Graduation</label>
      <input type="text" className="form-control" name="postGraduation" value={data.postGraduation || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Computer Course</label>
      <input type="text" className="form-control" name="computerCourse" value={data.computerCourse || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Are You Still Studying?</label>
      <select className="form-control" name="areYouStillStudying" value={data.areYouStillStudying || ''} onChange={handleInputChange}>
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>
  </div>
);

export default EducationDetails;
