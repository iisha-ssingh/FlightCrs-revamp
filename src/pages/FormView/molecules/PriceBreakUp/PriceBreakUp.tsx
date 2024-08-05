import React, { useEffect, useRef } from 'react';
import { AutoSuggest, InputField } from "@fabhotelstech/react-fab-components";
import { useDispatch, useSelector } from "react-redux";
import { updateFormState, getCompanyName, getDependentField, updateViaKeyFormState, dependentFieldsReset } from "../../slice/form.slice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { Company, FormView, PrefetchData } from '../../utils/props';
import { Dropdown } from '@fabhotelstech/mui-internal-components'; 
import './PriceBreakUp.css';
import TimePickerComponent from '../../../../components/TimePickerComponent';

interface DropDownFuncProps {
    [key: string]: any;
}

const DropDownFunc: React.FC<DropDownFuncProps> = (props) => {
    return (
      <div className="dropdown-field-wrapper">
        <Dropdown {...props} />
      </div>
    );
};

const componentMapping = {
  autoSuggest: AutoSuggest,
  dropdown: DropDownFunc,
  input: InputField,
  timePickerInput: TimePickerComponent
};

interface FormFieldProps {
    field: any;
    onChange: (value: any, id: string) => void;
    [key: string]: any;
}

const FormField: React.FC<FormFieldProps> = ({ field, onChange, ...props }) => {
    const Component = componentMapping[field.componentType as keyof typeof componentMapping];
    if (Component) {
      return (
        <React.Fragment>
          <Component
            {...field}
            {...props}
            onChange={(value: any) => onChange(value, field.id)}
          />
        </React.Fragment>
      );
    }
    return null;
};

interface PriceBreakUpProps {
  field: any;
}

const PriceBreakUp: React.FC<PriceBreakUpProps> = ({ field }) => {

  console.log("field", field);

  const {
    prefetch = {}
  } = useSelector((state: RootState) => state.formView as FormView);

  const dispatch = useDispatch<AppDispatch>();

  const {
    airlines = [],
    ticketingSources = [],
    cabinClasses = [],
    terminals = [],
  } = prefetch as PrefetchData

  useEffect(()=>{
    dispatch(updateViaKeyFormState({
        component: "flightDetails",
        field: "ticketingSource",
        key: "options",
        value: ticketingSources,
      }));
    dispatch(updateViaKeyFormState({
        component: "flightDetails",
        field: "class",
        key: "options",
        value: cabinClasses,
      }));
    dispatch(updateViaKeyFormState({
        component: "flightDetails",
        field: "depTerminal",
        key: "options",
        value: terminals,
      }));
    dispatch(updateViaKeyFormState({
        component: "flightDetails",
        field: "arrTerminal",
        key: "options",
        value: terminals,
      }));
  },[prefetch])

  return (
    <div className="container">
      <div className="heading-wrapper">
        Flight Details
      </div>
      <div className="form-wrapper">
        {Object.entries(field).map(([key, fieldData]) => (
          <FormField
            key={key}
            field={fieldData}
            onChange={()=>{}}
            timeProps={fieldData}
          />
        ))}
      </div>
    </div>
  );
};

export default PriceBreakUp;









