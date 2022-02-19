import { AxiosError } from 'axios';

export interface ModalInviteMemberProps {
  toggleInviteModal?: () => void;
}

export interface FormProps {
  emails: string;
}

export type ParamsProps = {
  projectId: string;
}

export interface ResponseApi {
  message: string;
}

export type PostInviteResponse = ResponseApi;

export type PostInviteError = AxiosError<ResponseApi[]>;
