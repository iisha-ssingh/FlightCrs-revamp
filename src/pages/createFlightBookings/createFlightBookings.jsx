import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getViewDetails } from './slice/viewDetails.slice';

const CreateFlightBookings = (props) => {
    // Your component logic goes here
  const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getViewDetails())
    },[])

    const { viewError, viewData, viewLoading  } = useSelector((state) => state.viewSlice);
     console.log('viewData',viewData)
    return (
        <div>
            hey
        </div>
    );
};

export default CreateFlightBookings;