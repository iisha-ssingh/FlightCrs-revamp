import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelModificationRequestAction, downloadDocumentAction, downloadVoucherAction, editGstAction, editGstAuthorisationAction, getCityAutosuggest, getConvenienceFee, getCorporateUsers, getCustomConfig, getGstIn, getManagerList, getSubtripDetails, getViewDetails, prefetchInit } from './slice/form.slice';
import { isEmpty } from '../../utils/common';
import { RootState } from '../../redux/store'; // Adjust this import path as needed
import { Details, ComponentProps } from './utils/props';



const CreateFlightBookings: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getViewDetails());
    // dispatch(prefetchInit());
    // dispatch(getConvenienceFee());
    // dispatch(getCustomConfig());
    // dispatch(getManagerList());
    // dispatch(getGstIn());
    // dispatch(getSubtripDetails());
    // dispatch(getCityAutosuggest({query : 'dwfw'}));
    dispatch(getCorporateUsers({query : 'isha', companyId : '11237'}));
    dispatch(editGstAction())
    dispatch(editGstAuthorisationAction())
    // dispatch(cancelModificationRequestAction())
  }, [dispatch]);

  const { 
    corporateDetails = {}, 
    tripDetails = {},
    bookingDetails = {} 
  } = useSelector((state: RootState) => state.formView as ComponentProps);

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