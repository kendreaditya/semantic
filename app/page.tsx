import './_components/result'
import Result from './_components/result';
import SearchBar from './_components/searchbar';
import Context from './_components/context';

const results = [
  {
    url: "https://en.wikipedia.org/wiki/Krishna",
    title: "Krishna - Wikipedia",
    description:
      "Krishna is a major deity in Hinduism. He is worshipped as the eighth avatar of Vishnu and also as the Supreme God in his own right.",
  },
  {
    url: "https://www.britannica.com/visual-arts/painting",
    title: "Krishna | Story, Meaning, Description, & Legends - Britannica",
    description:
      "Krishna, one of the most widely revered and most popular of all Indian divinities, worshipped as the eighth incarnation (avatar, ...",
  },
  {
    url: "https://www.worldhistory.org/Krishna/",
    title: "Krishna - World History Encyclopedia",
    description:
      "Krishna (Krsna or Hari Krishna) is a major god of the Hindu pantheon and considered the eighth incarnation of Vishnu. He is perhaps the most ...",
  },
  {
    url: "https://simple.wikipedia.org/wiki/Krishna",
    title: "Krishna - Simple English Wikipedia",
    description:
      "Krishna is an important God (Param Brahma) in Hinduism. He is considered to have been an avatar of Vishnu. Krishna is believed to have been a real being who ...",
  },
  {
    url: "https://www.krishna.com/info/about-krishna",
    title: "About Krishna - Krishna.com",
    description:
      "Krishna is a title of the original, unique Supreme Person, the source of all existence. God has many names, and each describes a different aspect of His ...",
  },
];

export default function Home() {
  return (
    <main>
      <div className="w-full pt-32 pb-12 bg-gradient-to-b from-indigo-500/20 via-purple-500/13 to-0">
        <SearchBar />
      </div>

      <div className="flex items-center justify-center">
        <div className="max-w-screen-2xl">
          <div className="px-12 sm:px-20 sm:flex sm:space-x-16">
            <div className="sm:flex-1">
              <Context />
            </div>
            <div className="sm:flex-1">
              <h1 className="text-2xl font-bold mb-3">Search Results</h1>
              {results.map((result) => Result(result))}
              {results.map((result) => Result(result))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
