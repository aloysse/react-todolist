import { Link } from "react-router-dom";

const SignUpPage = () => {
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
          <form class="formControls" action="index.html">
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
              required
            />
            <label class="formControls_label" for="name">
              您的暱稱
            </label>
            <input
              class="formControls_input"
              type="text"
              name="name"
              id="name"
              placeholder="請輸入您的暱稱"
            />
            <label class="formControls_label" for="pwd">
              密碼
            </label>
            <input
              class="formControls_input"
              type="password"
              name="pwd"
              id="pwd"
              placeholder="請輸入密碼"
              required
            />
            <label class="formControls_label" for="pwd">
              再次輸入密碼
            </label>
            <input
              class="formControls_input"
              type="password"
              name="pwd"
              id="pwd"
              placeholder="請再次輸入密碼"
              required
            />
            <input
              class="formControls_btnSubmit"
              type="button"
              //   onclick="javascript:location.href='#todoListPage'"
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
