import { http } from "@/utils/http";
import type { HttpResponse } from "@/utils/http/types.d";

interface CaptchaData {
  captcha_id: string;
  captcha_image: string;
}

// 获取验证码
export const getVerifyCode = () => {
  return http.request<HttpResponse<CaptchaData>>("get", "/api/v1/auth/captcha");
};
