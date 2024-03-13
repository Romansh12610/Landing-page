/** @type {import('next').NextConfig} */

import path from 'node:path';

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(path.dirname('.'), 'styles')],
    },
};

export default nextConfig;
