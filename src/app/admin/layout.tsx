import React from 'react'
import LayoutRow from '@/component/layout/layoutRow'
import Menu from '@/component/asset/menu'
import { Metadata } from 'next';
import MiddlewareUser from '@/component/middleware/middlewareUser';

export const metadata: Metadata = {
    title: "Admin",
};

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    const data = [
        {
            name: "dashboard",
            child: [
                { name: "default", link: "/admin" },
                { name: "media", link: "/admin/media" },
            ]
        },
        {
            name: "blog",
            child: [
                { name: "new blog", link: "/admin/blog/new" },
                { name: "blogs", link: "/admin/blog" },
            ]
        },
        {
            name: "users",
            child: [
                { name: "users", link: "/admin/user" },
                { name: "profile", link: "/admin/profile" },
            ]
        },
    ]

    return (
        <LayoutRow naviLeft={<Menu data={data} width="200px" />} naviLeftWitdh='200px'>
            <MiddlewareUser>
                {children}
            </MiddlewareUser>
        </LayoutRow>
    )
}

export default layout