import { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  Title,
  Edit,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  required,
} from "react-admin";

import jsonServerProvider from "ra-data-json-server";
const dataProvider = jsonServerProvider("http://localhost:5000/api");




export default (props) => (
  <Card>
    <Title title="Welcome to PiTranslator!" />
    <CardContent>
      <p>Configure your device settings here!</p>
      <Edit>
        <SimpleForm>
          <TextInput disabled source="id" />
          <ReferenceInput
            label="User"
            source="userId"
            reference="users"
            validate={[required()]}
          >
            <SelectInput optionText="name" />
          </ReferenceInput>
          <TextInput
            source="title"
            label="Post title"
            validate={[required()]}
          />
          <TextInput multiline source="body" initialValue="Lorem Ipsum" />
        </SimpleForm>
      </Edit>
    </CardContent>
  </Card>
);
