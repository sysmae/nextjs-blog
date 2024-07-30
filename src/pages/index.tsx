import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <h1>Next Js Hello World</h1>
    </main>
  );
}


// export const getServerSideProps:GetServerSideProps = async ({}) =>{
//   createClient(req.cookies)
// }