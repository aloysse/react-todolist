import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SideImage from "./components/SideImage.js";
import {
  useAuth,
  setLocalToken,
  setLoacalNickname,
} from "./components/Context.js";
import axios from "axios";
import { useEffect } from "react";

const LoginPage = () => {
  // const { token } = getLocalToken();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { API_URL } = useAuth();

  const onSubmit = (data) => {
    const body = JSON.stringify({
      user: data,
    });
    /*登入post*/
    axios({
      method: "post",
      url: API_URL + "users/sign_in",
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

    // fetch(API_URL + "users/sign_in", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     accept: "application/json",
    //   },
    //   body: JSON.stringify({ user: data }),
    // })
    //   .then((res) => {
    //     setToken(res.headers.get("authorization"));
    //     navigate("/todo-list");
    //     return res.json();
    //   })
    //   .then((resJson) => console.log(resJson))
    //   .catch((error) => alert(error));
  };

  // useEffect(() => {
  //   if (token) {
  //     navigate("/todo-list");
  //   }
  // }, []);

  return (
    <div id="loginPage" className="bg-yellow">
      <div className="conatiner loginPage vhContainer ">
        <SideImage />
        <div>
          <form className="formControls" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
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
              })}
            />
            <span>{errors.email?.message}</span>
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
              })}
            />
            <span>{errors.password?.message}</span>
            <input
              className="formControls_btnSubmit"
              type="submit"
              value="登入"
            />
            <Link className="formControls_btnLink" to="/sign-up">
              註冊帳號
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
