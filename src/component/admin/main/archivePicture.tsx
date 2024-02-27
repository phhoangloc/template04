import React, { useEffect, useState } from 'react'
import store from '@/redux/store'
import { AdminAuthen } from '@/action/AdminAuthen'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { AlertType, setAlert } from '@/redux/reducer/alertReducer';
import PictureView from '@/component/asset/pictureView';
import Input from '@/component/asset/input';
import Icon from '@/component/asset/icon';
import UploadButton from '@/component/asset/uploadButton';
import { UserLoginType } from '@/redux/reducer/UserReduce';

const ArchivePicture = () => {

    const [currentUser, setCurrentUser] = useState<UserLoginType>(store.getState().user)
    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [alert, setCurrentAlert] = useState<AlertType>(store.getState().alert)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentAlert(store.getState().alert))
    }
    update()

    const [data, setData] = useState<any>([])
    const [select, setSelect] = useState<any[]>([])
    const [username, setUsername] = useState<string>("")
    const [item, setItem] = useState<any>()
    const [number, setNumber] = useState<number>(0)
    const getPic = async (u: string) => {
        const result = await AdminAuthen.getPic(u)
        setData(result.data)
    }
    useEffect(() => {
        getPic(username)
    }, [number, username])

    const deleteOne = (item: any) => {
        setItem(item)
        store.dispatch(setAlert({ open: true, value: false, msg: "bạn có chắc là sẽ xóa file này chứ" }))
    }

    const deleleAll = (arr: any[]) => {
        store.dispatch(setAlert({ open: true, value: false, msg: "bạn có chắc là sẽ xóa file này chứ" }))
    }

    const deletePic = async (name: string, id: string, userId: string,) => {

        const picOfUser = await AdminAuthen.getPic(item?.host?.username)
        const newPicsOfUser = picOfUser.data.filter((item: any) => item._id !== id)
        const body = { pic: newPicsOfUser }
        await AdminAuthen.deletePic(name, id)
        await AdminAuthen.editItem("user", userId, body)
        setNumber(pre => pre + 1)
        store.dispatch(setAlert({ open: false, value: false, msg: "" }))
        setItem({})
    }

    useEffect(() => {
        store.getState().alert.value && item?.name && deletePic(item?.name, item?._id, item?.host?._id)
    }, [store.getState().alert.value, item])

    useEffect(() => {
        if (store.getState().alert.value && select.length) {
            select.map(item => deletePic(item?.name, item?._id, item?.host?._id))
        }
    }, [store.getState().alert.value, select])

    const [loading, setLoading] = useState<boolean>(false)
    const uploadPic = async (e: any) => {
        var files = e.target.files;
        const arrFiles: File[] = Object.values(files)
        arrFiles.map((file: File, index: number) => {
            var reader: any = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                setLoading(true)
                const result = await AdminAuthen.uploadFile(file)
                await AdminAuthen.editItem("user", currentUser._id, { pic: [...currentUser.pic, result.data] })
                setNumber(p => p + 1)
                setLoading(false)
            }
        })
    }

    return (
        <div className={`main ${currentMenu ? "main_while_menu_open" : ""}`}>
            <div className="grid_box">
                <div className={`pic center  ${currentTheme ? "background_light" : "background_dark"}`}>
                    <Icon icon={<UploadButton icon={<AddIcon />} size={30} func={(e) => uploadPic(e)} />} />
                </div>
                <div className={`pic center  ${currentTheme ? "background_light" : "background_dark"}`}>
                    <Icon icon={<DeleteIcon />} size={30} onClick={() => select.length && deleleAll(select)} />
                </div>
            </div>
            <PictureView data={data} select={(arr) => setSelect(arr)} selectOne={(item) => deleteOne(item)} loading={loading} />
        </div>

    )
}

export default ArchivePicture