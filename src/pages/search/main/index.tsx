import React from 'react';
import {useAppDispatch} from "../../../store";
import {fetchBookings} from "../reducer";

export const SearchPage: React.FC = () => {

    const dispatch = useAppDispatch();

    const fetchBookingList = async () => {
        console.log("button clicked")
        dispatch(fetchBookings({retry: true}))
    };

    return (
        <div>
            <button onClick={fetchBookingList}>
                {'Fetch Booking List'}
            </button>
        </div>
    );
};
