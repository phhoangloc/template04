'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import store from '@/redux/store'
import ListEdit from '@/component/display/listEdit'
type Props = {}

const Page = (props: Props) => {

    return <ListEdit archive='blog' />
}

export default Page