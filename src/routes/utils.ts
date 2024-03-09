import { RouteType } from 'routes/types'

export const protectRoutes = (routes: RouteType[]) =>
  routes.map((route) => ({ ...route, protected: true }))
