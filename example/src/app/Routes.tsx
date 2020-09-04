import React from "react";
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

// const Comp = () => <div>Select any</div>;
const Comp1 = () => <div>comp1</div>;
const Comp2 = () => <div>comp2</div>;

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
    nestedPaths: [
      {
        name: "Nested 1",
        path: "/1",
        component: Comp1,
        restricted: true,
      },
      {
        name: "Nested 2",
        path: "/2",
        component: Comp2,
        restricted: true,
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
  user: { access: ["*"] },
};
