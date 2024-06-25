'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { IsLogin } from "@/context/IsLogin";
import { IUser, UserInfo } from "@/context/UserInfo";
import { AnswersInfo, IAnswers } from "@/context/AnswersInfo";
import { IQuestions, QuestionsInfo } from "@/context/QuestionsInfo";
import { fromAxios, mainAxios } from "@/axios/mainAxios";
import { IsChanged } from "@/context/IsChanged";
import { deleteCookie, getCookie } from "cookies-next";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [isChanged, setIsChanged] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<IUser>({ _id: "", lName: "", fName: "", username: "", email: "" })
  const [answersInfo, setAnswersInfo] = useState<IAnswers[]>([])
  const [questionsInfo, setQuestionsInfo] = useState<IQuestions[]>([])

  const handelAnswersInfo = () => {
    mainAxios.get('/answers', { headers: { Authorization: getCookie('token') } })
      .then((e) => {
        if (e?.data?.message) {
          setAnswersInfo(e?.data?.message)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handelQuestionsInfo = () => {
    mainAxios.get('/questions', { headers: { Authorization: getCookie('token') } })
      .then((e) => {
        if (e?.data?.message) {
          setQuestionsInfo(e?.data?.message)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handelUserInfo = () => {
    fromAxios.get('/me', { headers: { Authorization: getCookie('token') } })
      .then((e) => {
        if (e?.data?.message) {
          setIsLogin(true)
          setUserInfo(e?.data?.message)
        }
      })
      .catch((err) => {
        deleteCookie('token')
      })
  }
  
  useEffect(() => {
    handelUserInfo()
    handelAnswersInfo()
    handelQuestionsInfo()
    setIsChanged(false)
  }, [isLogin, isChanged])
  return (
    <html lang="en">
      <body className={inter.className && 'flex flex-col justify-between min-h-[100dvh]'}>
        <IsChanged.Provider value={{ isChanged, setIsChanged }}>
          <UserInfo.Provider value={{ userInfo, setUserInfo }}>
            <IsLogin.Provider value={{ isLogin, setIsLogin }}>
              <AnswersInfo.Provider value={{ answersInfo, setAnswersInfo }}>
                <QuestionsInfo.Provider value={{ questionsInfo, setQuestionsInfo }}>
                  <Header />
                  {children}
                  <Footer />
                </QuestionsInfo.Provider>
              </AnswersInfo.Provider>
            </IsLogin.Provider>
          </UserInfo.Provider>
        </IsChanged.Provider>
      </body>
    </html>
  );
}
