
  import {
    CorporateDetails,
    State,
    RelationshipManager,
    BookingDetails,
    FlightDetails
  } from './props';

  import { INITIAL_PREFETCH } from "../constants/formState";

  export const corporateDetailsFormatter = (
    state: State = {} as State,
    corporateDetails: CorporateDetails = {},
    relationshipManager: RelationshipManager = {}
  ) => {
    const { companyGstDetail = {} } = corporateDetails;
    return {
      companyName: {
        ...state.corporateDetails.companyName,
        value: corporateDetails?.companyName ?? corporateDetails?.companyId,
        selectedItem: {
          id: corporateDetails?.companyId ?? '',
          companyName: corporateDetails?.companyName ?? '',
        },
      },
      relationshipManagerName: {
        ...state.corporateDetails.relationshipManagerName,
        value: relationshipManager?.relationshipManagerName ?? '',
      },
      relationshipManagerPhone: {
        ...state.corporateDetails.relationshipManagerPhone,
        value: relationshipManager?.relationshipManagerPhone ?? '',
      },
      relationshipManagerEmail: {
        ...state.corporateDetails.relationshipManagerEmail,
        value: relationshipManager?.relationshipManagerEmail ?? '',
      },
      gstEntityName: {
        ...state.corporateDetails.gstEntityName,
        value: companyGstDetail?.gSTCompanyName ?? '',
        selectedItem: {
          id: companyGstDetail?.gSTNumber ?? '',
          name: companyGstDetail?.gSTCompanyName ?? '',
        },
      },
      gSTNumber: {
        ...state.corporateDetails.gSTNumber,
        value: companyGstDetail?.gSTNumber ?? '',
      },
      gSTCompanyName: {
        ...state.corporateDetails.gSTCompanyName,
        value: companyGstDetail?.gSTCompanyName ?? '',
      },
      gSTCompanyAddress: {
        ...state.corporateDetails.gSTCompanyAddress,
        value: companyGstDetail?.gSTCompanyAddress ?? '',
      },
      gSTCompanyPinCode: {
        ...state.corporateDetails.gSTCompanyPinCode,
        value: companyGstDetail?.gSTCompanyPinCode ?? '',
      },
    };
  };
  
  export const tripDetailsFormatter = (
    state: State = {} as State,
    flightDetails: FlightDetails = {}
  ) => {
    const { masterTripId = '' } = flightDetails;
    return {
      tripId: {
        ...state.tripDetails.tripId,
        value: masterTripId,
      },
    };
  };
  
  export const bookingDetailsFormatter = (
    state: State = {} as State,
    bookingDetails: BookingDetails = {}
  ) => {
    const { origin, destination, depDate, noOfTravellers } = bookingDetails;
    return {
      origin: {
        ...state.bookingDetails.origin,
        value: origin,
      },
      destination: {
        ...state.bookingDetails.destination,
        value: destination,
      },
      depDate: {
        ...state.bookingDetails.depDate,
        value: depDate,
      },
      noOfTravellers: {
        ...state.bookingDetails.noOfTravellers,
        value: noOfTravellers,
      },
    };
  };
  
  export const flightDetailsFormatter = (
    state: State = {} as State,
    flightDetails: FlightDetails = {}
  ) => {
    const { flightTripId, ticketingSource, airline, flightNumber } = flightDetails;
    return {
      subTripId: {
        ...state.tripDetails.subTripId,
        value: flightTripId,
      },
      ticketingSource: {
        ...state.flightDetails.ticketingSource,
        value: ticketingSource,
      },
      airline: {
        ...state.flightDetails.airline,
        value: airline ?? '',
      },
      flightNumber: {
        ...state.flightDetails.flightNumber,
        value: flightNumber ?? '',
      },
      class: {
        ...state.flightDetails.class,
        value: flightDetails?.class ?? '',
      },
      pnr: {
        ...state.flightDetails.pnr,
        value: flightDetails?.pnr ?? '',
      },
      depDateTime: {
        ...state.flightDetails.depDateTime,
        value: flightDetails?.depDateTime ?? '',
      },
      arrDateTime: {
        ...state.flightDetails.arrDateTime,
        value: flightDetails?.arrDateTime ?? '',
      },
      depTerminal: {
        ...state.flightDetails.depTerminal,
        value: flightDetails?.depTerminal ?? '',
      },
      arrTerminal: {
        ...state.flightDetails.arrTerminal,
        value: flightDetails?.arrTerminal ?? '',
      },
    };
  };


export const populatePrefetch = (payload: Record<string, any>): typeof INITIAL_PREFETCH => {
    const result = { ...INITIAL_PREFETCH };
  
    for (const key in INITIAL_PREFETCH) {
      if (key in INITIAL_PREFETCH && key in payload) {
        result[key as keyof typeof INITIAL_PREFETCH] = payload[key].map((item: any) => {
          // Handle special case for data items
          // if (key === 'airlines') {
          //   return { code: item.code, name: item.name };
          // } else if (key === 'isdCodes') {
          //   return { code: item.code, country: item.country };
          return item;
        });
      }
    }
    return result;
  }