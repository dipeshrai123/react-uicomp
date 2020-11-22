import React from "react";
import { useNavigation } from "react-uicomp";

import HomePage from "../components/HomePage";
import DropdownPage from "../components/DropdownPage/DropdownPage";
import ModalPage from "../components/ModalPage";
import AnimatedPage from "../components/Animated";
import ScrollPage from "../components/Scroll";
import TabsPage from "../components/Tabs";
import ToastPage from "../components/Toast";
import UseMountedValuePage from "../components/UseMountedValue";

const Redirect = () => {
  const { navigation } = useNavigation();

  React.useEffect(() => {
    navigation.navigate("/home");
  }, [navigation]);

  return null;
};

export const publicPaths = [
  {
    name: "Root",
    path: "/",
    component: Redirect,
    restricted: true,
    visible: false,
  },
  {
    name: "Home",
    path: "/home",
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
    name: "Toast",
    path: "/toast",
    component: ToastPage,
    restricted: true,
  },
  {
    name: "Use Mounted Value",
    path: "/usemountedvalue",
    component: UseMountedValuePage,
    restricted: true,
    subPaths: [
      {
        name: "Sub",
        path: "/newpathishere",
        component: UseMountedValuePage,
        restricted: true,
      },
    ],
  },
];

export const privatePaths = [
  {
    name: "Toast2",
    path: "/toast2",
    component: ToastPage,
  },
  {
    name: "Use Mounted Value2",
    path: "/usemountedvalue2",
    component: UseMountedValuePage,
    subPaths: [
      {
        name: "Sub2",
        path: "/newpathishere2",
        component: UseMountedValuePage,
      },
    ],
  },
];

export const userRoles = {
  user: { access: ["*"] },
};
