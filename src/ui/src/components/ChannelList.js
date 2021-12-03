import { List, Datagrid, TextField, ReferenceField } from "react-admin";

const ChannelList = (props) => (
  <List {...props} bulkActionButtons={false}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="topic" />
      <TextField source="restricted" />
      <TextField source="password" />
      <ReferenceField source="deviceId" reference="devices" link="show">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);

export default ChannelList;
