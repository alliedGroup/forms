import React from 'react';

const FamilyDetails = ({ data, handleInputChange }) => (
  <div>
    <h3>Family Details</h3>
    <div className="form-group">
      <label>Father's Name</label>
      <input type="text" className="form-control" name="fatherName" value={data.fatherName || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Father's Occupation</label>
      <input type="text" className="form-control" name="fatherOccupation" value={data.fatherOccupation || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Mother's Name</label>
      <input type="text" className="form-control" name="motherName" value={data.motherName || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Mother's Occupation</label>
      <input type="text" className="form-control" name="motherOccupation" value={data.motherOccupation || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Family Income</label>
      <input type="text" className="form-control" name="familyIncome" value={data.familyIncome || ''} onChange={handleInputChange} />
    </div>
  </div>
);

export default FamilyDetails;
