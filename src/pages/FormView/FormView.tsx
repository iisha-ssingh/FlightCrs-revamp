import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getViewDetails } from './slice/form.slice';
import { isEmpty } from '../../utils/common';
import { RootState } from '../../redux/store'; // Adjust this import path as needed
import { Details, ComponentProps } from './utils/props';



const CreateFlightBookings: React.FC = () => {
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
      
    </div>
  );
};

export default CreateFlightBookings;