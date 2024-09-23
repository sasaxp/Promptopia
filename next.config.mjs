/** @type {import('next').NextConfig} */ 
const nextConfig = { 
    images: { 
        remotePatterns: [
             { 
                protocol: "https", 
                hostname: "lh3.googleusercontent.com", 
                pathname: "**", 
            }, 
        ], 
    }, 
    // Add output option to disable static export
    output: 'standalone', 
    
    webpack(config) { 
        config.experiments = { 
            ...config.experiments, 
            topLevelAwait: true, 
        }; 
        return config; 
    }, 
};

export default nextConfig;

