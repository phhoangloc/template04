'use client'
import LightModeIcon from '@mui/icons-material/LightMode';
import store from '@/redux/store';
import { setTheme } from '@/redux/reducer/ThemeReduce';
import { useState } from 'react';
import { UserLoginType } from '@/redux/reducer/UserReduce';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function Home() {

  const toPage = useRouter()

  useEffect(() => {
    toPage.push("/home")
  }, [])
}
