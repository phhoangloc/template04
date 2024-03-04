import React, { useEffect, useState } from 'react'
import Input from './input'
import Button from './button'
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
type Props = {
    data: any[]
    func: (e: any) => void,

}

const Properties = ({ data, func }: Props) => {
    const [s, setS] = useState<number>(0)
    const [addProperty, setAddProperty] = useState<string>("")
    const [addValue, setAddValue] = useState<string>("")

    const [editProperty, setEditProperty] = useState<string>("")
    const [editValue, setEditValue] = useState<string>("")


    return (
        <div className={`properties`}>
            <div className="item_test">
                <Input name="property" value={addProperty} onChange={(e) => setAddProperty(e)} />
                <Input name="value" value={addValue} onChange={(e) => setAddValue(e)} />
                <Button name='add' onClick={() => {
                    func([...data, { id: data.length, addProperty, addValue }]);
                    setAddProperty("");
                    setAddValue("");
                }} />
            </div>
            <div className="all_item">
                {
                    data?.reverse().map((item: any, index: number) =>
                        <div className='item_test' key={index}>
                            <Input name="property"
                                value={s === item.id && editProperty || item.addProperty}
                                onChange={(e) => setEditProperty(e)}
                                onfocus={() => setS(item.id)}
                            />
                            <Input name="value" value={s === item.id && editValue || item.addValue} onChange={(e) => setEditValue(e)} onfocus={() => setS(item.id)} />
                            <div className="tool">
                                <CheckIcon
                                    onClick={() => {
                                        data[item.id] = { id: item.id, addProperty: editProperty || item.addProperty, addValue: editValue || item.addValue }
                                        func(data)
                                        setEditProperty("");
                                        setEditValue("");

                                    }} />
                                <DeleteIcon
                                    onClick={() => {
                                        func(data.filter((i: any) => i.id !== item.id))
                                        setEditProperty("");
                                        setEditValue("")
                                    }} />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Properties