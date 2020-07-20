import DropdownPage from "./components/DropdownPage";
import ModalPage from "./components/ModalPage";
import AnimatedPage from "./components/Animated";

export const publicPaths = [
  {
    key: "dropdown",
    name: "Dropdown",
    path: "/dropdown",
    component: DropdownPage,
    restricted: true,
  },
  {
    key: "modal",
    name: "Modal",
    path: "/modal",
    component: ModalPage,
    restricted: true,
  },
  {
    key: "animated",
    name: "Animated",
    path: "/animated",
    component: AnimatedPage,
    restricted: true,
  },
];

export const privatePaths = [];

export const userRoles = { user: { access: ["/dropdown", "/modal", "/animated"] } };