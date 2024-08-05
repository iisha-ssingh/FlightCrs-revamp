import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCityAutosuggest, getConvenienceFee, getCustomConfig, getGstIn, getManagerList, getSubtripDetails, getViewDetails, prefetchInit } from './slice/form.slice';
import { isEmpty } from '../../utils/common';
import { RootState } from '../../redux/store'; // Adjust this import path as needed
import { Details, ComponentProps } from './utils/props';
import CorporateDetails from './molecules/CorporateDetails/CorporateDetails';
import { MyComponent } from './organism/Form/form';

const CreateFlightBookings: React.FC = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getViewDetails());
  //   dispatch(prefetchInit());
  //   dispatch(getConvenienceFee());
  // }, [dispatch]);

  // const { 
  //   corporateDetails = {}, 
  //   tripDetails = {},
  //   bookingDetails = {} 
  // } = useSelector((state: RootState) => state.formView as ComponentProps);

  // console.log('corporateDetails', corporateDetails);

  // const renderDetails = (details: Details) => {
  //   return !isEmpty(details) && Object.keys(details).map((key) => (
  //     <div key={key}>{key} : {details[key]?.value}</div>
  //   ));
  // };

  return (
    <div>
      {/* <CorporateDetails field={bookingDetails}/> */}
      <MyComponent/>
    </div>
  );
};

export default CreateFlightBookings;