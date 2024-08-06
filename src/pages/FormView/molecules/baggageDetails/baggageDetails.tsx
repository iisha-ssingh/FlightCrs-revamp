import React from 'react';
import { InputField } from "@fabhotelstech/react-fab-components";
import { useDispatch, useSelector } from 'react-redux';
import { updateFormState } from '../../slice/form.slice';
import { AppDispatch, RootState } from '../../../../redux/store';

interface BaggageDetailsProps {
  field: Record<string, FieldData>;
}

interface FieldData {
  id: string;
  label: string;
  componentType: string;
  [key: string]: any;
}

const componentMapping = {
  input: InputField,
};

interface FormFieldProps {
  field: FieldData;
  onChange: (fieldName: string, value: any) => void;
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
          onChange={(value: any) => onChange(field.id, value)}
        />
      </React.Fragment>
    );
  }
  return null;
};

const BaggageDetails: React.FC<BaggageDetailsProps> = ({ field }) => {
  const dispatch = useDispatch<AppDispatch>();
  const baggageDetails = useSelector((state: RootState) => state.formView.baggageDetails);

  const handleFieldChange = (fieldName: string, value: any) => {
    dispatch(updateFormState({
      component: 'baggageDetails',
      field: fieldName,
      value
    }));
  };

  return (
    <div className="baggage-details-wrapper">
      <h4>Baggage details</h4>
      <div className="form-fields">
        {Object.entries(field).map(([key, fieldData]) => (
          <FormField
            key={key}
            field={{...fieldData, componentType: 'input'}}
            onChange={handleFieldChange}
            value={baggageDetails[key]?.value}
          />
        ))}
      </div>
    </div>
  );
};

export default BaggageDetails;