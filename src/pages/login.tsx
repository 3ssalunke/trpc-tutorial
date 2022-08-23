import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("../components/LoginForm"), {
  ssr: false,
});

const Login = () => {
  return <LoginForm />;
};

export default Login;
