import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUpPage = () => {
  const {
    watch,
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div id="signUpPage" class="bg-yellow">
      <div class="conatiner signUpPage vhContainer">
        <div class="side">
          <a href="#!">
            <img
              class="logoImg"
              src="https://upload.cc/i1/2022/03/23/rhefZ3.png"
              alt=""
            />
          </a>
          <img
            class="d-m-n"
            src="https://upload.cc/i1/2022/03/23/tj3Bdk.png"
            alt="workImg"
          />
        </div>
        <div>
          <form class="formControls" onSubmit={handleSubmit(onSubmit)}>
            <h2 class="formControls_txt">註冊帳號</h2>
            <label class="formControls_label" for="email">
              Email
            </label>
            <input
              class="formControls_input"
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
            <label class="formControls_label" for="name">
              您的暱稱
            </label>
            <input
              class="formControls_input"
              type="text"
              name="name"
              id="name"
              placeholder="請輸入您的暱稱"
              {...register("name", {
                required: { value: true, message: "此欄位不可留空" },
              })}
            />
            <span>{errors.name?.message}</span>
            <label class="formControls_label" for="pwd">
              密碼
            </label>
            <input
              class="formControls_input"
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
            <label class="formControls_label" for="pwd">
              再次輸入密碼
            </label>
            <input
              class="formControls_input"
              type="password"
              name="pwd"
              id="pwd"
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
              class="formControls_btnSubmit"
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
