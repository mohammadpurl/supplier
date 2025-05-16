export type VerifyUserModel = {
  mobile: string;
  code: string;
};

export type SendAuthCode = {
  mobile: string;
};

export type NewVerifyUserModel = {
  formData: FormData;
};

export type NNewVerifyUserModel = {
  formData: URLSearchParams;
};
