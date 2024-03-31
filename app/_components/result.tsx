import Image from 'next/image';

interface IResult {
    title: string;
    url: string;
    description: string;
}

const getFavIcon = (url: string) => {
    // Extract the domain from the URL and then append favicon.ico
    const domain = new URL(url).hostname;
    return `https://${domain}/favicon.ico`
}

const Result = ({ url, title, description }: IResult) => (
  <div className="pb-6">
    <p className="text-base mb-1">{description}</p>

    <a href={url} target="_blank" rel="noopener noreferrer">
      <div className="flex items-center">
        <div className="flex-none relative mr-3">
          <img
            className="rounded-full"
            src={getFavIcon(url)}
            alt="favicon"
            width={32}
            height={32}
          />
          <p className="absolute top-4 left-5">▶️</p>
        </div>
        <div>
          <h3 className="text-blue-400 text-lg">{title}</h3>
          <p className="text-sm text-slate-400">{url}</p>
        </div>
      </div>
    </a>
  </div>
);

export default Result;