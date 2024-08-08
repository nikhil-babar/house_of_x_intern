/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as CreateImport } from './routes/create'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const CreateRoute = CreateImport.update({
  path: '/create',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/create': {
      id: '/create'
      path: '/create'
      fullPath: '/create'
      preLoaderRoute: typeof CreateImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({ IndexRoute, CreateRoute })

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/create"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/create": {
      "filePath": "create.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
