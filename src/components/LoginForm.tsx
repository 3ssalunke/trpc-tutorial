import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { RequestOtpInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

function VerifyToken({ hash }: { hash: string }) {
  const router = useRouter();
  const { data, isLoading } = trpc.useQuery([
    "users.verify-otp",
    {
      hash,
    },
  ]);

  if (isLoading) {
    return <p>Verifying...</p>;
  }

  router.push(data?.redirect.includes("login") ? "/" : data?.redirect || "/");

  return <p>Redirecting...</p>;
}

const LoginForm = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const { handleSubmit, register } = useForm<RequestOtpInput>();

  const { mutate, error } = trpc.useMutation(["users.request-otp"], {
    onSuccess: () => {
      setSuccess(true);
    },
  });

  const onSubmit = (values: RequestOtpInput) => {
    mutate({ ...values, redirect: router.asPath });
  };

  const hash = router.asPath.split("token=")[1];
  if (hash) {
    return <VerifyToken hash={hash} />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        <h1>Login</h1>
        {success && <p>Check your email</p>}
        <input
          type="email"
          placeholder="mscott@dmpaper.com"
          {...register("email")}
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <Link href="/register">Don&apos;t have an account?</Link>
    </>
  );
};

export default LoginForm;
