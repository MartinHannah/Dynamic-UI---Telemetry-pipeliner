Example of using the DataGrid within the project.
``` jsx
<DataGrid 
    data='customers'
    rowsSelectable={true}
    isEditable={false}
    />
```

Example of defining the widget in JSON
``` json 
{
    "widget": "DataGrid",
    "options": {
        "id": "datagrid-customers",
        "data": "customers",
        "rowsSelectable": true,
        "isEditable": false
    }
}
```