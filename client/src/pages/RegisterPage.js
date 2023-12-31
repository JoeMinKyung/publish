import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import img from "../img/visualizationImage.png";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");
  const [joininPaddingsize, setjoininPaddingsize] = useState(28);
  const isValid = userId !== "" && isSame === true;
  const navigate = useNavigate();

  //출력 확인용
  // useEffect(() => {
  //   console.log(userId, userPassword, userPasswordCheck);
  // }, [userId, userPassword, userPasswordCheck]);

  function auth() {
    const url = "http://yesql-api.shop:8080";
    axios
      .post(
        url + "/auth/register",
        {},
        { params: { userId: userId, userPassword: userPassword } }
      )
      .then((response) => {
        console.log("Response Data:", response);
        alert("Request Successful");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Request Failed");
      })
      .finally(() => {
        alert("Request Completed");
      });
  }

  //비밀번호, 비밀번호 확인 같은지 확인하는 함수
  function isSame() {
    if (userPassword === userPasswordCheck) {
      return true;
    } else {
      return false;
    }
  }

  //join in 버튼 -> login 페이지 이동
  const goToLogin = () => {
    navigate("/login");
  };

  //에러메세지용 padding 관리
  const handlePasswordChange = () => {
    if (userPasswordCheck !== "" && !isSame()) {
      setjoininPaddingsize(24);
    } else {
      setjoininPaddingsize(28);
    }
  };

  //useEffect로 실시간 출력
  useEffect(() => {
    handlePasswordChange();
  }, [userPasswordCheck, isSame]);

  return (
    <div className="RegisterPage relative h-screen">
      <p className="text-6xl text-yesql-blue pb-12">yeSQL</p>
      <form>
        <div className="flex gap-4">
          <div className="register-box flex flex-col border border-black w-80 rounded-xl">
            <Input
              classStyle="border-b border-black"
              type="text"
              name="id"
              placeholder="id"
              maxlength={10}
              onChange={setUserId}
            />
            <Input
              classStyle="border-b border-black"
              type="password"
              name="password"
              placeholder="password"
              maxlength={20}
              onChange={setUserPassword}
            />
            <Input
              type="password"
              name="password-check"
              placeholder="password check"
              maxlength={20}
              onChange={setUserPasswordCheck}
            />
          </div>

          <Button
            type="idcheck"
            textColor="black"
            buttonColor="yesql-blue/50"
            hoverColor="blue-700"
            text="id check"
          />
        </div>

        <div
          className={`mt-${joininPaddingsize}`}
          // disabled={isValid ? false : true}
          onClick={() => goToLogin()}
          // onClick={() => auth()}
        >
          {userPasswordCheck !== "" && !isSame() && (
            <p className="passwordCheck text-sm text-red-600 font-thin">
              비밀번호가 일치하지 않습니다.
            </p>
          )}
          <Button type="joinin" text="join in" />
        </div>
      </form>
      <div class="absolute bottom-0 right-0">
        <div className="img opacity-50">
          <img src={img} />
        </div>
      </div>
    </div>
  );
};

const Input = ({
  classStyle = "",
  type = "",
  name = "",
  placeholder = "",
  maxlength = 0,
  onChange = null
}) => {
  return (
    <input
      className={`py-2.5 pl-6 bg-transparent ${classStyle}`}
      type={type}
      name={name}
      placeholder={placeholder}
      size="20"
      maxLength={maxlength}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    ></input>
  );
};

export default RegisterPage;
