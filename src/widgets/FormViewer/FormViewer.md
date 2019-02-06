Example of the Form Viewer component

```jsx

```

Example JSON widget definition

```JSON
{
    "widget": "FormViewer",
    "options": {
        "id": "formviewer-example"
    }
}
```

### Form Definitions

#### Currently Supported Form Components
* [InputField](#inputfield)
* [DefaultButton](#defaultbutton)
* [SwitchGroup](#switchgroup)

Example

```json
[
    {
        component: "InputField",
        options: {
        name: 'firstName',
        inputType: 'text',
        readOnly: false,
        placeholder: 'placeholder',
        helperText: 'helping out',
        isMultiline: false,
        isRequired: false,
        label: 'Testing input text'
        }
    },
    {
        component: "SwitchGroup",
        options: {
        name: 'switchgroup',
        label: 'switches',
        helperText: 'Helping out',
        data: [
            {name: 'Gilad Gray 1', value: 'gilad', isChecked: true},
            {name: 'Jason Killian 1', value: 'jason', isChecked: false},
            {name: 'Antoine Llorca 1', value: 'antoine'}
        ],
        }
    },
    {
        component: "DefaultButton",
        options: {
            fullWidth: false,
            variant: 'text',
            label: 'A Button',
            type: 'submit'
        }
    }
]

```
