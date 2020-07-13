# react-uicomp

> React UI component for creating complex routes and beautiful UI

[![NPM](https://img.shields.io/npm/v/react-uicomp.svg)](https://www.npmjs.com/package/react-uicomp) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### Features

- Handles complex routes / navigation such as _public, private_ and _protected_ routes for any number of user roles
- Provides user roles authentication
- Provides _Theme Provider_ for creating beautiful themes example: _Dark Mode_
- Provides **Dropdown** component for handling a dropdown

## Install

```bash
npm install react-uicomp --save
```

## Usage

#### Navigation

Navigation lets you define all the public, private and protected routes. Protected routes are types of public routes but are restricted which means it cannot be accessed after the user has logged into the web application. To use Navigation, wrap entire application with **<Navigation.Provider>** and provide _publicRoutes_, _privateRoutes_ and _userRoles_.

**Example**

```jsx
import React from "react";
import { Navigation } from "react-uicomp";
import { Page1, Page2 } from "./Pages";

// Array of object having key, name, path, component and restricted.
const publicPaths = [
  {
    key: "Public",
    name: "Public",
    path: "/public",
    component: Page1,
    restricted: true,
  },
];

// Array of object having key, name, path and component.
const privatePaths = [
  {
    key: "Private",
    name: "Private",
    path: "/private",
    component: Page2,
  },
];

// Define user role and provide access routes.
const userRoles = { 
    user: { access: ["/public"] }, 
    admin:  { access: ["/public", "/private"] },
};

const App = () => {
  return (
    <Navigation.Provider
      publicPaths={publicPaths}
      privatePaths={privatePaths}
      userRoles={userRoles}
    >
      // ...
    </Navigation.Provider>
  );
};

export default App;
```

It has **useNavigation()** hook which returns an object with **navigation**, **history**, **location**, **params** as its properties. **navigation** is an object of two keys **routes** object and **navigate** method. **navigate** method is similar to **_history.push()_** which will take take string path and navigates to given path. 

#### Auth

Auth lets you authenticate if a user is logged in or not. It has **<Auth.Provider>** where you define the _config_ prop object with _isLoggedIn_ and _userRole_. It also has state prop where you can pass any object which will be available in entire application. And to render all the pages you have set up, use **<Auth.Screens />** inside <Auth.Provider>. 

**Example**

```jsx
// import Auth from here
import { Navigation, Auth } from "react-uicomp";

...

const App = () => {
  const [config, setConfig] = useState({ isLoggedIn: false, userRole: "user" });

  return (
    <Navigation.Provider
      publicPaths={publicPaths}
      privatePaths={privatePaths}
      userRoles={userRoles}
    >
      <Auth.Provider
        config={config}
        state={{
          logout: () => {
            setConfig({ isLoggedIn: false, userRole: "user" });
          }
        }}
      >
        <Auth.Screens />
      </Auth.Provider>
    </Navigation.Provider>
  );
};
```

It has **useAuth()** hook which lets you access state object from any component from entire application. 

**Example**

```jsx
// import useAuth
import { useAuth } from "react-uicomp";

export default function() {
    
    // logout function is available on state prop in <Auth.Provider>
    const { logout } = useAuth();
    
    return () {
        // ...
    }
}
```

#### Theme

Theming is very essential to every app nowadays. So, we provided theming control in this package. Lets say, if you want to create dark mode and light mode in application. So, lets define both dark and light mode objects. 

**Example**

```jsx
// Dark theme object variable
const darkTheme = {
    dark: true,
    // colors cannot have other keys except these...
    colors: {
        backgroundColor: "#1F1B24",
        primaryColor: "#1A6AA7",
        secondaryColor: "#989898",
        highlightColor: "#FA0404",
        textColor: "#FFFFFF",
        borderColor: "#353535",
        cardColor: "#383838",
    }
}

// Light theme object variable
const lightTheme = {
    dark: false,
    colors: {
        backgroundColor: "#F8F8F8",
        primaryColor: "#2196F3",
        secondaryColor: "#989898",
        highlightColor: "#EB4034",
        textColor: "#353535",
        borderColor: "#E1E1E1",
        cardColor: "#FFFFFF",
    },
}
```

Okay now we have set themes for dark and light mode. Lets use it with **<Theme.Provider>** component which has _theme_ prop object and _toggleTheme_ prop function. Both _theme_ prop and _toggleTheme_ function is available for entire application.

**Example**

```jsx
// import Theme from here
import { Navigation, Auth, Theme } from "react-uicomp";

...

const App = () => {
    const [ activeTheme, setActiveTheme ] = useState("light");
    
    const theme = activeTheme === "light" ? lightTheme : darkTheme;
    
    const toggleTheme = () => {
        setActiveTheme(prev => prev === "light" ? darkTheme : lightTheme);
    }
    
    return (
    	<Navigation.Provider>
        	<Theme.Provider theme={theme} toggleTheme={toggleTheme}>
            	<Auth.Provider>
                	<Auth.Screens />
                </Auth.Provider>
            </Theme.Provider>
        </Navigation.Provider>
    )
};
```

Both _theme_ and _toggleTheme_ can be accessed with **useTheme()** hook.

**Example**

```jsx
// import useTheme
import { useTheme } from "react-uicomp";

export default function() {
    
    // It has theme object and toggleTheme function
    const { colors, toggleTheme } = useTheme();
    
    return () {
        {/* use it like this which is changed automatically when toggleTheme function is called */}
        <div style={{ color: colors.primaryColor }}>
        	Paragraph Text
        </div>
    }
}
```

#### Dropdown

It has Dropdown component which can be very helpful for you to create dropdown functionality easily.

**Example**

```jsx
import { Dropdown } from "react-uicomp";

export default function() {
    return() {
        <Dropdown triggerElement={() => <button>Click Me</button>}>
            <div>Dropdown Content</div>
        </Dropdown>
    }
}
```

**props**

| Props                                 | Type                                             | Description                                                  | Default       |
| ------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------ | ------------- |
| children                              | element node                                     | React Node which will be the dropdown content                | -             |
| triggerElement                        | function                                         | Function which should return the element which will trigger the dropdown | -             |
| active(optional)                      | boolean                                          | Sets default state of dropdown, either it is active or not by default | false         |
| isAnimated(optional)                  | boolean                                          | Should animate or not while toggling between dropdown        | false         |
| animationType(optional)               | "fade" \| "expand"                               | Type of animation for dropdown                               | "expand"      |
| dropdownStyles(optional)              | style                                            | Style object to style the dropdown                           | -             |
| placement(optional)                   | "bottomleft" \| "bottommiddle" \|  "bottomright" | Defines the direction of dropdown                            | "bottomright" |
| dismissOnOutsideClick(optional)       | boolean                                          | Should dismiss dropdown if we click outside dropdown         | true          |
| dismissOnInsideClick(optional)        | boolean                                          | Should dismiss dropdown if we click on content inside dropdown | false         |
| toggleOnTriggerElementClick(optional) | boolean                                          | Should toggle the dropdown if we click trigger element       | false         |

#### DropdownMenu

UI component for Dropdown Element with default styling provided by **react-uicomp**.

**props**

| Props    | Type          | Description                            | Default |
| -------- | ------------- | -------------------------------------- | ------- |
| children | element nodes | Should contain list of dropdown items  | -       |
| style    | element style | It is used to override default styling | -       |

#### DropdownMenuItem

It defines the menu items for DropdownMenu.

**props**

| Props            | Type          | Description                            | Default |
| ---------------- | ------------- | -------------------------------------- | ------- |
| children         | element nodes | Can contain any element node or text   | -       |
| danger(optional) | boolean       | Highlights the item with default color | false   |
| onClick          | function      | Handles onClick event for an item      | -       |
| style            | element style | It is used to override default styling | -       |

#### DropdownMenuSeparator

It provides some default margin and padding to top and bottom with default border styling.

**Example**

```tsx
import { Dropdown } from "react-uicomp";

export default function() {
    return() {
        <Dropdown triggerElement={() => <button>Toggle Menu</button>}>
            <DropdownMenu>
              <DropdownMenuItem onClick={() => false}>Item 1</DropdownMenuItem>
              <DropdownMenuItem onClick={() => false}>Item 2</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => false} danger={true}>
                Item 3
              </DropdownMenuItem>
            </DropdownMenu>
        </Dropdown>
    }
}
```



## License

MIT © [dipeshrai123](https://github.com/dipeshrai123)
