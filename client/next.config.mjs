import path from 'path';

const config = {
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(process.cwd());
        // เพิ่ม alias เพิ่มเติมตามความต้องการ
        return config;
    },
    images: {
        domains: ['m.media-amazon.com','localhost', 'www.pexels.com','images.pexels.com'], // เพิ่มโดเมนที่ต้องการใช้รูปภาพจากนั้นที่นี่
    },
};

export default config;


