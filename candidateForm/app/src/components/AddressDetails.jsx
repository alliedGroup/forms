import React from 'react';

const AddressDetails = ({ data, handleInputChange }) => (
  <div>
    <h3>Present & Permanent Address</h3>
    <div className="form-group">
      <label>Present Address</label>
      <input type="text" className="form-control" name="presentAddress" value={data.presentAddress || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Permanent Address</label>
      <input type="text" className="form-control" name="permanentAddress" value={data.permanentAddress || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Landlord's Name (If Rented)</label>
      <input type="text" className="form-control" name="landlordName" value={data.landlordName || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Landlord's Mobile No.</label>
      <input type="text" className="form-control" name="landlordMobileNo" value={data.landlordMobileNo || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>Rent Amount (per month)</label>
      <input type="text" className="form-control" name="rentAmount" value={data.rentAmount || ''} onChange={handleInputChange} />
    </div>
  </div>
);

export default AddressDetails;
