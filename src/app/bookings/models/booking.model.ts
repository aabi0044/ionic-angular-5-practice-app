export class Booking {
    constructor(
        public id: string,
        public userId: string,
        public placeId: string,
        public placeTitle: string,
        public guestNumber: number

    ) { }
}