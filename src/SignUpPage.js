import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SideImage from "./components/SideImage.js";
import axios from "axios";
import {
  useAuth,
  setLocalToken,
  setLoacalNickname,
} from "./components/Context.js";
import { useState } from "react";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { API_URL } = useAuth();

  const {
    watch,
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newData = {
      email: data.email,
      nickname: data.nickname,
      password: data.password,
    };
    const body = JSON.stringify({ user: newData });

    /*post 註冊資料*/
    // fetch(API_URL + "users", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ user: newData }),
    // })
    axios({
      method: "post",
      url: API_URL + "users",
      data: body,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
      .then((response) => {
        setLocalToken({ token: response.headers.authorization });
        return response;
      })
      .then((response) => {
        setLoacalNickname({ nickname: response.data.nickname });
        navigate("/todo-list");
      })
      .catch((error) => alert(error.response.data.error));
  };

  return (
    <div id="signUpPage" className="bg-yellow">
      <div className="conatiner signUpPage vhContainer">
        <SideImage />
        <div>
          <form className="formControls" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="formControls_txt">註冊帳號</h2>
            <label className="formControls_label" for="email">
              Email
            </label>
            <input
              className="formControls_input"
              type="text"
              id="email"
              name="email"
              placeholder="請輸入 email"
              {...register("email", {
                required: { value: true, message: "此欄位不可留空" },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "請輸入正確Email格式",
                },
              })}
            />
            <span>{errors.email?.message}</span>
            <label className="formControls_label" for="nickname">
              您的暱稱
            </label>
            <input
              className="formControls_input"
              type="text"
              name="nickname"
              id="nickname"
              placeholder="請輸入您的暱稱"
              {...register("nickname", {
                required: { value: true, message: "此欄位不可留空" },
              })}
            />
            <span>{errors.nickname?.message}</span>
            <label className="formControls_label" for="pwd">
              密碼
            </label>
            <input
              className="formControls_input"
              type="password"
              name="pwd"
              id="pwd"
              placeholder="請輸入密碼"
              {...register("password", {
                required: { value: true, message: "此欄位不可留空" },
                pattern: {
                  value: /^[a-zA-Z0-9 ]+$/,
                  message: "密碼限用大小寫英文及數字",
                },
                minLength: {
                  value: 6,
                  message: "密碼最少6碼",
                },
              })}
            />
            <span>{errors.password?.message}</span>
            <label className="formControls_label" for="pwd">
              再次輸入密碼
            </label>
            <input
              className="formControls_input"
              type="password"
              name="confirmPwd"
              id="confirmPwd"
              placeholder="請再次輸入密碼"
              {...register("comfirmPW", {
                required: { value: true, message: "此欄位不可留空" },
                validate: {
                  message: (value) =>
                    value === watch("password")
                      ? clearErrors("comfirmPW")
                      : "密碼不符",
                },
              })}
            />
            <span>{errors.comfirmPW?.message}</span>
            <input
              className="formControls_btnSubmit"
              type="submit"
              value="註冊帳號"
            />
            <Link className="formControls_btnLink" to="/">
              登入
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
