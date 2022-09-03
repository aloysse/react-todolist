import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAuth,
  getLocalToken,
  setLocalToken,
  getLocalNickname,
} from "./components/Context.js";

const TodoList = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputvalue] = useState("");
  const { API_URL } = useAuth();
  const { token } = getLocalToken();
  const { nickname } = getLocalNickname();
  const [tab, setTab] = useState([
    { tabName: "全部", actived: true },
    { tabName: "待完成", actived: false },
    { tabName: "已完成", actived: false },
  ]);

  // 取得 todos
  const getTodos = async () => {
    await fetch(API_URL + "todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.todos);
        return data;
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (token) {
      getTodos();
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    // console.log(todos);
  }, [todos]);

  // 增加 todo
  const handleAddTodo = (e) => {
    e.preventDefault();
    fetch(API_URL + "todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ todo: { content: inputValue } }),
    })
      .then((res) => res.json())
      .then((data) => {
        getTodos();
        setInputvalue("");
      })
      .catch((error) => console.error(error));
  };

  // 切換完成 checkbox
  const handleChecked = async (id) => {
    await fetch(API_URL + "todos/" + id + "/toggle", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }).then((res) => res.json());
    await getTodos();
  };

  //刪除事項
  const handleDeletetTodo = (e, id) => {
    e.preventDefault();
    fetch(API_URL + "todos/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => getTodos())
      .catch((error) => console.error(error));
  };

  //登出
  const logOut = (e) => {
    e.preventDefault();
    fetch(API_URL + "user/sign_out", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    })
      .then((data) => setLocalToken(""))
      .then((data) => navigate("/"))
      .catch((error) => console.error(error));
  };

  //切換標籤
  const changeTab = (tabName) => {
    setTab(
      tab.map((item) =>
        item.tabName === tabName
          ? { tabName: item.tabName, actived: true }
          : { tabName: item.tabName, actived: false }
      )
    );
  };

  //標籤元件
  const Tab = () => {
    // console.log(tab);

    return tab.map((item, index) => {
      const { tabName, actived } = item;
      return (
        <li key={index}>
          <a
            href="#/todo-list"
            onClick={() => changeTab(tabName)}
            className={actived ? "active" : ""}
          >
            {tabName}
          </a>
        </li>
      );
    });
  };

  //todo list 元件
  const TodoListItem = ({ todos, tab }) => {
    const TabFilter = tab.filter((item) => item.actived == true)[0].tabName;

    return todos
      .filter((item) => {
        if (TabFilter == "全部") return item;
        else if (TabFilter == "待完成") return item.completed_at == null;
        else if (TabFilter == "已完成") return item.completed_at != null;
      })
      .map((item, index) => {
        return (
          <li key={index}>
            <label className="todoList_label">
              <input
                className="todoList_input"
                type="checkbox"
                checked={item.completed_at}
                onChange={() => handleChecked(item.id)}
              />
              <span>{item.content}</span>
            </label>
            <a href="#!" onClick={(e) => handleDeletetTodo(e, item.id)}>
              <i className="fa fa-times"></i>
            </a>
          </li>
        );
      });
  };

  return (
    <div id="todoListPage" className="bg-half">
      <nav>
        <h1>
          <a>ONLINE TODO LIST</a>
        </h1>
        <ul>
          <li className="todo_sm">
            <a href="#!">
              <span>{nickname}的代辦</span>
            </a>
          </li>
          <li>
            <a href="#loginPage" onClick={logOut}>
              登出
            </a>
          </li>
        </ul>
      </nav>
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <div className="inputBox">
            <input
              type="text"
              placeholder="請輸入待辦事項"
              value={inputValue}
              onChange={(e) => setInputvalue(e.target.value)}
            />
            <a href="#!" onClick={handleAddTodo}>
              <i className="fa fa-plus"></i>
            </a>
          </div>
          <div className="todoList_list">
            <ul className="todoList_tab">
              <Tab tab={tab} />
            </ul>
            <div className="todoList_items">
              <ul className="todoList_item">
                <TodoListItem todos={todos} tab={tab} />
                {/* {todos.length === 0 ? (
                  <li>
                    <span className="todoList_label">目前尚無代辦事項</span>
                  </li>
                ) : (
                  <TodoListItem todos={todos} tab={tab} />
                )} */}
              </ul>
              <div className="todoList_statistics">
                <p>
                  {" "}
                  {
                    todos.filter((item) => item.completed_at == null).length
                  }{" "}
                  個待完成項目
                </p>
                <a href="#!">清除已完成項目</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
