import { SignUpProps, LogInProps} from "@_types/auth.type"
import { PostSignUp, PostLogIn, EmailDuplicateCheck, GetTemporaryPassword, SendAuthenticationNumber, CheckSendAuthenticationNumber } from "@_api/auth"
import { useQuery } from '@tanstack/react-query';

export const UseLogIn = (LogInData : LogInProps) => {
    const { data, error } = useQuery<LogInProps>({
        queryKey: ['logIn', LogInData],
        queryFn: () => PostLogIn(LogInData),
        enabled : !!logInData.username && !!logInData.password,
        onError: (error) => {
            console.error(error);
        }
    });
    return { data, error };
};