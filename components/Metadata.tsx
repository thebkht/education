// components/Metadata.js
import Head from "next/head";

const Metadata = ({
  title,
  description,
  url,
  image,
  ogType,
  noFollow,
}: {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  ogType?: string;
  noFollow?: boolean;
}) => {
  const defaultTitle = "Avtomobil yo'llari ilmiy-tadqiqot instituti";
  const defaultDescription = "Avtomobil yo'llari ilmiy-tadqiqot instituti";
  const defaultImage = "";
  const defaultUrl = "https://www.example.com";

  return (
    <Head>
      <title>{title ? `${title} - ${defaultTitle}` : defaultTitle}</title>
      <meta name="description" content={description ?? defaultDescription} />
      <meta
        property="og:title"
        content={title ? `${title} - ${defaultTitle}` : defaultTitle}
      />
      <meta
        property="og:description"
        content={description ?? defaultDescription}
      />
      <meta property="og:type" content={ogType ?? "website"} />
      <meta property="og:url" content={url ?? defaultUrl} />
      <meta property="og:image" content={image ?? defaultImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ?? defaultTitle} />
      <meta
        name="twitter:description"
        content={description ?? defaultDescription}
      />
      <meta name="twitter:image" content={image ?? defaultImage} />
      {noFollow && (
        <>
          <meta name="googlebot" content="noindex, nofollow" />
          <meta name="robots" content="noindex, nofollow" />
        </>
      )}
      <meta
        name="description"
        content="Avtomobil yoʻllari ilmiy tadqiqot instituti"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
};

export default Metadata;
