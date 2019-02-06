Example of using the DataGrid within the project.
``` jsx
const cols = [{'key':'id', 'name':'ID'}, {'key':'Name', 'name':'Name'}];
<DataGrid 
    data='customers'
    canExport
    columns={cols}
    />
```
