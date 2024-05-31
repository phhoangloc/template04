/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    images: {
        loader: 'custom',
        loaderFile: './img-loader.ts',
    },
    env: {
        server_url_: "https://locpham.blog:4000/",
        server_url: "http://localhost:4000/",
        ftp_url: "https://locpham.blog/upload/",
    }
};

export default nextConfig;
