import React from 'react'
import SingleWatch from '@/component/admin/main/singleWatch'
import SingleUser from '@/component/admin/main/singleUser'
type Props = {
    params: { archive: string, id: string }
}

const Page = ({ params }: Props) => {
    switch (params.archive) {
        case "watch":
            return <SingleWatch archive={params.archive} id={params.id} />
        case "user":
            return <SingleUser archive={params.archive} id={params.id} />
    }
    return (
        <div>
            archive:{params.archive}<br></br>
            id:{params.id}
        </div>
    )
}

export default Page