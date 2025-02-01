import React from 'react';

const EntranceExamDetails = ({ data, handleInputChange }) => (
  <div>
    <h3>Entrance Exam & Income Generating Works</h3>
    <div className="form-group">
      <label>Are You Pursuing Entrance Exams for Govt. Job?</label>
      <input type="text" className="form-control" name="entranceExamDetails" value={data.entranceExamDetails || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Are You Involved in Any Income Generating Works (Part-time Job, Tuition, etc.)?</label>
      <input type="text" className="form-control" name="incomeGeneratingWorks" value={data.incomeGeneratingWorks || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Are You Looking for a Part-time Job or a Full-time Job?</label>
      <select className="form-control" name="jobType" value={data.jobType || ''} onChange={handleInputChange}>
        <option value="">Select</option>
        <option value="Part-time">Part-time</option>
        <option value="Full-time">Full-time</option>
      </select>
    </div>
    <div className="form-group">
      <label>Your Expected Salary</label>
      <input type="text" className="form-control" name="expectedSalary" value={data.expectedSalary || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Declaration</label>
      <textarea className="form-control" name="declaration" value={data.declaration || ''} onChange={handleInputChange}></textarea>
    </div>
  </div>
);

export default EntranceExamDetails;
