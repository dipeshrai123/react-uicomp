import DropdownPage from "../components/DropdownPage";
import ModalPage from "../components/ModalPage";
import AnimatedPage from "../components/Animated";
import ScrollPage from "../components/Scroll";
import TabsPage from "../components/Tabs";
import MouseMovePage from "../components/MouseMove";
import DragPage from "../components/Drag";
import ToastPage from "../components/Toast";
import UseMountedValuePage from "../components/UseMountedValue";

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
  {
    key: "scroll",
    name: "Scroll",
    path: "/scroll",
    component: ScrollPage,
    restricted: true,
  },
  {
    key: "tabs",
    name: "Tabs",
    path: "/tabs",
    component: TabsPage,
    restricted: true,
  },
  {
    key: "mousemove",
    name: "MouseMove",
    path: "/mousemove",
    component: MouseMovePage,
    restricted: true,
  },
  {
    key: "drag",
    name: "drag",
    path: "/drag",
    component: DragPage,
    restricted: true,
  },
  {
    key: "toast",
    name: "toast",
    path: "/toast",
    component: ToastPage,
    restricted: true,
  },
  {
    key: "usemountedvalue",
    name: "usemountedvalue",
    path: "/usemountedvalue",
    component: UseMountedValuePage,
    restricted: true,
  },
];

export const privatePaths = [];

export const userRoles = { 
  user: { 
    access: [
      "/dropdown", 
      "/modal", 
      "/animated", 
      "/scroll", 
      "/tabs", 
      "/mousemove", 
      "/drag",
      "/toast",
      "/usemountedvalue",
    ] 
  } 
};