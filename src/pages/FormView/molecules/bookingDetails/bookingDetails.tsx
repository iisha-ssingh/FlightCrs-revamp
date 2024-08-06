// import React from 'react';
// import { AutoSuggest, Calendar } from "@fabhotelstech/react-fab-components";
// import { useDispatch, useSelector } from 'react-redux';
// import { updateFormState } from '../../slice/form.slice';
// import { AppDispatch, RootState } from '../../../../redux/store';
// import { pathOr } from '../../../../utils/common';

// interface BookingDetailsProps {
//   field: any;
// }
// interface CustomDepartureInputDateHolderProps {
//     label?: string;
//     value?: string | Date | null;
// }
  
//   const CustomDepartureInputDateHolder: React.FC<CustomDepartureInputDateHolderProps> = ({
//     label = "",
//     value = null
//   }) => {
//     const formatDate = (date: string | Date): string => {
//       const d = typeof date === 'string' ? new Date(date) : date;
//       const day = d.getDate();
//       const month = d.toLocaleString('default', { month: 'short' });
//       const year = d.getFullYear().toString().substr(-2);
//       return `${day} ${month}'${year}`;
//     };
  
//     return (
//       <div className="departure-input-holder">
//         {value ? (
//           <strong className="value">{formatDate(value)}</strong>
//         ) : (
//           <div className="label">{label}</div>
//         )}
//       </div>
//     )
// }
// const BookingDetails: React.FC<BookingDetailsProps> = ({ field }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const bookingDetails = useSelector((state: RootState) => state.view.bookingDetails);
//   const handleFieldChange = (fieldName: string, value: any) => {
//     dispatch(updateFormState({
//       component: 'bookingDetails',
//       field: fieldName,
//       value
//     }));
//   };

//   const depDate = pathOr("", "depDate.value", bookingDetails);
  
//   return (
//     <>
//       <AutoSuggest
//         {...field?.origin}
//         value={bookingDetails.origin.value}
//         onInputChange={(option: any) => handleFieldChange('origin', option)}
//       />

//       <AutoSuggest
//         {...field.destination}
//         value={bookingDetails.destination.value}
//         onInputChange={(option: any) => handleFieldChange('destination', option)}
//       />

//       <Calendar
//         {...field?.depDate}
//         options={{
//           dateFormat: "Y-m-d",
//           minDate: "today",
//         }}
//         value={depDate ? new Date(depDate)?.toISOString() : ''}
//         onChange={([date]: [Date]) => handleFieldChange('depDate', date)}
//       />
//       <CustomDepartureInputDateHolder label={field?.depDate?.label} value={depDate}/>
//       <AutoSuggest
//         {...field?.noOfTravellers}
//         value={bookingDetails.noOfTravellers.value}
//         onInputChange={(option: any) => handleFieldChange('noOfTravellers', option)}
//       />
//     </>
//   );
// };

// export default BookingDetails;


import React from 'react';
import { AutoSuggest, Calendar } from "@fabhotelstech/react-fab-components";
import { useDispatch, useSelector } from 'react-redux';
import { updateFormState } from '../../slice/form.slice';
import { AppDispatch, RootState } from '../../../../redux/store';
import { pathOr } from '../../../../utils/common';
import { ComponentProps } from '../../utils/props';

interface BookingDetailsProps {
  field: Record<string, FieldData>;
}

interface FieldData {
  id: string;
  label: string;
  componentType?: string;
  [key: string]: any;
}

interface CustomDepartureInputDateHolderProps {
  label?: string;
  value?: string | Date | null;
}

const CustomDepartureInputDateHolder: React.FC<CustomDepartureInputDateHolderProps> = ({
  label = "",
  value = null
}) => {
  const formatDate = (date: string | Date): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const day = d.getDate();
    const month = d.toLocaleString('default', { month: 'short' });
    const year = d.getFullYear().toString().substr(-2);
    return `${day} ${month}'${year}`;
  };

  return (
    <div className="departure-input-holder">
      {value ? (
        <strong className="value">{formatDate(value)}</strong>
      ) : (
        <div className="label">{label}</div>
      )}
    </div>
  )
}

const componentMapping = {
  autoSuggest: AutoSuggest,
  calendar: Calendar,
  customDateHolder: CustomDepartureInputDateHolder,
};

interface FormFieldProps {
  field: FieldData;
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

const BookingDetails: React.FC<BookingDetailsProps> = ({ field = {} }) => {
  const dispatch = useDispatch<AppDispatch>();
  // const bookingDetails = useSelector((state: RootState) => state.formView.bookingDetails);
  const {
    bookingDetails = {},
  } = useSelector((state: RootState) => state.formView as ComponentProps);

  const handleFieldChange = (value: any, fieldName: string) => {
    dispatch(updateFormState({
      component: 'bookingDetails',
      field: fieldName,
      value
    }));
  };

  const depDate = pathOr("", "depDate.value", bookingDetails);
  return (
    <div className="booking-details-wrapper">
      {Object.entries(field).map(([key, fieldData]) => {
        const baseFieldData: FieldData = {
          ...fieldData,
          componentType: key === 'depDate' ? 'calendar' : 'autoSuggest'
        };

        let additionalProps: Record<string, any> = {};

        if (key === 'depDate') {
          additionalProps = {
            options: {
              dateFormat: "Y-m-d",
              minDate: "today",
            },
            value: depDate ? new Date(depDate)?.toISOString() : ''
          };
        }

        return (
          <React.Fragment key={key}>
            <FormField
              field={baseFieldData}
              onChange={handleFieldChange}
              value={bookingDetails[key]?.value}
              {...additionalProps}
            />
            {key === 'depDate' && (
              <FormField
                field={{...baseFieldData, componentType: 'customDateHolder'}}
                onChange={handleFieldChange}
                label={fieldData.label}
                value={depDate}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default BookingDetails;