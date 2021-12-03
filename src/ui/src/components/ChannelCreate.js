import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  PasswordInput,
  required,
} from "react-admin";

const ChannelCreate = (props) => (
  <Create {...props}>
    <SimpleForm initialValues={{deviceId: localStorage.getItem("deviceId")}}>
      <TextInput source="name" validate={required()}/>
      <TextInput source="topic" validate={required()}/>
      <BooleanInput helperText={"Password protected channels in the works!"} disabled source="restricted" defaultValue={false}/>
    </SimpleForm>
  </Create>
);

export default ChannelCreate;