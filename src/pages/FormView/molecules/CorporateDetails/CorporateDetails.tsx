import React, { useEffect, useRef } from 'react';
import { AutoSuggest, InputField } from "@fabhotelstech/react-fab-components";
import { useDispatch, useSelector } from "react-redux";
import { updateFormState, getCompanyName, getDependentField, updateViaKeyFormState, dependentFieldsReset } from "../../slice/form.slice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { Company } from '../../utils/props';
import { Dropdown } from '@fabhotelstech/mui-internal-components'; 
import './CorporateDetails.css';

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

interface CorporateDetailsProps {
  field: any;
}

const CorporateDetails: React.FC<CorporateDetailsProps> = ({ field }) => {

  const dispatch = useDispatch();

  const callbackRef = useRef<((options: any[]) => void) | null>(null);

  const corporateDetails = useSelector((state: RootState) => state.formView.corporateDetails);
  const companyName = useSelector((state: RootState) => state.formView.companyName);
  const companyId = corporateDetails?.companyName?.value?.id;
  const dependentFields = useSelector((state: RootState) => state.formView.dependentFields);

  const tripDetails = useSelector((state: RootState) => state.formView.tripDetails);

  useEffect(()=>{
    if(companyName?.length){
      callbackRef.current && callbackRef.current(companyName.map((item: Company | Object) => {
        if ('companyName' in item && 'id' in item) {
          return { ...item, label: item["companyName"], value: item["id"] }
        }
        return item;
      }));
    }
  },[companyName])

  useEffect(() => {
    if (companyId) {
      dispatch(getDependentField({ companyId }));
    }
  }, [companyId, dispatch]);

  useEffect(() => {
    if (dependentFields.managerList && Array.isArray(dependentFields.managerList) && dependentFields.managerList.length > 0) {
      dispatch(updateViaKeyFormState({
        component: "corporateDetails",
        field: "relationshipManagerName",
        key: "options",
        value: dependentFields.managerList,
      }));
    }
  }, [dependentFields.managerList, dispatch]);

  useEffect(() => {
    if (dependentFields.gstList && Array.isArray(dependentFields.gstList) && dependentFields.gstList.length > 0) {
      dispatch(updateViaKeyFormState({
        component: "corporateDetails",
        field: "gstEntityName",
        key: "options",
        value: dependentFields.gstList,
      }));
    }
  }, [dependentFields.gstList, dispatch]);

  const loadCompanyOptions = (inputValue: string, callback: (options: any[]) => void) => {
    callbackRef.current = callback;
    dispatch(getCompanyName({
        companyName: inputValue?.trim(),
    }));
  };
  const RESET_STRUCTURE = {
    corporateDetails: [
      'relationshipManagerName',
      'relationshipManagerPhone',
      'relationshipManagerEmail',
      'gstEntityName',
      'gSTNumber',
      'gSTCompanyName',
      'gSTCompanyAddress',
      'gSTCompanyPinCode'
    ],
    // tripDetails: [
    //   'tripType',
    //   'origin',
    //   'destination',
    //   // ... other trip fields
    // ],
    // bookingDetails: [
    //   'bookingDate',
    //   'travelDate',
    //   // ... other booking fields
    // ],
    // ... other sections
  };
  
  const DROPDOWN_FIELDS = [
    'relationshipManagerName',
    'gstEntityName',
    'tripType',
    // ... other dropdown fields
  ];

  const resetCompanyRelatedFields = () => {
    Object.entries(RESET_STRUCTURE).forEach(([section, fields]) => {
      fields.forEach(fieldName => {
        // Reset value
        dispatch(updateViaKeyFormState({
          component: section,
          field: fieldName,
          key:"value",
          value: ''
        }));
  
        // Disable field
        // dispatch(updateViaKeyFormState({
        //   component: section,
        //   field: fieldName,
        //   key: "disabled",
        //   value: true,
        // }));
  
        // Reset options for dropdown fields
        if (DROPDOWN_FIELDS.includes(fieldName)) {
          dispatch(updateViaKeyFormState({
            component: section,
            field: fieldName,
            key: "options",
            value: [],
          }));
        }
      });
    });
  };

  const handleCompanyChange = (item : any, key: any  ) => {
    // resetCompanyRelatedFields(tempState, 'corporateDetails')
    resetCompanyRelatedFields()
    // when we are changing the company name we want to reset the dependent fields that are linked to the particular company
    dispatch(dependentFieldsReset())
    dispatch(updateViaKeyFormState({
      component: "corporateDetails",
      field: "companyName",
      key:"value",
      value:item
    }));
    dispatch(updateViaKeyFormState({
        component: "tripDetails",
        field: "tripId",
        key: "isDisabled",
        value: false,
    }))
  }

  const handleChange = (item:any,key: any) =>{
    const { value = "" } = item?.target
    let newFormState = {
      ...corporateDetails,
    }
    newFormState = {
      ...newFormState,
      [key]: {
        ...newFormState[key],
        value
      }
    }
    // dispatch(updateViaKeyFormState({
    //   component: "corporateDetails",
    //   field: key,
    //   key: "value",
    //   value
    // }));
    if (key === 'relationshipManagerName') {
      const { email, mobile } = dependentFields?.managerList.find((manager) => manager.text === value) || {};
      newFormState={
        ...newFormState,
        relationshipManagerPhone:{
          ...newFormState.relationshipManagerPhone,
          value: mobile
        },
        relationshipManagerEmail: {
          ...newFormState.relationshipManagerEmail,
          value: email
        },
      }
      // dispatch(updateFormState({
      //   component: "corporateDetails",
      //   field: "relationshipManagerPhone",
      //   value: mobile
      // }));
      dispatch(updateFormState({
        component: 'corporateDetails',
        updates: {
         ...newFormState
        }
      }));
      // dispatch(updateViaKeyFormState({
      //   component: "corporateDetails",
      //   field: "relationshipManagerPhone",
      //   key: "value",
      //   value: mobile
      // }));
      // dispatch(updateViaKeyFormState({
      //   component: "corporateDetails",
      //   field: "relationshipManagerEmail",
      //   key: "value",
      //   value: email
      // }));
    }
    if (key === "gstEntityName"){
        const { address = '', gstin = '', entityName = '', pinCode = '' } = dependentFields?.gstList.find((gst) => gst.gstin === value) || {};
        console.log('address',address,gstin, entityName, pinCode)
        newFormState = {
          ...newFormState,
          gSTCompanyName:{
            ...newFormState.gSTCompanyName,
            value: entityName ?? ""
          },
          gSTCompanyAddress:{
            ...newFormState.gSTCompanyAddress,
            value: address
          },
          gSTNumber:{
            ...newFormState.gSTNumber,
            value: gstin
          },
          gSTCompanyPinCode:{
            ...newFormState.gSTCompanyPinCode,
            value: pinCode
          }
        }
        dispatch(updateFormState({
          component: 'corporateDetails',
          updates: {
           ...newFormState
          }
        }));
        // dispatch(updateViaKeyFormState({
        //     component: "corporateDetails",
        //     field: "gSTCompanyName",
        //     key: "value",
        //     value: entityName ?? ""
        // }));
        // dispatch(updateViaKeyFormState({
        //     component: "corporateDetails",
        //     field: "gSTCompanyAddress",
        //     key: "value",
        //     value: address
        // }));
        // dispatch(updateViaKeyFormState({
        //     component: "corporateDetails",
        //     field: "gSTNumber",
        //     key: "value",
        //     value: gstin
        // }));
        // dispatch(updateViaKeyFormState({
        //     component: "corporateDetails",
        //     field: "gSTCompanyPinCode",
        //     key: "value",
        //     value: pinCode
        // }));
    }
  }

  return (
    <div className="container">
      <div className="heading-wrapper">
        Corporate Details
      </div>
      <div className="form-wrapper">
        {Object.entries(field).map(([key, fieldData]) => (
          <FormField
            key={key}
            field={fieldData}
            onChange={key === 'companyName' ? handleCompanyChange : handleChange}
            loadOptions={key === 'companyName' ? loadCompanyOptions : undefined}
            getOptionValue={key === 'companyName' ? (option: Company) => option?.uuid : undefined}
            getOptionLabel={key === 'companyName' ? (option: Company) => option?.companyName : undefined}
            noOptionsMessage={() => null}
            isEditableInput={false}
          />
        ))}
      </div>
    </div>
  );
};

export default CorporateDetails;









