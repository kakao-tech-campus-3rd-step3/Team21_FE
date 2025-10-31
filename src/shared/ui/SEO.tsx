import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}

const DEFAULT_TITLE = "UniScope - 한국형 RateMyProfessor | 전국 대학 강의·교수 정보 플랫폼";
const DEFAULT_DESCRIPTION =
  "전국 모든 대학의 강의, 교수, 학교 정보를 한눈에 비교하세요. 학생 리뷰 기반 대학 정보 통합 플랫폼 UniScope에서 더 나은 선택을 시작하세요.";
const DEFAULT_IMAGE =
  "https://uniscope-git-develop-i3months-projects.vercel.app/README/uniscope-logo.png";
const BASE_URL = "https://uniscope-git-develop-i3months-projects.vercel.app";

export function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords,
  image = DEFAULT_IMAGE,
  url = BASE_URL,
  type = "website",
}: SEOProps) {
  const fullTitle = title === DEFAULT_TITLE ? title : `${title} | UniScope`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
