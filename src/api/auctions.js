import { axiosInstance } from '@/axios';
import { BaseApiController } from '@/api/BaseApiController';

class AuctionsApiController {
  constructor(ApiController) {
    this.baseApiClient = ApiController;
  }

  async getAuction(id) {
    const path = `api/v1/auctions/${id}/`;
    return this.baseApiClient.makeRequest('GET', path);
  }

  async getAuctionList(page) {
    const params = new URLSearchParams();
    params.append('page', page);

    const path = `api/v1/auctions/?${params.toString()}`;
    return this.baseApiClient.makeRequest('GET', path);
  }
}

const auctionsApiController = new BaseApiController(axiosInstance);
export const auctionsApi = new AuctionsApiController(auctionsApiController);
