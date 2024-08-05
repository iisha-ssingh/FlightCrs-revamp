import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConvenienceFee, getViewDetails, prefetchInit } from '../../slice/form.slice';
import { RootState } from '../../../../redux/store';
import { ComponentProps } from '../../utils/props';
import CorporateDetails from '../../molecules/CorporateDetails/CorporateDetails';
import TripDetails from '../../molecules/TripDetails/TripDetails';
import FlightDetails from '../../molecules/FlightDetails/FlightDetails';


const MyComponent: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(prefetchInit());
  }, [dispatch]);

  const {
    corporateDetails = {},
    tripDetails = {},
    bookingDetails = {},
    flightDetails = {},
    // prefetch = [],
  } = useSelector((state: RootState) => state.formView as ComponentProps);

  return (
    <div>
      <CorporateDetails field={corporateDetails} />
      <TripDetails field={tripDetails} />
      <FlightDetails field={flightDetails} />
    </div>
  );
};

export { MyComponent };