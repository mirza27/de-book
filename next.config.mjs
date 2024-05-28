/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lfonwbiekcjyhnnvzcoc.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/book_image/**",
      },
    ],
    // domains: ["lfonwbiekcjyhnnvzcoc.supabase.co"],
  },
};

export default nextConfig;
