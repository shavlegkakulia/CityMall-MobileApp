import axios from 'axios';
import envs from '../config/env';


export interface IResonseError {
    errorDesc: string,
    errorCode: string
};



interface IBarcodeResponseData {
    base64Data: string
}
interface IBarcodeResponse {
    data?: IBarcodeResponseData,
    error?: IResonseError
}

interface IMailOtpRequest {
    mail: string
}

interface ICheckMailOtpRequest {
    email: string,
    otp: string
}

interface IAddVirtualCardRequest {
    personCode: string,
    birthDate: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    address: string | undefined,
    sex: number,
    mailOtp: string
}

export interface IGiftCardOrderRequest {
    name: string,
    phone: string,
    orderDetails: string,
    deliveryType: number,
    deliveryServiceCenter?: number,
    courierDetails?: string
}

export interface IServiceCenter {
    id: number,
    name: string,
    checked: boolean
}

export interface IServiceCenterResponse {
    data: IServiceCenter
}

export interface IDisctrictsRespone {
    id: number,
    name: string
}

class ApiServices {
    GetClientCards = async () => {
        return await axios.get(`${envs.API_URL}/api/Mobile/GetCientCards`);
    };

    GenerateBarcode = async (card: string) => {
        return await axios.get<IBarcodeResponseData>(`${envs.API_URL}/api/Mobile/GenerateBarcode?input=${card}`);
    };

    SendMailOtp = async (data: IMailOtpRequest) => {
        return await axios.post(`${envs.API_URL}/api/Otp/SendMailOtp`, data);
    };

    CheckMailOtp = async (data: ICheckMailOtpRequest) => {
        return await axios.post(`${envs.API_URL}/api/Otp/CheckMailOtp`, data);
    };

    AddVirtualCard = async (data: IAddVirtualCardRequest) => {
        return await axios.post(`${envs.API_URL}/api/Clients/AddVirtCard`, data);
    };

    GetDistricts = async () => {
        return await axios.get<IDisctrictsRespone>(`${envs.API_URL}/api/Organisation/GetDistricts`)
    };

    GetServiceCenters = async () => {
        console.log(`${envs.API_URL}/api/Organisation/GetServiceCenters`)
        return await axios.get(`${envs.API_URL}/api/Organisation/GetServiceCenters`);
    };

    OrderGiftCard = async (data: IGiftCardOrderRequest) => {
        return await axios.post(`${envs.API_URL}/api/Cards/order`, data)
    };


};

export default new ApiServices();