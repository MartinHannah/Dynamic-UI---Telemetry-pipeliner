//Form components are basically widget definitions. 
//submission is not implemented at all but will need something to decide on action on submit.
const formDefinition = {
  submission: "export",
  formComponents: [
    {
      component: "InputField",
      options: {
        name: "firstName",
        inputType: "text",
        readOnly: false,
        placeholder: "Enter name",
        helperText: "This field is for your first name",
        isMultiline: false,
        isRequired: false,
        label: "First Name"
      }
    },
    {
      component: "SwitchGroup",
      options: {
        name: "switchgroup",
        label: "Select Notifications",
        helperText:
          "Select the types of notifications you would like to receive",
        data: [
          { name: "Email", value: "email", isChecked: true },
          { name: "SMS", value: "sms", isChecked: false }
        ]
      }
    },
    {
      component: "DefaultButton",
      options: {
        fullWidth: false,
        variant: "text",
        label: "Submit",
        type: "submit"
      }
    }
  ]
};

//Data Grid options example. 
{
    "widget": "DataGrid",
    "options": {
        "data": "customers",
        "rowsSelectable": false,
        "isEditable": true,
        "canExport": true,
        'columns': [
            {'key':'id', 'name':'ID'}, 
            {'key':'Name', 'name':'Name'}, 
            {'key':'WhiteLabelID', 'name':'Whitelabel'}
        ]
        "submission": "updateTable",
        "formComponents": [ 
            { 
                "component": "InputField",
                "options": { 
                    "name": "title", 
                    "inputType": "text",
                    "readOnly": false,
                    "isRequired": true,
                    "label": "Title"
                }
            }, 
            {
                "component": "InputField",
                "options": { 
                    "name": "name", 
                    "inputType": "text", 
                    "readOnly": false,
                    "isRequired": true, 
                    "label": "Name"
                }
            }
        ]
    }
}