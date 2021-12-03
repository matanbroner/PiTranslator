import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import SaveIcon from "@mui/icons-material/Save";
import { Title, Loading } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

import languages from "../assets/languages.json";
import { shallowClone, shallowCompare } from "../util";

const dataProvider = jsonServerProvider("http://localhost:5000/api");

const defaultSettings = JSON.parse(localStorage.getItem("settings"));

const SettingsEdit = () => {
  let [channels, setChannels] = useState([]);
  let [loading, setLoading] = useState(false);
  let [formValues, setFormValues] = useState(shallowClone(defaultSettings));
  let [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/channels")
      .then((response) => response.json())
      .then((data) => {
        setChannels(data);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let deviceName = null;
    if (typeof formValues.deviceName !== "undefined") {
      deviceName = formValues.deviceName;
      delete formValues.deviceName;
    }
    if (!shallowCompare(formValues, defaultSettings)) {
      await dataProvider.update("settings/id", { id: localStorage.getItem("deviceId"), data: formValues });
    }
    localStorage.setItem("settings", JSON.stringify(formValues));
    if (deviceName) {
      dataProvider
        .update("devices/id", { id: localStorage.getItem("deviceId"), data: { name: deviceName } })
        .then(() => {
          localStorage.setItem("deviceName", deviceName);
        })
        .catch((err) => {
          setError(
            `Error updating settings: ${
              typeof err === "string" ? err : err.message
            }`
          );
        });
    }
  };

  return loading ? (
    <Loading loadingPrimary="Loading settings" loadingSecondary="" />
  ) : (
    <form onSubmit={handleSubmit} style={{ marginTop: "25px" }}>
      <Title defaultTitle="Settings" />
      <Snackbar
        open={error !== null}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <Grid
        container
        alignItems="flex-start"
        justifyContent="flex-start"
        direction="column"
        spacing={5}
      >
        <Grid item>
          <TextField
            id="name-input"
            name="deviceName"
            label="Device Name"
            type="text"
            defaultValue={localStorage.getItem("deviceName")}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Spoken Language</FormLabel>
            <Select
              name="spokenLanguage"
              defaultValue={defaultSettings.spokenLanguage}
              onChange={handleInputChange}
            >
              {languages.map((language) => (
                <MenuItem key={language.code} value={language.code}>
                  {language.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Active Channel</FormLabel>
            <Select
              name="activeChannelId"
              defaultValue={defaultSettings.activeChannelId}
              onChange={handleInputChange}
            >
              {channels.map((channel) => (
                <MenuItem key={channel.id} value={channel.id}>
                  {channel.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <div style={{ width: "400px" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<SaveIcon />}
            >
              Submit
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};
export default SettingsEdit;
