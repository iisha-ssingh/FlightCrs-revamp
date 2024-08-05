import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCityAutosuggest,
  getConvenienceFee,
  getCustomConfig,
  getGstIn,
  getManagerList,
  getSubtripDetails,
  getViewDetails,
  prefetchInit,
} from "./slice/form.slice";
import { isEmpty } from "../../utils/common";
import { RootState } from "../../redux/store"; // Adjust this import path as needed
import { Details, ComponentProps } from "./utils/props";
import { Pressable, Text } from "react-native";

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
    dispatch(getCityAutosuggest({ query: "dwfw" }));
  }, [dispatch]);

  const {
    corporateDetails = {},
    tripDetails = {},
    bookingDetails = {},
  } = useSelector((state: RootState) => state.formView as ComponentProps);

  const renderDetails = (details: Details) => {
    return (
      !isEmpty(details) &&
      Object.keys(details).map((key) => (
        <div key={key}>
          {key} : {details[key]?.value}
        </div>
      ))
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Pressable
        style={{
          padding: 10,
          backgroundColor: "blue",
          borderRadius: 5,
          width: 100,
        }}
        onPress={() => {
          console.log("Pressed");
        }}
      >
        <Text
          style={{
            color: "white",
            alignSelf: "center",
          }}
        >
          Pressable
        </Text>
      </Pressable>
    </div>
  );
};

export default CreateFlightBookings;
