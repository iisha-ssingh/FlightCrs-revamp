import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getViewDetails } from './slice/viewDetails.slice';
import { isEmpty } from '../../utils/common';

const CreateFlightBookings = (props) => {
  const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getViewDetails())
    },[])

    const { 
        corporateDetails = {}, 
        tripDetails = {},
        bookingDetails = {} 
    } = useSelector((state) => state.view);
    return (
        <div>
            Company details
            <br/>
            <br/>
            {!isEmpty(corporateDetails) && Object.keys(corporateDetails).map((key) => {
                return <div>{key} :     {corporateDetails[key]?.value}</div>
            })}
            <hr />
            <hr />
            <hr />
            Trip Mapping
            <br/>
            <br/>
             {!isEmpty(tripDetails) && Object.keys(tripDetails).map((key) => {
                return <div>{key} : {tripDetails[key]?.value}</div>
            })}
             <hr />
            <hr />
            <hr />
             Booking details
            <br/>
            <br/>
             {!isEmpty(bookingDetails) && Object.keys(bookingDetails).map((key) => {
                return <div>{key} : {bookingDetails[key]?.value}</div>
            })}
        </div>
    );
};

export default CreateFlightBookings;