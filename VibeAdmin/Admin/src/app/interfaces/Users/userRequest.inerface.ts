export interface UserRequest {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: Date;
    visible: boolean;
    checked: boolean;
    __v: number;
}

export interface RequestResponse {

    requests: UserRequest[];
}