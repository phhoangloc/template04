'use client'
import React, { useEffect, useState } from 'react'
import store from '@/redux/store'
import { NoUserAuthen } from '@/action/NoUserAuthen'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from '@/component/asset/button'
import Card from '@/component/asset/card'
const Watch = () => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    const [watchs, setWatch] = useState<any>()

    const getWatch = async (genre: string) => {
        const result = await NoUserAuthen.getItem(genre, "", "")
        if (result.success) {
            setWatch(result.data)
        } else {
            setWatch(undefined)
        }
    }

    useEffect(() => {
        getWatch("watch")
    }, [])

    const toPage = useRouter()

    return (
        <div className={`watch_body`}>
            <div className={`cover center ${currentTheme ? "background_light" : "background_dark"}`}>
                <div className="detail center">
                    <h4>
                        Bạn cảm thấy thiếu tự tin. <br></br>
                        Bạn cần một thứ gì đó làm cho bạn mới vẻ và cuốn hút.<br></br>
                        Có thể những thứ bạn đang cần là một chiếc đồng hồ mới để nâng tầm bản thân!
                    </h4>
                    <Button name='view watch' onClick={() => toPage.push("/home/watch/brand")}></Button>
                </div>
                <div className="image">
                    <Image src={"/img/cover.png"} width={1000} height={1000} alt='cover' />
                </div>
            </div>
            <div className={"reason grid_box"}>
                <div className="the_reason center sx12 md6" style={{ backgroundImage: "url('/img/reason1.jpg')" }}>
                    <h3>Quản lý thời gian</h3>
                    <p>
                        Thử tưởng tượng trên tay bạn là một chiếc đồng hồ đẳng cấp!<br></br>
                        Khi bạn đi thi, đi học hay đi làm bạn sẽ không bị muộn giờ.<br></br>
                        Vì không ai đeo một chiếc đồng hồ đẳng cấp lại đi muộn cả!
                    </p>
                </div>
                <div className="the_reason center sx12 md6" style={{ backgroundImage: "url('/img/reason2.jpg')" }} >
                    <h3>Phong cách cá nhân</h3>
                    <p>
                        Thử tưởng tượng trên tay bạn là một chiếc đồng hồ đẳng cấp!<br></br>
                        Khi bạn đi ra đường bạn không thể vớ đại cái quần đùi hay một bộ đồ luộm thuộm và đeo cái đồng hồ đẳng cấp được.<br></br>
                        Vậy nên để phù hợp với bạn chiếc đồng hồ có giá trị sẽ nâng tầm phong cách của bạn!
                    </p>
                </div>
                <div className="the_reason center sx12 md6" style={{ backgroundImage: "url('/img/reason3.jpg')" }} >
                    <h3>Tăng cường sức khỏe</h3>
                    <p>
                        Thử tưởng tượng trên tay bạn là một chiếc đồng hồ đẳng cấp!<br></br>
                        Khi bạn đi ăn đi uống cà phê với bạn bè, bạn không thể ăn tạm mấy món ăn nhanh ăn vặt hay uống một ly trà sửa lề đường được.<br></br>
                        Bạn cũng không thể lui tới những chỗ chỉ ngồi một chỗ và không làm gì được.<br></br>
                        Chắc chắn bạn sẽ phải đi đến một nơi có nhiều sự vận động để tăng cường sức khỏe.
                    </p>
                </div>
                <div className="the_reason center sx12 md6" style={{ backgroundImage: "url('/img/reason4.jpg')" }} >
                    <h3>Thể hiện đẳng cấp</h3>
                    <p>
                        Đồng hồ đeo tay cao cấp còn là biểu tượng của đẳng cấp và sự thành công.<br></br>
                        Một chiếc đồng hồ sang trọng có thể giúp bạn khẳng định vị trí và thu hút sự chú ý của người khác.<br></br>
                        Mọi người sẽ nghĩ thế nào về bạn khi bạn đeo một chiếc đồng hồ đẳng cấp,<br></br>
                        mặc bộ đồ gọn gàng, tràn đầy năng lượng.
                    </p>
                </div>
            </div>
            <div className="watch_home_items">
                <h2>Đồng Hồ Nam</h2>
                <p className='slogan'>
                    Thời gian không bao giờ trôi qua mà không để lại dấu vết. <br></br>
                    Khám phá và tạo dấu ấn cho cuộc sống của bạn cùng chúng tôi!
                </p>
                <div className="items grid_box">
                    {watchs && watchs.length ?
                        watchs.map((watch: any, index: number) =>
                            <div className={` item xs12 sm6 md4 lg3 `} key={index} onClick={() => toPage.push("watch/" + watch.brand + "/" + watch.slug)}>
                                <Card type='column'
                                    img={process.env.google_url + watch?.img?.[watch?.img?.length - 1].name}
                                    title={watch?.name}
                                    sub={Number(watch.price).toLocaleString('en-US') + "VND"} />
                            </div>)
                        : null}
                </div>
            </div>
        </div>
    )
}

export default Watch