import "../styles/globals.css"
import type { AppProps } from 'next/app'
import { Mina } from 'next/font/google';
import { wrapper } from "../redux";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import Layout from "../components/layouts";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const mina = Mina({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mina',
});

const App = ({ Component, pageProps, ...rest }: AppProps) => {
  const { store } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <PersistGate persistor={store.__persistor} loading={null}>
        <main className={mina.className}>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
        </main>
      </PersistGate>
    </Provider>
  )
}
App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ ctx, Component }) => {
  return {
    pageProps: Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {},
  };
})
export default wrapper.withRedux(App)
