export class Offer {
  constructor(
    public validTill: string,
    public category: string,
    public companyName: string,
    public offerDetails: string,
    public contact: string,
    public offerCode: string
  ) { }
}