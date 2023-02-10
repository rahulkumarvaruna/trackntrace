// tslint:disable-next-line:class-name
export class EnrouteReport {
    constructor(
        public Indent_Date: string,
        public Placement_Date: string,
        public Vehicle_No: string,
        public LR_No: string,
        public LR_Date: string,
        public Origin: string,
        public Destination: string,
        public Consignor: string,
        public Consignee: string,
        public CurrentStatus: string,
        public Actual_tat_days: string,
        public Actual_EDD: string,
        public ETA: string
        ) {}
}
