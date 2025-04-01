import { useQuery, useMutation } from '@tanstack/react-query';
import {
  PostSignUp,
  PostLogIn,
  EmailDuplicateCheck,
  GetTemporaryPassword,
  SendAuthNumber,
  CheckAuthNumber,
} from '@_api/auth';

//로그인
export const useLogIn = () => {
  return useMutation({
    mutationFn: PostLogIn,
    onSuccess: (result) => {
      console.log('login success', result);
      // const { accessToken, refreshToken } = result;
      // localStorage.setItem('accessToken', accessToken);
      // localStorage.setItem('refreshToken', refreshToken);
    },
    onError: (error) => {
      console.error('LogIn Error', error);
    },
  });
};

//회원가입
export const useSignUp = () => {
  return useMutation({
    mutationFn: PostSignUp,
    onSuccess: (result) => {
      console.log('SignUp success', result);
    },
    onError: (error) => {
      console.error('SignUp Error', error);
    },
  });
};

export const useEmailDuplicateCheck = () => {
  const mutation = useMutation({
    mutationFn: EmailDuplicateCheck,
    onSuccess: (result) => {
      console.log('이메일 중복 확인 success', result);
      if (!result.isDuplicated) {
        sendAuthNumber(result.email);
      } else {
        console.log('이미 존재하는 이메일입니다.');
      }
    },
    onError: (error) => {
      console.error('이메일 중복 확인 Error', error);
    },
  });
  // 인증번호 발급
  const sendAuthNumber = useMutation({
    mutationFn: SendAuthNumber,
    onSuccess: (result) => {
      console.log('인증번호 발급 success', result);
    },
    onError: (error) => {
      console.error('인증번호 발급 Error', error);
    },
  });

  return { mutation, sendAuthNumber };
};

//이메일 중복 확인
// export const useEmailDuplicateCheck = () => {
//   const mutation = useMutation({
//     mutationFn: EmailDuplicateCheck,
//     onSuccess: (result) => {
//       console.log('이메일 중복 확인 success', result);
//       if (result.isDuplicated) {
//         console.log('이미 존재하는 이메일입니다.');
//       } else {
//         console.log('이메일이 중복되지 않습니다.');
//         useSendAuthNumber(result.email);
//       }
//     },
//     onError: (error) => {
//       console.error('이메일 중복 확인 Error', error);
//     },
//   });
//   return mutation;
// };

//임시 비밀번호 발급
export const useGetTemporaryPassword = (email: string) => {
  const { data } = useQuery<string>({
    mutationFn: GetTemporaryPassword,
    queryKey: ['password', email],
    onSuccess: (result) => {
      console.log('임시 비밀번호 발급 success', result);
      // localStorage.setItem('temporaryPassword', result);
      // alert('임시 비밀번호가 발급되었습니다.');
      // alert(`임시 비밀번호는 ${result}입니다.`);
      // alert('로그인 후 비밀번호를 변경해주세요.');
    },
    onError: (error) => {
      console.error('임시 비밀번호 발급 Error', error);
    },
  });
  return { data };
};

//이메일 인증번호 발급
// export const useSendAuthNumber = (email: string) => {
//   const { data } = useQuery<string[]>({
//     mutationFn: SendAuthNumber,
//     queryKey: ['number', email],
//     onSuccess: (result) => {
//       console.log('인증번호 발급 success', result);
//     },
//     onError: (error) => {
//       console.error('인증번호 발급 Error', error);
//     },
//   });
//   return { data };
// };

//이메일 인증번호 확인
export const useCheckAuthNumber = (email: string, number: string) => {
  const { data } = useQuery<string[]>({
    queryKey: ['number', { email, number }],
    queryFn: () => CheckAuthNumber(email, number),
    onError: (error) => {
      console.error('useCheckAuthNumber', error);
    },
  });
  return { data };
};
