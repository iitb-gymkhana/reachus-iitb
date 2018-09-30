export class Booking {
  constructor(
    public from: string,
    public to: string,
    public councilName: string,
    public purposeOfBooking: string,
    public room: string,
    public fullName: string,
    public contactNumber: string
  ) { }
}