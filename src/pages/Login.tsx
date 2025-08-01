import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useLogin } from "../services/authServices";
import { loginSchema } from "../utils/validation";
import type { LoginRequest } from "../types/auth";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setCredentials } from "../store/slices/authSlice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Toast from "../components/ui/Toast";

const Login: React.FC = () => {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      const response = await loginMutation.mutateAsync(data);

      if (response.status === 0 && response.data?.token) {
        // Store user data from login response
        const userData = {
          email: data.email,
          first_name: "User",
          last_name: "Nutech",
        };

        dispatch(
          setCredentials({ user: userData, token: response.data.token })
        );
        setToast({ message: "Login berhasil!", type: "success" });

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setToast({ message: response.message || "Login gagal", type: "error" });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setToast({
        message: error.response?.data?.message || "Login gagal",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-red-600 rounded-full mr-2"></div>
              <span className="text-xl font-bold">SIMS PPOB</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Masuk atau buat akun untuk memulai
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("email")}
              type="email"
              placeholder="masukan email anda"
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              error={errors.email?.message}
            />

            <Input
              {...register("password")}
              type="password"
              placeholder="masukan password anda"
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              error={errors.password?.message}
            />

            <Button
              type="submit"
              className="w-full"
              isLoading={loginMutation.isPending}
            >
              Masuk
            </Button>

            <p className="text-center text-sm text-gray-600">
              belum punya akun? registrasi{" "}
              <Link to="/register" className="text-red-600 hover:text-red-500">
                di sini
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:block flex-1 bg-gradient-to-br from-pink-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Geometric shapes */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-green-400 rounded-full opacity-60"></div>
            <div className="absolute top-20 -left-10 w-6 h-6 bg-purple-400 rotate-45"></div>
            <div className="absolute -bottom-5 right-10 w-8 h-8 bg-yellow-400 rotate-45"></div>
            <div className="absolute bottom-10 -left-5 w-4 h-8 bg-pink-400"></div>

            {/* Person illustration placeholder */}
            <div className="w-80 h-80 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <div className="text-white text-6xl">👤</div>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Login;
