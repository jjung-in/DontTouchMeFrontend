import { SignUpProps, LogInProps } from '@_types/auth.type';
import {instance} from './instance';

export const PostSignUp = async (SignUpData : SignUpProps ): Promise<SignUpProps[]> => {
    try {
        const { data } = await instance.post('./member/sign-up', SignUpData);
        return data;
    } catch (error) {
        console.error("SignUp Error", error);
        throw new Error("회원가입 오류");
    };
};

export const PostLogIn = async (LogInData : LogInProps ) : promise<LogInProps> => {
    try {
        const { data } = await instance.post('./member/login', LogInData);
        return data;
    } catch (error) {
        console.error("LogIn Error", error);
        throw new Error("로그인 오류");
    };
};

export const EmailDuplicateCheck = async (Email : string) : promise<boolean> => {
    try {
        const { data } = await instance.get('./member/check-email-duplicate', Email);
        return data;
    } catch (error) {
        console.error("Email DuplicateCheck Error", error);
        throw new Error("이메일 중복 체크 오류");
    };
};

export const GetTemporaryPassword = async (Email : string) : promise<string> => {
    try {
        const { data } = await instance.post('./member/issue-temp-password', Email);
        return data;
    } catch (error) {
        console.error("TemporaryPassword Error", error);
        throw new Error("임시 비밀번호 발급 오류");
    };
};

export const SendAuthenticationNumber = async (Email : string) : promise<string> => {
    try {
        const { data } = await instance.post('./mail/send-verification', Email);
        return data;
    } catch (error) {
        console.error("SendAuthenticationNumber Error", error);
        throw new Error("인증번호 전송 오류");
    };
};

export const CheckSendAuthenticationNumber = async (Email : string, number : string) => {
    try {
        const { data } = await instance.post('./mail/verify', { email, number });
        return data;
    } catch (error) {
        console.error("CheckSendAuthenticationNumber Error", error);
        throw new Error("인증번호 확인 오류");
    };
};