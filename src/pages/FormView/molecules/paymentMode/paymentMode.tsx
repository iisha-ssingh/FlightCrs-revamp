// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { updateFormState } from "../../slice/form.slice";
// import {Dropdown} from '@fabhotelstech/mui-internal-components';
// import { AppDispatch, RootState } from "../../../../redux/store";

// interface DropdownOption {
//     key: string;
//     value: string;
//     label: string;
// }
// interface PaymentModeProps {
//     field: any;
// }
// /// below contsant need to be removed ///
// const paymentModeOptions: DropdownOption[] = [
//     { key: "PREPAID", value: "PREPAID", label: "Prepaid" },
//     { key: "BTC", value: "BTC", label: "Bill to Company" },
// ];
// const paymentOptionOptions: DropdownOption[] = [{ key: "wallet", value: "wallet", label: "Wallet" }];
// /////////

// const PaymentMode: React.FC<PaymentModeProps> = ({ field }) => {
//     const dispatch = useDispatch<AppDispatch>();
//     const paymentMode = useSelector((state: RootState) => state.view.paymentMode);
  
//     const handleChange = (fieldName: 'paymentMode' | 'paymentOption') => (event: React.ChangeEvent<{ value: unknown }>) => {
//       dispatch(updateFormState({
//         component: 'paymentMode',
//         field: fieldName,
//         value: event.target.value as string
//       }));
//     };
  
//     const renderDropdown = (fieldName: 'paymentMode' | 'paymentOption', options: DropdownOption[]) => (
//       <Dropdown
//         {...field[fieldName]}
//         options={options}
//         value={paymentMode[fieldName].value}
//         isError={paymentMode[fieldName].isError}
//         onChange={handleChange(fieldName)}
//       />
//     );
  
//     return (
//       <div>
//         <h4>Payment mode</h4>
//         <div style={{ display: "flex", gap: "20px" }}>
//           {renderDropdown('paymentMode', paymentModeOptions)}
//           {renderDropdown('paymentOption', paymentOptionOptions)}
//         </div>
//       </div>
//     );
//   };

// export default PaymentMode;


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormState } from '../../slice/form.slice';
import { RootState } from '../../../../redux/store';
import { AutoSuggest, InputField } from "@fabhotelstech/react-fab-components";
import { Dropdown } from '@fabhotelstech/mui-internal-components';

interface DropdownOption {
  key: string;
  value: string;
  label: string;
}

const componentMapping = {
  autoSuggest: AutoSuggest,
  dropdown: Dropdown,
  // input: InputField,
};

const paymentModeOptions: DropdownOption[] = [
  { key: "PREPAID", value: "PREPAID", label: "Prepaid" },
  { key: "BTC", value: "BTC", label: "Bill to Company" },
];

const paymentOptionOptions: DropdownOption[] = [
  { key: "wallet", value: "wallet", label: "Wallet" }
];

interface FormFieldProps {
  field: any;
  fieldKey: string;
  onChange: (value: any, id: string) => void;
  value: any;
  options?: DropdownOption[];
  [key: string]: any;
}

const FormField: React.FC<FormFieldProps> = ({ field, fieldKey, onChange, value, options, ...props }) => {
  const Component = field.componentType ? 
    componentMapping[field.componentType as keyof typeof componentMapping] : 
    Dropdown; 
  if (Component) {
    return (
      <Component
        {...field}
        {...props}
        onChange={(newValue: any) => onChange(newValue, fieldKey)}
        value={value}
        options={options}
      />
    );
  }
  return null;
};

interface PaymentModeProps {
  field: any;
}

const PaymentMode: React.FC<PaymentModeProps> = ({ field }) => {
  const dispatch = useDispatch();
  const paymentMode = useSelector((state: RootState) => state.view.paymentMode);

  const handleChange = (item: any, key: string) => {
    const value = item?.target?.value || item;
    dispatch(updateFormState({
      component: "paymentMode",
      field: key,
      value
    }));
  };

  const getOptionsForField = (fieldKey: string) => {
    switch (fieldKey) {
      case 'paymentMode':
        return paymentModeOptions;
      case 'paymentOption':
        return paymentOptionOptions;
      default:
        return [];
    }
  };

  return (
    <div className="container">
      <div className="heading-wrapper">
        Payment Mode
      </div>
      <div className="form-wrapper">
        {Object.entries(field).map(([key, fieldData]: [string, any]) => (
          <FormField
            key={key}
            fieldKey={key}
            field={fieldData}
            onChange={handleChange}
            value={paymentMode[key]?.value}
            options={getOptionsForField(key)}
            placeholder={fieldData.placeholderText}
            isError={paymentMode[key]?.isError}
            required={fieldData.required}
            selectKey={fieldData.selectKey}
            textKey={fieldData.textKey}
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentMode;