import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getViewDetails } from './slice/viewDetails.slice';
import { isEmpty } from '../../utils/common';
import { RootState } from '../../redux/store'; // Adjust this import path as needed
import { Details, ComponentProps } from './utils/propType';



const CreateFlightBookings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getViewDetails());
  }, [dispatch]);

  const { 
    corporateDetails = {}, 
    tripDetails = {},
    bookingDetails = {} 
  } = useSelector((state: RootState) => state.view as ComponentProps);

  const renderDetails = (details: Details) => {
    return !isEmpty(details) && Object.keys(details).map((key) => (
      <div key={key}>{key} : {details[key]?.value}</div>
    ));
  };

  return (
    <div>
      <h2>Company details</h2>
      {renderDetails(corporateDetails)}
      <hr />
      <h2>Trip Mapping</h2>
      {renderDetails(tripDetails)}
      <hr />
      <h2>Booking details</h2>
      {renderDetails(bookingDetails)}
    </div>
  );
};

export default CreateFlightBookings;