import HomePage from "../components/HomePage";
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
    name: "Home",
    path: "/",
    component: HomePage,
    restricted: true,
  },
  {
    name: "Dropdown",
    path: "/dropdown",
    component: DropdownPage,
    restricted: true,
  },
  {
    name: "Modal",
    path: "/modal",
    component: ModalPage,
    restricted: true,
  },
  {
    name: "Animated",
    path: "/animated",
    component: AnimatedPage,
    restricted: true,
  },
  {
    name: "Scroll",
    path: "/scroll",
    component: ScrollPage,
    restricted: true,
  },
  {
    name: "Tabs",
    path: "/tabs",
    component: TabsPage,
    restricted: true,
  },
  {
    name: "MouseMove",
    path: "/mousemove",
    component: MouseMovePage,
    restricted: true,
    subPaths: [
      {
        name: "MouseMove2",
        path: "/mousemove/1",
        component: MouseMovePage,
        restricted: true,
      },
      {
        name: "MouseMove3",
        path: "/mousemove/2",
        component: MouseMovePage,
        restricted: true,
        subPaths: [
          {
            name: "MouseMove4",
            path: "/mousemove/2/3",
            component: MouseMovePage,
            restricted: true,
          },
          {
            name: "MouseMove5",
            path: "/mousemove/2/4",
            component: MouseMovePage,
            restricted: true,
            subPaths: [
              {
                name: "MouseMove6",
                path: "/mousemove/2/4/5",
                component: MouseMovePage,
                restricted: true,
              },
              {
                name: "MouseMove7",
                path: "/mousemove/2/4/5",
                component: MouseMovePage,
                restricted: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "drag",
    path: "/drag",
    component: DragPage,
    restricted: true,
  },
  {
    name: "toast",
    path: "/toast",
    component: ToastPage,
    restricted: true,
  },
  {
    name: "usemountedvalue",
    path: "/usemountedvalue",
    component: UseMountedValuePage,
    restricted: true,
  },
];

export const privatePaths = [];

export const userRoles = {
  user: {
    access: ["*"],
  },
};
