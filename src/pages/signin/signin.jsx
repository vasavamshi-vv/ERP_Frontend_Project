import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import ApiClient from "../../network/api-client";
import "./signin.css";
import siteLogo from "../../assets/signin/sitelogo.png";
import EyeToggle from "../../components/reuseComponents";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must contain at least 8 characters" }),
});

export default function Signin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
const showErrorToast = (msg) => {
  if (toast.isActive("login-error")) {
    toast.update("login-error", {
      render: msg,
      type: "error",
      autoClose: 7000,
    });
  } else {
    toast.error(msg, {
      toastId: "login-error",
      autoClose: 7000,
    });
  }
};

const onSubmit = async (values) => {
  setLoading(true);
  try {
    const response = await ApiClient.post("/login/", {
      email: values.email,
      password: values.password,
    });
    console.log(response)
    const data = response.data;
    if (data?.token) {
      const cleanToken = data.token.replace(/^token\s+/i, "");
      localStorage.setItem("token", cleanToken);
      localStorage.setItem("user", JSON.stringify(data.user || { email: values.email }));

      // ✅ Wait until storage is updated before navigating
      await new Promise((resolve) => setTimeout(resolve, 200));

      toast.success("Signed in successfully!");
      navigate("/dashboard", { replace: true });
      reset();
    } else {
      toast.error("Invalid email or password");
    }
  } catch (error) {
      if (error?.response?.status === 401) {
        showErrorToast("Invalid email or password");
      } else {
        showErrorToast("Something went wrong. Please try again later.");
      }
    }
 finally {
    setLoading(false);
  }
};

  return (
    <div className="signin-page">
      <div className="signin-img">
        <img src={siteLogo} alt="Site Logo" />
        <p>Think the design, design the thinking</p>
      </div>

      <div className="signin-form">
        <div className="signin-cointained">
          <div className="welcome">Sign In</div>
          <p>Welcome back! Let’s make work smarter, not harder.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="username-cointainer">
              <input
                type="email"
                placeholder="Email"
                className="username"
                {...register("email")}
              />
              {errors.email && <p className="error-text">{errors.email.message}</p>}
            </div>

            <div className={`password-cointainer`}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="password"
                {...register("password")}
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
              />
              <EyeToggle
                show={showPassword}
                onToggle={() => setShowPassword(!showPassword)}
              />
              {errors.password && <p className="error-text">{errors.password.message}</p>}
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {/* <div id="changer-link">
              Don’t have an account?{" "}
              <Link to="/sign-up" className="link">
                Sign Up
              </Link>
            </div> */}
          </form>

        </div>
      </div>
    </div>
  );
}


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { toast } from "react-toastify";
// import ApiClient from "../../network/api-client";
// import "./signin.css";
// import siteLogo from "../../assets/signin/sitelogo.png";
// import EyeToggle from "../../components/reuseComponents";

// const loginSchema = z.object({
//   email: z.string().email({ message: "Invalid email address" }),
//   password: z.string().min(8, { message: "Password must contain at least 8 characters" }),
// });

// export default function Signin() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: ""
//     }
//   });

//   const onSubmit = async (values) => {
//     setLoading(true);
//     try {
//       const response = await ApiClient.post("/login/", {
//         email: values.email,
//         password: values.password,
//       });
//       const data = response.data;

//       if (data?.token) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user || { email: values.email }));
//         toast.success("Signed in successfully!");
//         navigate("/dashboard", { replace: true });
//       } else {
//         toast.error(data?.detail || "Invalid email or password");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       const errMsg =
//         error?.response?.data?.detail ||
//         error?.response?.data?.message ||
//         "Something went wrong. Please try again later.";
//       toast.error(errMsg);
//     } finally {
//       setLoading(false);
//       reset();
//     }
//   };

//   return (
//     <div className="signin-page">
//       <div className="signin-img">
//         <img src={siteLogo} alt="Site Logo" />
//         <p>Think the design, design the thinking</p>
//       </div>
//       <div className="signin-form">
//         <div className="signin‑cointained">
//           <div className="welcome">Sign In</div>
//           <p>Welcome back! Let’s make work smarter, not harder.</p>
//           <form onSubmit={handleSubmit(onSubmit)} className="w‑full">
//             <div className="username‑cointainer">
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="username"
//                 {...register("email")}
//               />
//               {errors.email && <p className="error‑text">{errors.email.message}</p>}
//             </div>
//             <div className="password‑cointainer">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 className="password"
//                 {...register("password")}
//               />
//               <EyeToggle show={showPassword} onToggle={() => setShowPassword(!showPassword)} />
//               {errors.password && <p className="error‑text">{errors.password.message}</p>}
//             </div>
//             <button type="submit" className="login‑button" disabled={loading}>
//               {loading ? "Signing In..." : "Sign In"}
//             </button>
//             <div id="changer‑link">
//               Don’t have an account? <Link to="/sign‑up" className="link">Sign Up</Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
