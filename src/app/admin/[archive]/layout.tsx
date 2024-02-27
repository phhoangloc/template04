import React from 'react'


type Props = {
    children: React.ReactNode,
    params: {
        archive: string
    }
}

export async function generateMetadata({ params }: Props) {

    const capitalizeFirstLetter = (inputString: string) => {
        return inputString.charAt(0).toUpperCase() + inputString.slice(1);
    }

    return {
        title: {
            template: '%s | Admin',
            default: capitalizeFirstLetter(params.archive)
        },
    }
}
const Layout = ({ children }: Props) => {
    return children
}

export default Layout