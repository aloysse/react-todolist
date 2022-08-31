import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SideImage from "./components/SideImage.js";
import { useAuth } from "./components/Context.js";

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { token, setToken, API_URL } = useAuth();

  const onSubmit = (data) => {
    /*登入post*/
    fetch(API_URL + "users/sign_in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: data }),
    })
      .then((res) => {
        if (res.ok) {
          setToken(res.headers.get("authorization"));
          // console.log(token);
          navigate("/todo-list");
        } else {
          res.json();
          alert(res.message);
          // alert("電子信箱或密碼錯誤");
        }
      })
      .catch((error) => console.error(error));
  };

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
            <Link className="formControls_btnLink" to="/todo-list">
              todolist
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
