import { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { base_url, token_key } from "../constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

type LoginFormType = {
  email: string;
  password: string;
};

const intialState = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState<LoginFormType>(intialState);

  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const { data: response } = await axios.post(
        `${base_url}/user/signIn`,
        loginInfo
      );
      localStorage.setItem(token_key, response.result.token);
      setIsLoading(false);
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      toast.error("Invalid Credentails");
      setIsLoading(false);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="min-w-[600px] border p-3"
    >
      <h1 className="text-3xl font-bold text-center mb-10">Sign In</h1>
      <Form.Item<FieldType>
        label="Email"
        className="font-semibold"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          type="email"
          name="email"
          value={loginInfo.email}
          onChange={onChangeHandler}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        className="font-semibold"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          type="password"
          name="password"
          value={loginInfo.password}
          onChange={onChangeHandler}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          loading={isLoading}
          type="primary"
          htmlType="submit"
          className="bg-blue-500 w-full"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
