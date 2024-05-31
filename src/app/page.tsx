'use client'
import React, { useState, useEffect } from 'react'
import Clock from '@/component/asset/clock';
import LayoutRow from '@/component/layout/layoutRow';
import store from '@/redux/store';
import Menu from '@/component/asset/menu';
import Link from 'next/link';
import { NoUserAuthen } from '@/api/NoUserAuthen';

const Page = () => {

  const data = [
    {
      name: "app",
      child: [
        { name: "home", link: "/home" },
        { name: "blog", link: "/home/blog" },
      ]
    },
    {
      name: "history",
    },
    {
      name: "pages",
      child: [
        { name: "admin", link: "/admin" },
      ]
    },
  ]

  const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
  const [currentTheme, setCurrentTheme] = useState<any>(store.getState().theme)
  const update = () => {
    store.subscribe(() => setCurrentUser(store.getState().user))
    store.subscribe(() => setCurrentTheme(store.getState().theme))

  }
  useEffect(() => {
    update()
  })

  const naviLeftWitdh: string = "200px"


  const [news, setNews] = useState<any[]>([])

  const getNews = async (g: string, rss: string) => {
    const result = await NoUserAuthen.getNews(g, rss)
    setNews(result)
  }
  useEffect(() => {
    getNews("rss", "https://cafebiz.vn/rss/home.rss")
  }, [])

  return (
    <LayoutRow
      naviLeftWitdh={naviLeftWitdh}
      naviLeft={<Menu data={data} width={naviLeftWitdh} />}
    >
      <div className='width-100p display-flex flex-direction-column justify-content-center' style={{ height: "calc(100vh - 60px)" }}>
        <Clock />
        <div className={`scrollbar-5px ${currentTheme ? "light1" : "dark1"}`} style={{ width: "90%", maxWidth: "768px", margin: "0 auto", height: "300px", overflow: "auto", padding: "10px", boxShadow: "0px 0px 2px #888", borderRadius: "5px" }}>
          {
            news.length ? news.map((d: any, i: number) =>
              <div key={i} style={{ margin: "20px 0", padding: "5px" }} >
                <Link href={d.link} target="_blank" style={{ color: "inherit", opacity: 1, textDecoration: "none" }} title={d.title}>
                  <div dangerouslySetInnerHTML={{ __html: d.title }}
                    style={{ width: "100%", fontWeight: "bold", fontSize: "1rem", textWrap: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} />
                </Link>
                <div dangerouslySetInnerHTML={{ __html: d.content }} style={{ margin: "10px 0", overflow: "hidden", opacity: "0.75", textAlign: "justify" }} />
              </div>) : null
          }
        </div>
      </div>
    </LayoutRow >
  )
}

export default Page
