import React, { useEffect } from 'react';
import { InputField } from "@fabhotelstech/react-fab-components";
import './TripDetails.css';

const componentMapping = {
  input: InputField,
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

interface TripDetailsProps {
  field: any;
}

const TripDetails: React.FC<TripDetailsProps> = ({ field }) => {
  return (
    <div className="container">
      <div className="heading-wrapper">
        Trip Details(optional)
      </div>
      <div className="form-wrapper">
        {Object.entries(field).map(([key, fieldData]) => (
          <FormField
            key={key}
            field={fieldData}
            onChange={()=>{}}
          />
        ))}
      </div>
    </div>
  );
};

export default TripDetails;









