import {
  Marketplace,
  MarketplaceFormData,
  MarketPlaceSelect,
} from 'components/marketplace/types'
import BaseService from 'services/baseService'
import { UserType } from 'core/slices/auth/types'
import { CreateDeliveryRequest, Order } from 'components/orders/types'
import { AddDLAccountFormType } from 'components/settings/dl-account/types'
import { ContragentsResponse } from 'components/settings/contragents/models'
import { ChangePasswordData } from 'components/settings/account-settings/change-password/ChangePasswordModal'
import { ApiVersion } from 'core/types'
import http from './httpService'

class MarketplaceService extends BaseService {
  addMarketplace(marketplaceData: MarketplaceFormData) {
    return http.post<Marketplace>('/marketplace/shops/create', marketplaceData)
  }

  getContragents() {
    return http.post<ContragentsResponse>('/contragents', { fullInfo: true })
  }

  getMarketplaces() {
    return http.get<MarketPlaceSelect[]>('/marketplace/all')
  }

  getShops() {
    return http.get<Marketplace[]>('/marketplace/shops/all')
  }

  getOrders() {
    return http.post<Order[]>('/marketplace/orders')
  }

  getOrder(id: Order['id']) {
    return http.get<Order>(`/marketplace/orders/${id}`)
  }

  addDLAccount(accountData: AddDLAccountFormType) {
    return http.put<UserType>('/users/add_dellin_credentials', accountData)
  }

  deleteAccount(userId: string | undefined) {
    return http.post('/users/delete', { id: userId })
  }

  changePassword(requestData: ChangePasswordData) {
    return http.post('/users/change_password', requestData)
  }

  getBarcode(orderId: Order['id']) {
    return http.get(
      `/marketplace/orders/${orderId}/barcode`,
      {},
      {
        responseType: 'blob',
      }
    )
  }

  buildOrder(orderId: Order['id']) {
    return http.get<Order>(`/marketplace/orders/${orderId}/build`)
  }

  getApiInfo(): Promise<ApiVersion> {
    return http.get('/info')
  }

  getDeliveryRequestData(orderId: string) {
    return http.post(
      `/marketplace/orders/${orderId}/prepare_delivery_request`,
      {}
    )
  }

  createDeliveryRequest(request: CreateDeliveryRequest, orderId: string) {
    return http.post(`/marketplace/orders/${orderId}/delivery_request`, request)
  }
}

export default new MarketplaceService()
