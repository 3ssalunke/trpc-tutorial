import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

const Register = () => {
  const router = useRouter();
  const { handleSubmit, register } = useForm<CreateUserInput>();

  const { mutate, error } = trpc.useMutation(["users.register-user"], {
    onSuccess: () => {
      router.push("/login");
    },
  });

  const onSubmit = (values: CreateUserInput) => {
    mutate(values);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        <h1>Register</h1>
        <input
          type="email"
          placeholder="mscott@dmpaper.com"
          {...register("email")}
        />
        <br />
        <input type="text" placeholder="Michael S" {...register("name")} />
        <br />
        <button type="submit">Register</button>
      </form>
      <Link href="/login">Already have an account?</Link>
    </>
  );
};

export default Register;
