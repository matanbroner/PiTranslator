import { List, Datagrid, TextField, EmailField } from 'react-admin';

const DeviceList = props => (
    <List {...props} bulkActionButtons={false}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="mac" />
        </Datagrid>
    </List>
);

export default DeviceList;