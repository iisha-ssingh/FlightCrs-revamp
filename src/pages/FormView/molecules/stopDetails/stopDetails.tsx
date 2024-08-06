import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormState, updateStopDetails} from '../../slice/form.slice';
import { AppDispatch, RootState } from '../../../../redux/store';
import {Dropdown} from '@fabhotelstech/mui-internal-components';
import { AutoSuggest, Calendar, InputField } from "@fabhotelstech/react-fab-components";
import './StopDetails.css'; /// need to be removed

interface StopOption {
  value: string;
  key: string;
  label: string;
}
interface StopDetailsProps {
  field: any;
}

const StopDetails: React.FC<StopDetailsProps> = ({ field }) => {
  const dispatch = useDispatch<AppDispatch>();
  const stopDetails = useSelector((state: RootState) => state.view.stopDetails);

  const stopOptions: StopOption[] = [
    { key: "NON_STOP", value: "0", label: "Non Stop" },
    { key: "ONE_STOP", value: "1", label: "One Stop" },
    { key: "TWO_STOP", value: "2", label: "Two Stop" },
    { key: "THREE_STOP", value: "3", label: "Three Stop" },
  ];  /// needs to be removed ///

  const handleStopChange = (value: string) => {
    dispatch(updateStopDetails({
      component: 'stopDetails',
      field: 'stop',
      value: { value },
    }));
  };

  const handleFieldChange = (index: number, fieldName: string, value: any) => {
    const updatedStopInfo = stopDetails.stopInfo.map((stop, i) => 
      i === index ? { ...stop, [fieldName]: { ...stop[fieldName], value } } : stop
    );
    dispatch(updateStopDetails({
      component: 'stopDetails',
      field: 'stopInfo',
      value: updatedStopInfo,
    }));
  };
  const renderStopSection = (index: number) => (
    <div key={`stop-section-${index}`} className="stop-section">
      <h4>Stop {index + 1}</h4>
      <div className='stop-section-grid'>
      <AutoSuggest
        {...stopDetails.stopInfo[index].city}
        onChange={(value: any) => handleFieldChange(index, 'city', value)}
      />
      <Dropdown
        {...stopDetails.stopInfo[index].airline}
        onChange={(event: any) => handleFieldChange(index, 'airline', event.target.value)}
      />
      <InputField
        {...stopDetails.stopInfo[index].flightNumber}
        onChange={(value: any) => handleFieldChange(index, 'flightNumber', value)}
      />
      <Calendar
        {...stopDetails.stopInfo[index].arrivalTime}
        onChange={(dates: any) => handleFieldChange(index, 'arrivalTime', dates[0])}
        options={{ enableTime: true, dateFormat: "Y-m-d H:i" }}
      />
      <Calendar
        {...stopDetails.stopInfo[index].departureTime}
        onChange={(dates: any) => handleFieldChange(index, 'departureTime', dates[0])}
        options={{ enableTime: true, dateFormat: "Y-m-d H:i" }}
      />
      <Dropdown
        {...stopDetails.stopInfo[index].arrivalTerminal}
        onChange={(value: any) => handleFieldChange(index, 'arrivalTerminal', value)}
      />
      <Dropdown
        {...stopDetails.stopInfo[index].departureTerminal}
        onChange={(value: any) => handleFieldChange(index, 'departureTerminal', value)}
      />
      </div>
    </div>
  );

  const renderStopSections = () => {
    return stopDetails.stopInfo.map((_, index) => renderStopSection(index));
  };

  return (
    <div className="stop-details">
      <Dropdown
        placeholderText={stopDetails.stop.placeholderText}
        options={stopOptions}
        value={stopDetails.stop.value}
        onChange={(event: any) => handleStopChange(event.target.value)}
        selectKey="label"
        textKey="value"
      />
      {renderStopSections()}
    </div>
  );
};

export default StopDetails;

