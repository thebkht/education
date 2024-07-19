import App, { AppContext, AppProps } from 'next/app';
import { UserProvider } from '@/context/UserContext';

const Courses = ({ Component, pageProps }: AppProps) => {
     return (
          <UserProvider initialUser={pageProps.initialUser}>
               <Component {...pageProps} />
          </UserProvider>
     );
};

Courses.getInitialProps = async (appContext: AppContext) => {
     const appProps = await App.getInitialProps(appContext);
     const req = appContext.ctx.req;

     let initialUser = null;
     if (req) {
          const res = await fetch(`${process.env.API_URL}/accounts/me`);

          if (res.ok) {
               initialUser = await res.json();
          }
     }

     return { ...appProps, initialUser };
}

export default Courses;
