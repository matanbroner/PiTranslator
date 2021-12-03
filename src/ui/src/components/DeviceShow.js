import { Show, SimpleShowLayout, TextField } from 'react-admin';

const DeviceShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="mac" />
        </SimpleShowLayout>
    </Show>
);

export default DeviceShow;