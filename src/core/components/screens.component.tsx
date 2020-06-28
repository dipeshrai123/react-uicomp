import React, { useContext } from "react"
import { Switch, Route } from "react-router-dom"
import { PrivateRoute, PublicRoute } from "../modules"
import { NavigationContext } from "../contexts"

export const ScreensContainer = () => {
  const { publicPaths: PUBLIC_PATHS, privatePaths: PRIVATE_PATHS } = useContext(
    NavigationContext
  )

  return (
    <Switch>
      {
        // PUBLIC ROUTES
        PUBLIC_PATHS.length &&
          PUBLIC_PATHS.filter(({ path }) => path !== null) // Other than Not Found Page
            .map(({ path, component, restricted, exact = true }, index) => (
              <PublicRoute
                key={index}
                path={path}
                component={component}
                restricted={restricted}
                exact={exact}
              />
            ))
      }
      {
        // PRIVATE ROUTES
        PRIVATE_PATHS.length &&
          PRIVATE_PATHS.map(({ path, component, exact = true }, index) => (
            <PrivateRoute
              key={index}
              path={path}
              component={component}
              exact={exact}
            />
          ))
      }

      {
        // NOT FOUND
        PUBLIC_PATHS.length &&
          PUBLIC_PATHS.filter(({ path }) => path === null).map(
            ({ component: Component }, index) =>
              index === 0 && <Route key={index} render={() => <Component />} />
          )
      }
    </Switch>
  )
}
