// components/Metadata.js
import Head from 'next/head';

const Metadata = ({ title, description, url, image, ogType }: { title?: string, description?: string, url?: string, image?: string, ogType?: string }) => {
     const defaultTitle = "Avtomobil yo'llari ilmiy-tadqiqot instituti";
     const defaultDescription = "Avtomobil yo'llari ilmiy-tadqiqot instituti";
     const defaultImage = "";
     const defaultUrl = "https://www.example.com";

     return (
          <Head>
               <title>{title ? `${title} - ${defaultTitle}` : defaultTitle}</title>
               <meta name="description" content={description ?? defaultDescription} />
               <meta property="og:title" content={title ? `${title} - ${defaultTitle}` : defaultTitle} />
               <meta property="og:description" content={description ?? defaultDescription} />
               <meta property="og:type" content={ogType ?? "website"} />
               <meta property="og:url" content={url ?? defaultUrl} />
               <meta property="og:image" content={image ?? defaultImage} />
               <meta name="twitter:card" content="summary_large_image" />
               <meta name="twitter:title" content={title ?? defaultTitle} />
               <meta name="twitter:description" content={description ?? defaultDescription} />
               <meta name="twitter:image" content={image ?? defaultImage} />
          </Head>
     );
};

export default Metadata;
