import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  apiBaseUrl = environment.apiBaseUrl;

  public createOffer(offer) {
    return this.http.post<{message: string}>(
      `${this.apiBaseUrl}/offers`,
      offer);
  }

  public getAllOffers(params) {
    const options = { 
      params: params
    };

    return this.http.get(
      `${this.apiBaseUrl}/offers`, options
    );
  }

  public deleteOffer(_id) {
    return this.http.delete(
      `${this.apiBaseUrl}/offers/${_id}`
    );
  }

  public approveOffer(_id) {
    return this.http.patch(
      `${this.apiBaseUrl}/offers/${_id}/status`,
      { status: 'Approved' }
    );
  }

  public rejectOffer(_id) {
    return this.http.patch(
      `${this.apiBaseUrl}/offers/${_id}/status`,
      { status: 'Rejected' }
    );
  }

  public resolveConflict(approveId, rejectId) {
    return this.http.patch(
      `${this.apiBaseUrl}/offers/conflict`,
      {
        approveId: approveId,
        rejectId: rejectId
      }
    );
  }

  public getOfferImageUrl(offerImageName) {
    return `${this.apiBaseUrl}/uploads/${offerImageName}`;
  }

  constructor(
    private http: HttpClient
  ) { }
}
