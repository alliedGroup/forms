import React from 'react';

const WorkExperience = ({ data, handleInputChange }) => (
  <div>
    <h3>Work Experience</h3>
    <div className="form-group">
      <label>Are You a Fresher?</label>
      <select className="form-control" name="isFresher" value={data.isFresher || ''} onChange={handleInputChange}>
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>
    {data.isFresher === 'No' && (
      <>
        <div className="form-group">
          <label>Organization Name</label>
          <input type="text" className="form-control" name="organizationName" value={data.organizationName || ''} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Post</label>
          <input type="text" className="form-control" name="post" value={data.post || ''} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Joining Month & Year</label>
          <input type="text" className="form-control" name="joiningDate" value={data.joiningDate || ''} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Leaving Month & Year</label>
          <input type="text" className="form-control" name="leavingDate" value={data.leavingDate || ''} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Reason for Leaving</label>
          <input type="text" className="form-control" name="reasonForLeaving" value={data.reasonForLeaving || ''} onChange={handleInputChange} />
        </div>
      </>
    )}
  </div>
);

export default WorkExperience;
