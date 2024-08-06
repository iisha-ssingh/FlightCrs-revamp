import {PayloadAction} from "@reduxjs/toolkit";

type FetchBookingsData = PayloadAction<{ retry: boolean }>;

export const PAGE_CONTENT_LIMIT = 10;

interface FetchBookingApiBody {
    search: {
        companyId: number,
        flight: string,
        pnr: string,
        bookingId: string
    },
    pageNo: number,
    limit: number
}

interface Action {
    type: string;
    name: string;
}

interface Booking {
    tripId: string | null;
    bookingId: string;
    flight: string;
    pnr: string;
    srcDst: string;
    amount: number;
    status: string;
    actions: Action[];
    flightType: string;
}

interface FabPage {
    content: Booking[];
    number: number;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
}

interface SearchApiResponse {
    status: boolean;
    statusCode: number;
    message: string;
    data: {
        fabPage: FabPage;
    } | null;
}

interface SearchSliceProps {
    flightNumber: string,
    pnr: string,
    companyId: number,
    bookingId: string
    pageNo: number,
    bookings: Booking[],
    searchDataLoading: boolean,
    bookingsServerError: string,
}

export type {FetchBookingApiBody, SearchApiResponse, SearchSliceProps, FetchBookingsData}
