import React, { useState } from 'react';

const AddVisit = () => {
  const [flyer, setImage] = useState(null);
  const [distance, setDistance] = useState("");
  const [travel_time, setTravelTime] = useState("");
  const [visit_date, setVisitDate] = useState("");  
  const [civil_registration, setCivilRegistration] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [modernization_fund, setModernizationFund] = useState("");
  const [start_time, setStartTime] = useState("");
  const [finish_time, setFinishTime] = useState("");
  const [place_name, setPlaceName] = useState("");
  const [id_locality, setLocality] = useState("");
  const [id_group, setGroup] = useState("");
  const [id_visit_status, setVisitStatus] = useState("");
  const [id_agreement, setAgreement] = useState("");
  const [id_contacted_referrer, setContactedReferrer] = useState("");
  const [id_address, setAddress] = useState("");

  return (
    <div>
      <div className="container">
        <div className="from-group">
          <div className="form-control">
        
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Distance"
              name="distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            /><input

            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Travel Time"
            name="travel_time"
            value={travel_time}
            onChange={(e) => setTravelTime(e.target.value)}
          />
          <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter visit date"
              name="visit_date"
              value={visit_date}
              onChange={(e) => setVisitDate(e.target.value)}
            />
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter registro civil"
              name="civil_registration"
              value={civil_registration}
              onChange={(e) => setCivilRegistration(e.target.value)}
            />
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter accommodation"
              name="accommodation"
              value={accommodation}
              onChange={(e) => setAccommodation(e.target.value)}
            />
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter modernization fund"
              name="modernization_fund"
              value={modernization_fund}
              onChange={(e) => setModernizationFund(e.target.value)}
            />
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter start time"
              name="start_time"
              value={start_time}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter finish time"
              name="finish_time"
              value={finish_time}
              onChange={(e) => setFinishTime(e.target.value)}
            />
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter place_name"
              name="place_name"
              value={place_name}
              onChange={(e) => setPlaceName(e.target.value)}
            /><input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter id_locality"
            name="id_locality"
            value={id_locality}
            onChange={(e) => setLocality(e.target.value)}
            /><input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter id_group"
            name="id_group"
            value={id_group}
            onChange={(e) => setGroup(e.target.value)}
            /><input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter id_visit_status"
            name="id_visit_status"
            value={id_visit_status}
            onChange={(e) => setVisitStatus(e.target.value)}
            /><input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter id_agreement"
            name="id_agreement"
            value={id_agreement}
            onChange={(e) => setAgreement(e.target.value)}
            /><input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter id_contacted_referrer"
            name="id_contacted_referrer"
            value={id_contacted_referrer}
            onChange={(e) => setContactedReferrer(e.target.value)}
            /> <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter id_address"
            name="id_address"
            value={id_address}
            onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        <button className='btn btn-success' onClick={AddVisit} >Submit</button>

        </div>
      </div>
    </div>
  );
};

export default AddVisit;