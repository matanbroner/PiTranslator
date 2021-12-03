import { DashboardMenuItem, Menu, MenuItemLink } from 'react-admin';
import SettingsIcon from "@material-ui/icons/Settings";
import DevicesIcon from "@mui/icons-material/Devices";
import AltRouteIcon from "@mui/icons-material/AltRoute";

const CustomMenu = (props) => (
    <Menu {...props}>
        <MenuItemLink to="/devices" primaryText="Devices" leftIcon={<DevicesIcon />}/>
        <MenuItemLink to="/channels" primaryText="Channels" leftIcon={<AltRouteIcon />}/>
        <MenuItemLink to="/settings" primaryText="Settings" leftIcon={<SettingsIcon />}/>
    </Menu>
);

export default CustomMenu;

