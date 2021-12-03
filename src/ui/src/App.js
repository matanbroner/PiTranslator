import { useState, useEffect } from "react";
import { Admin, Resource, Loading, Error } from "react-admin";
import { Route } from "react-router-dom";
import jsonServerProvider from "ra-data-json-server";

import CustomLayout from "./components/Layout";
import SetingsEdit from "./components/SettingsEdit";
import DeviceList from "./components/DeviceList";
import ChannelList from "./components/ChannelList";
import DeviceShow from "./components/DeviceShow";
import ChannelCreate from "./components/ChannelCreate";

import { storeObjectLocalStorage } from "./util";

const dataProvider = jsonServerProvider("http://localhost:5000/api");

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async () => {
    try {
      const mac = process.env.REACT_APP_MAC_ADDR;
      let device = (await dataProvider.getOne("devices/mac", { id: mac }))
        .data;
      if (!device) {
        setError("This device is not registered. Please review the logs of the speech module.");
      }
      let settings = (
        await dataProvider.getOne("settings/id", { id: device.id })
      ).data;
      if (!settings) {
        throw new Error("No settings found");
      }
      storeObjectLocalStorage(settings);
      localStorage.setItem("settings", JSON.stringify(settings));
      localStorage.setItem("deviceId", device.id);
      localStorage.setItem("deviceName", device.name);
      localStorage.setItem("deviceMac", device.mac);

      setLoading(false);
    } catch (e) {
      setError(`Error fetching or registering your device: ${e}`);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Loading
        loadingPrimary={"Loading resources..."}
        loadingSecondary={"Thanks for waiting so patiently!"}
      />
    );
  } else if (error) {
    return <Error error={error} />;
  } else {
    return (
      <Admin
        appLayout={CustomLayout}
        dataProvider={dataProvider}
        customRoutes={[
          <Route path="/settings" component={SetingsEdit} key="settings" />,
        ]}
      >
        <Resource name="devices" list={DeviceList} show={DeviceShow} />
        <Resource name="channels" list={ChannelList} create={ChannelCreate} />
        <Resource name="settings" />
      </Admin>
    );
  }
}

export default App;
