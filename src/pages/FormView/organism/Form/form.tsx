import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConvenienceFee, getViewDetails, prefetchInit } from '../../slice/form.slice';
import { RootState } from '../../../../redux/store';
import { ComponentProps } from '../../utils/props';
import CorporateDetails from '../../molecules/corporateDetails/corporateDetails';
import TripDetails from '../../molecules/tripDetails/tripDetails';
import FlightDetails from '../../molecules/flightDetails/flightDetails';


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